<?php

use LLphp\Chat\OpenAIChat;
use LLphp\Chat\Message;

/**
 * Tool for searching products from the WordPress (WooCommerce) database
 */
class ProductListTool
{
    
   
   /**
     * Constructor
     *
     * @param OpenAIChat $chat An instance of the OpenAIChat class
     */
   public function __construct(private OpenAIChat $chat)
   {
   }

    
   /**
     * Searches for products in the WooCommerce database using specified criteria.
     *
     * @param string      $keywords     Keywords to search for in product titles and descriptions
     * @param int         $limit        Maximum number of products to return (default: 4)
     * @param bool        $promotional  Whether to only include promotional products (price < regular price)
     * @param float|null  $price_min    Minimum product price
     * @param float|null  $price_max    Maximum product price
     * @param float|null  $rating_min   Minimum product rating
     * @param float|null  $rating_max   Maximum product rating
     *
     * @return array{name: string, content: mixed} Processed response containing either product list or a text message
     */
   public function search_product_by_database(
      string $keywords,
      int $limit = 4,
      bool $promotional = false,
      ?float $price_min = null,
      ?float $price_max = null,
      ?float $rating_min = null,
      ?float $rating_max = null,
   ): array {
   
      global $wpdb;

      if (!class_exists('WooCommerce')) {
         return new WP_Error('woocommerce_inactive', 'WooCommerce is not active');
      }
      
      $sql = "SELECT 
         p.ID AS id,
         p.post_content AS description, 
         p.post_title AS title, 
         pm_price.meta_value AS price, 
         pm_reg.meta_value AS regular_price,
         pm_rating.meta_value AS rating,
         wp2.guid AS image_url
         FROM $wpdb->posts AS p
         LEFT JOIN $wpdb->postmeta AS pm_price 
            ON p.ID = pm_price.post_id AND pm_price.meta_key = '_price'
         LEFT JOIN $wpdb->postmeta AS pm_reg
            ON p.ID = pm_reg.post_id AND pm_reg.meta_key = '_regular_price'
         LEFT JOIN $wpdb->postmeta AS pm_rating 
            ON p.ID = pm_rating.post_id  AND pm_rating.meta_key = '_wc_average_rating'
         LEFT JOIN $wpdb->postmeta AS pm_thumb
            ON p.ID = pm_thumb.post_id AND pm_thumb.meta_key = '_thumbnail_id'
         LEFT JOIN $wpdb->posts AS wp2
            ON wp2.ID = pm_thumb.meta_value AND wp2.post_type = 'attachment'
         WHERE p.post_type = 'product'
            AND p.post_status = 'publish'
            AND MATCH(p.post_title, p.post_content) AGAINST(%s)
         ";

      
      $args = [$keywords];

      $params = [
         "CAST(pm_price.meta_value AS DECIMAL(10,2)) >= %f" => $price_min,
         "CAST(pm_price.meta_value AS DECIMAL(10,2)) <= %f" => $price_max,
         "CAST(pm_rating.meta_value AS DECIMAL(3,1)) >= %f" => $rating_min,
         "CAST(pm_rating.meta_value AS DECIMAL(3,1)) <= %f" => $rating_max,
      ];

      foreach ($params as $condition => $value) {
         if ($value !== null) {
            $sql .= " AND $condition";
            $args[] = $value;
         }
      }

      // Condition for promotional prices: promotional price must be lower than regular price
      if ($promotional) {
         $sql .= " AND CAST(pm_price.meta_value AS DECIMAL(10,2)) < CAST(pm_reg.meta_value AS DECIMAL(10,2))";
      }

      $sql .= " LIMIT %d";
      $args[] = $limit;
       
      $prepared = $wpdb->prepare($sql, ...$args);
      $posts = $wpdb->get_results($prepared, ARRAY_A);

      $formatted_chunks = '';

      if(!empty($posts)){
         foreach ($posts as $post) {
            
            $_price = floatval( $post['price'] );
            $_regular_price = floatval( $post['regular_price'] );
            $is_promotion  = ($_price < $_regular_price && $_regular_price > 0) ? 'is promotion price': ''; 
           
            $chunk_text = <<<TEXT4
            "{$post['id']}", "{$post['title']}", "{$post['description']}", "{$post['price']}", "{$post['regular_price']}", "{$post['rating']}", "$is_promotion"
            TEXT4;
            $formatted_chunks .= strip_tags($chunk_text) . PHP_EOL;
         }

         $res = <<<TEXT2
         The following data is in CSV format:
         id, title, description, price, regular_price, rating, is_promotion
         $formatted_chunks
    
         TEXT2;
      } else {
         $res = "Inform the user that the item was not found";
      }

      $options = get_option('chatbot_options');
      $product_list_opt = $options['tools']['product_list'];

      $message[] = $this->chat->getSystemMessage();
      $message[] = Message::system($product_list_opt['prompt_system']);
      $message[] = Message::user($this->chat->currentMessage);
      $message[] = Message::assistant($res);
     
      $this->chat->temperature = 0;
      
      $response = $this->chat->generateChat($message);

      // Add a message indicating that the assistant is requesting tool results
      $this->chat->historyChat->addMessageToHistory(
         Message::assistantAskingTools([$this->chat->lastFunctionCalled->asToolCallObject()])
      );
            
      $toHistory = Message::toolResult($response, $this->chat->lastFunctionCalled->getToolCallId());
      $this->chat->historyChat->addMessageToHistory($toHistory);
      
      $parsed = $this->parseSections($response, $posts);

      return ['name' => 'ProductList', 'content' => $parsed];
   }

   
   /**
     * Parses sections from assistant response, extracting structured content.
     *
     * @param string $input  Full assistant response
     * @param array  $source Original product data array
     *
     * @return array Structured sections mapped by name
     */
   private function parseSections(string $input, array $source): array
   {
      $sections = [
         'header' => '',
         'list' => [],
         'footer' => ''
      ];

      preg_match_all('/^===(\w+)===(.*?)(?=^===|\z)/ms', $input, $matches, PREG_SET_ORDER);

      foreach ($matches as $match) {
         $sectionName = strtolower(trim($match[1]));
         $sectionContent = trim($match[2]);

         // If it's a LIST section and looks like a CSV
         if ($sectionName === 'list') {
            $sections['list'] = $this->parseCsvIdAndDescriptionWithAdditional($sectionContent, $source);
         } else {
            $sections[$sectionName] = $sectionContent;
         }
      }

      if(empty($matches) && !empty($input)){
         $sections['footer'] = $input; 
      }

      return $sections;
   }
   
   
   /**
     * Parses CSV content with `id` and `description`, and merges with additional product data.
     *
     * @param string $csv    CSV-formatted text
     * @param array  $source Original product data array
     *
     * @return array Merged product data array with enhanced formatting
     */
   private function parseCsvIdAndDescriptionWithAdditional(string $csv, array $source): array {
      // Break the CSV data into lines and remove the empty ones
      $lines = array_filter(array_map('trim', explode("\n", $csv)));
      if (count($lines) < 2) {
         return [];
      }
  
      // We download the headers (trimming the spaces)
      $header = array_map('trim', str_getcsv(array_shift($lines)));

      $idIndex = array_search('id', $header);
      $descIndex = array_search('description', $header);
      if ($idIndex === false || $descIndex === false) {
         // If no 'id' or 'description' column is found return the source array
         return $source;
      }
  
      // Build map from additional data by 'id' for quick access
      $sourceMapping = [];
      foreach ($source as $row) {
         $_price = floatval( $row['price'] );
         $_regular_price = floatval( $row['regular_price'] );
         if($_price < $_regular_price && $_regular_price > 0) {
            $row['regular_price'] = strip_tags(wc_price($row['regular_price']));
         } else {
            $row['regular_price'] = '';
         }
         
         $row['price'] = strip_tags(wc_price($row['price']));
         $sourceMapping[$row['id']] = $row;
      }
  
      $result = [];
        
      foreach ($lines as $line) {
         $row = str_getcsv($line);
         if (!isset($row[$idIndex], $row[$descIndex])) {
            continue;
         }
         $id = trim($row[$idIndex]);
         
         // We generate a basic record from the CSV
         $record = [
            'id'          => $id,
            'description' => trim($row[$descIndex])
         ];

         // Combine with additional data, if available
         if (isset($sourceMapping[$id])) {
            unset($sourceMapping[$id]['description']);
            $record = array_merge($record, $sourceMapping[$id]);
         }
         $result[] = $record;
      }
  
      return $result;
   }
}