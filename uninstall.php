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
   
   /* Remove full-text index */
   $wpdb->query("ALTER TABLE `$table_name` DROP INDEX `wp_fulltext`");
   
   /* Remove the 'chatbot_api_key' option */
   delete_option( 'chatbot_api_key' );
}
/* Execute the uninstallation function */
uninstall_chatbot_plugin();