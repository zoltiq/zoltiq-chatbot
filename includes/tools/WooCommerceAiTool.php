<?php

use OpenAI\Client;

// Narzędzie wyszukujące produkty
class WooCommerceAiTool
{
    
   public function __construct(private Client $client)
   {
   }
    
   // Funkcja wyszukująca produkty
   public function search_product_by_rag(string $user_query): string {
       
      $response = $this->client->embeddings()->create([
      	'model' => 'text-embedding-3-small',
        	'input' => $user_query,
    	]);
     
    	$embedding = $response->embeddings[0]->embedding;
          
      // Sprawdzenie, czy WooCommerce jest aktywny
      if (!class_exists('WooCommerce')) {
         return new WP_Error('woocommerce_inactive', 'WooCommerce is not active');
      }

      global $wpdb;
      $embedding_json = json_encode($embedding);

      $query = $wpdb->prepare(
         "SELECT 
            p.post_content, 
            p.post_title, 
            pm_price.meta_value AS price, 
            pm_reg.meta_value AS regular_price,
            wp2.guid AS image_url
         FROM {$wpdb->posts} AS p
         LEFT JOIN {$wpdb->postmeta} AS pm_price 
            ON p.ID = pm_price.post_id AND pm_price.meta_key = '_price'
         LEFT JOIN {$wpdb->postmeta} AS pm_reg
            ON p.ID = pm_reg.post_id AND pm_reg.meta_key = '_regular_price'
         LEFT JOIN {$wpdb->postmeta} AS pm_thumb
            ON p.ID = pm_thumb.post_id AND pm_thumb.meta_key = '_thumbnail_id'
         LEFT JOIN {$wpdb->posts} AS wp2
            ON wp2.ID = pm_thumb.meta_value AND wp2.post_type = 'attachment'
         WHERE p.post_type = 'product'
            AND p.post_status = 'publish'
         ORDER BY VEC_DISTANCE_COSINE(p.embedding, VEC_FromText(%s))
         LIMIT 2",
         $embedding_json
      );
    
        
      $posts = $wpdb->get_results($query, ARRAY_A);
    
      if (empty( $posts )) {
         return 'Nie znaleziono produktu';
      }
        
      $formatted_chunks = [];

		foreach ($posts as $post) {
    		$chunk_text = "\n" . $post['post_title'] . "\n\n" .
               $post['image_url'] . "\n\n" .
               $post['post_content'] . "\n\n" .
               "Cena: " . $post['price'] . " zł\n" .
               "Cena regularna: " . $post['regular_price'] . " zł"; 
               
         $formatted_chunks[] = $chunk_text;
		}

		// Join all chunks with a separator
      $res = implode("\n\n---\n\n", $formatted_chunks);
		return $res;



        // Użycie WP_Query do wyszukania produktów
    //    $args = [
    //        'post_type'      => 'product',
    //        'posts_per_page' => -1,
    //        's'              => $product_name, // Wyszukiwanie pełnotekstowe po nazwie
    //    ];

    //    $query = new WP_Query($args);

        // Jeśli znaleziono produkty, zwracamy listę
    //    if ($query->have_posts()) {
    //        $products = [];
    //        while ($query->have_posts()) {
    //            $query->the_post();
    //            $products[] = [
    //                'ID'    => get_the_ID(),
    //                'name'  => get_the_title(),
     //               'price' => wc_get_product(get_the_ID())->get_price(),
    //                'url'   => get_permalink(),
    //            ];
    //        }
    //        wp_reset_postdata();
    //        return $products;
    //    }



        // Jeśli brak wyników, zwracamy pustą tablicę
      //  return ['message' => 'Nie znaleziono produktu'];
    }
}