<?php
if (!defined('WP_UNINSTALL_PLUGIN')) {
   exit; 
}


/**
 * Uninstalls the Chatbot plugin.
 *
 */
function uninstall_chatbot_plugin() {
   global $wpdb;
   $table_name = $wpdb->prefix . 'posts';
   
   if ( ! function_exists( 'maybe_drop_column' ) ) {
	require_once( ABSPATH . 'wp-admin/install-helper.php' );
   }

   /* Remove the 'embedding' column if it exists */
   $column_name = 'embedding';
   $drop_ddl = "ALTER TABLE $table_name DROP COLUMN $column_name;";
   maybe_drop_column( $table_name, $column_name, $drop_ddl );

   /* Remove the 'embedding_modified' column if it exists */
   $column_name = 'embedding_modified';
   $drop_ddl = "ALTER TABLE $table_name DROP COLUMN $column_name;";
   maybe_drop_column( $table_name, $column_name, $drop_ddl );
   
   /* Remove the 'chatbot_api_key' option */
   delete_option( 'chatbot_api_key' );
}
/* Execute the uninstallation function */
uninstall_chatbot_plugin();