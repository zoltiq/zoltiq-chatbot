<?php
use LLphp\Chat\FunctionInfo\Parameter;
use LLphp\Chat\FunctionInfo\FunctionInfo;
use LLphp\Chat\OpenAIChat;
use LLphp\Chat\Message;

/**
 * Tool for searching products from the WordPress (WooCommerce) database
 */
class ProductSearchTool
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
     * @param string      $category     Category products
     * @param string      $attributes   JSON containing additional attribute filters
     *
     * @return array{name: string, content: mixed} Processed response containing either product list or a text message     * 
     */
   public function search_product_by_database(
      string $keywords,
      int $limit = 4,
      bool $promotional = false,
      ?float $price_min = null,
      ?float $price_max = null,
      ?float $rating_min = null,
      ?float $rating_max = null,
      ?string $category = '',
      ?string $attributes = ''
   ): array {
   
      
      if (!class_exists('WooCommerce')) {
         return new WP_Error('woocommerce_inactive', 'WooCommerce is not active');
      }

      $posts = $this->getDatafromDb(
         $keywords,
         $limit,
         $promotional,
         $price_min,
         $price_max,
         $rating_min,
         $rating_max,
         $category,
         $attributes
      );

      
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


   
   private function getDatafromDb(
      string $keywords,
      int $limit,
      bool $promotional,
      ?float $price_min,
      ?float $price_max,
      ?float $rating_min,
      ?float $rating_max,
      ?string $category,
      ?string $attributes
   ): array
   {
      global $wpdb;
      
      $dynamicJoins = "";
      $dynamicConditions = "";
      $args = [$keywords];
           
      
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
         ";

      
      
      // If the attributes parameter (JSON) is passed, we decode it
      if (!empty($attributes)) {
         $attrFilters = json_decode($attributes, true);

         if (json_last_error() === JSON_ERROR_NONE && is_array($attrFilters)) {
            $taxonomy = get_option('chatbot_taxonomy');

            foreach ($attrFilters as $attrKey => $attrValue) {
            
               if (isset($taxonomy->taxonomy_map[$attrKey]) && !empty($attrValue)) {
                  // We create unique aliases for each attribute to avoid conflicts
                  $aliasSuffix = $attrKey;
               
                  $dynamicJoins .= "
                     LEFT JOIN {$wpdb->term_relationships} AS tr_{$aliasSuffix} 
                        ON p.ID = tr_{$aliasSuffix}.object_id
                     LEFT JOIN {$wpdb->term_taxonomy} AS tt_{$aliasSuffix} 
                        ON tr_{$aliasSuffix}.term_taxonomy_id = tt_{$aliasSuffix}.term_taxonomy_id
                     LEFT JOIN {$wpdb->terms} AS t_{$aliasSuffix} 
                        ON tt_{$aliasSuffix}.term_id = t_{$aliasSuffix}.term_id
                  "; 
               
                  // We add a condition: the taxonomy must match the given attribute 
                  // and the term name must be equal to the passed value.
                  $dynamicConditions .= " AND tt_{$aliasSuffix}.taxonomy = %s AND t_{$aliasSuffix}.name = %s ";
                  $args[] = $taxonomy->taxonomy_map[$attrKey];
                  $args[] = $attrValue;
               }
            }
         }
      }

      // Include dynamic JOINs in the SQL query
      $sql .= $dynamicJoins;

      if ( !empty($category) ) {
         $sql .= "
            LEFT JOIN $wpdb->term_relationships AS tr ON p.ID = tr.object_id
            LEFT JOIN $wpdb->term_taxonomy AS tt ON tr.term_taxonomy_id = tt.term_taxonomy_id
            LEFT JOIN $wpdb->terms AS t ON tt.term_id = t.term_id
         ";
      } 


      $sql .= "WHERE p.post_type = 'product'
            AND p.post_status = 'publish'
            AND MATCH(p.post_title, p.post_content) AGAINST(%s)
            ";
       
      
      // Include dynamic conditions, if generated
      if (!empty($dynamicConditions)) {
         $sql .= $dynamicConditions;
      }
      
      
      if ( !empty($category) ) {
         $sql .= " OR (tt.taxonomy = 'product_cat' AND t.name = %s) ";
         $args[] = $category;
      }      
    
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
      return $posts;
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


   /**
     * Static method that creates a FunctionInfo object with tool parameters.
     *
     * @param OpenAIChat $chat An instance of the OpenAIChat class that will be passed to the tool.
     * @return FunctionInfo The configured FunctionInfo object of the product search tool.
     */
   public static function getFunctionInfo(OpenAIChat $chat): FunctionInfo
   {
      // Create an instance of the tool
      $tool = new self($chat);
      $taxonomy = get_option('chatbot_taxonomy');
	  $options = get_option('chatbot_options');
      $parameters = $options['tools']['product_list']['parameters'];
	  
	  // We define the parameters of the tool
      $keywords = new Parameter(
         'keywords',
         'string',
         $parameters['keywords'] 
      );
      $limit = new Parameter(
         'limit',
         'integer',
         $parameters['limit']
		 
      );
      $price_min = new Parameter(
         'price_min',
         'number',
         $parameters['price_min']
      );
      $price_max = new Parameter(
         'price_max',
         'number',
         $parameters['price_max']
      );
      $rating_min = new Parameter(
         'rating_min',
         'number',
         $parameters['rating_min']
      );
      $rating_max = new Parameter(
         'rating_max',
         'number',
         $parameters['rating_max']
      );
      $promotional = new Parameter(
         'promotional',
         'boolean',
         $parameters['promotional']
      );
      $category = new Parameter(
         'category',
         'string',
         $parameters['category']
      );
      $attributes = new Parameter(
         'attributes',
         'string',
         $parameters['attributes'] . " Example " . $taxonomy->example 
		// 'Ciąg JSON z filtrami produktów. Jeżeli użytkownik w zapytaniu wspomina o kolorze produktu, np. („znajdź mi czarną latarkę”), lub rozmiar („mały”), wyodrębnij go i dodaj do tego argumentu. Example: ' . $taxonomy->example  
         //'Attributes JSON string with product filters. If the user mentions the color of the product in the query, e.g. (“find me a black flashlight”), size (“small”), extract it and add it to this argument. Example: ' . $taxonomy->example  
         );

      
      // We create a FunctionInfo object. The FunctionInfo constructor takes:
      // - the name of the function,
      // - an instance of the tool (in this case, $tool),
      // - a description of the function,
      // - an array of available parameters,
      // - an array of required parameters (here, for example, only 'keywords')
      
      return new FunctionInfo(
         'search_product_by_database',
         $tool,
         'Searches for products in the database based on the query and, optionally, the specified category.',
         [$keywords, $limit, $promotional, $price_min, $price_max, $rating_min, $rating_max, $category, $attributes],
         [$keywords] 
      );
   }
}