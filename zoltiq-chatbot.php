<?php
/*
 * Plugin Name: Zoltiq Chatbot
 * Description: A simple plugin to add a Assistant AI to your WordPress Website.
 * Version:     0.6.0
 * Author:      Sebastian Rakowicz
 * Author URI:  https://zoltiq.com
 * License:     GPLv3 or later
 * License URI: https://www.gnu.org/licenses/gpl-3.0.html
*/

//require 'vendor/autoload.php';
require plugin_dir_path(__FILE__) . 'vendor/autoload.php';
require_once plugin_dir_path(__FILE__) . 'includes/settings.php';
require_once plugin_dir_path(__FILE__) . 'includes/settings-html.php';
require_once plugin_dir_path(__FILE__) . 'includes/embedding.php';
require_once plugin_dir_path(__FILE__) . 'includes/history.php';
require_once plugin_dir_path(__FILE__) . 'includes/chat.php';
require_once plugin_dir_path(__FILE__) . 'includes/chat-html.php';
require_once plugin_dir_path(__FILE__) . 'plugin-update-checker/plugin-update-checker.php';

use YahnisElsts\PluginUpdateChecker\v5\PucFactory;

/* If this file is called directly, exit. */
defined( 'WPINC' ) || die;

/* If this file is called directly, exit. */
if ( ! defined( 'ABSPATH' ) ) {
	die();
}


/* Initialize plugin update checker */
$details_url = 'https://plugins.zoltiq.com/chatbot/details-'. get_locale() .'.json';

$updateChecker = PucFactory::buildUpdateChecker(
  $details_url,
  __FILE__,
  'zoltiq-chatbot'
);



/**
 * Add a settings link to the plugin entry in the plugins list.
 *
 * @param array $links Existing plugin action links.
 * @return array Modified plugin action links with a settings page link.
 */
function chat_plugin_action_links($links) {
    $settings_link = '<a href="../wp-admin/options-general.php?page=chatbot-settings">' . __('Settings', 'chatbot-settings') . '</a>';
    array_unshift($links, $settings_link);
    return $links;
}
add_filter('plugin_action_links_' . plugin_basename(__FILE__), 'chat_plugin_action_links');


/**
 * Initializes the chat plugin functionality by adding a full-text index
 */
function initialize_chat_plugin() {
    global $wpdb;
    $table_name = $wpdb->prefix . 'posts';
  
    $wpdb->query("ALTER TABLE `$table_name` ADD FULLTEXT `wp_fulltext` (`post_title`, `post_content`)");
}
register_activation_hook(__FILE__, 'initialize_chat_plugin');




add_action( 'woocommerce_after_register_post_type', 'map_taxionomy', 10 );

function map_taxionomy() {
    $attribute_taxonomies = wc_get_attribute_taxonomies();
    $taxonomyMap = new stdClass();
    
    //$taxonomyMap = [];
    $example = [];

    
    foreach ( $attribute_taxonomies as $item ) {
        // We make sure we have both fields
        if ( isset($item->attribute_label, $item->attribute_name) ) {
            $taxonomyMap->taxonomy_map[ strtolower(preg_replace('/\s+/', '_', $item->attribute_label)) ] = "pa_" . $item->attribute_name;
        }
    }
    
    foreach($taxonomyMap->taxonomy_map as $key => $v){
        // We make sure the taxonomy exists
        if ( ! taxonomy_exists($v) ) {
            echo 'Taxonomy '. $v .' not yet registered.';
            return;
        }

        // We retrieve all therms (values) from taxonomy
        $terms = get_terms([
            'taxonomy'   => $v,
            'hide_empty' => false,
        ]);

        if ( is_wp_error($terms) ) {
            echo 'Error: ' . $terms->get_error_message();
            return;
        }

        if ( empty($terms) ) {
            echo 'No value in taxonomy ' . $v;
            return;
        }
        $example[$key] = $terms[0]->slug;
    }
    $taxonomyMap->example = json_encode($example);
    update_option('chatbot_taxonomy', $taxonomyMap);
}