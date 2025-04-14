<?php

use LLphp\Embeddings\EmbeddingGenerator\OpenAI\OpenAI3SmallEmbeddingGenerator;


/**
 * Handles an AJAX request to run the embedding process.
 * It verifies security and triggers the embedding generation.
 *
 * @return void
 */
function handle_ajax_run_embedding() {
    // Sprawdzenie nonce dla bezpieczeństwa
    check_ajax_referer('chatbot_admin', 'security');
   
	$msg = run_embedding();
	
	// Zwrócenie odpowiedzi JSON
    wp_send_json_success(['message' => $msg]);
}
add_action('wp_ajax_run_embedding', 'handle_ajax_run_embedding');


/**
 * Runs the embedding generation process.
 * It retrieves posts that need embedding updates and processes them.
 *
 * @return string Returns a status message indicating success or no new embeddings.
 */
function run_embedding() {
    global $wpdb;

    $query = "SELECT ID, post_content FROM {$wpdb->posts} WHERE post_type = 'product' AND post_modified > embedding_modified";
    $posts = $wpdb->get_results( $query, ARRAY_A );

    if (empty( $posts )) {
        return "no_new_embed";
    } 

    $apiKey = esc_attr(get_option('chatbot_api_key'));
    $client = OpenAI::client($apiKey);
    $embeddingGenerator = new OpenAI3SmallEmbeddingGenerator($client);
    
    $table_name = $wpdb->posts;
    
    foreach ( $posts as $post ) {
        $content = wp_strip_all_tags($post['post_content']);
        $id = $post['ID'];
        $vectors = $embeddingGenerator->embedText($content);

        $embedding_json = json_encode($vectors);
      
        $query = "UPDATE $table_name SET embedding = VEC_FromText(%s), embedding_modified = %s WHERE ID = %d";
        $result = $wpdb->query($wpdb->prepare($query, $embedding_json, current_time('mysql'), $id));
    }
    return 'embedding_done';
}