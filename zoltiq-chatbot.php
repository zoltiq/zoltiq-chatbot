<?php
/*
 * Plugin Name: Zoltiq Chatbot
 * Description: A simple plugin to add a Assistant AI to your WordPress Website.
 * Version:     0.5.0
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
$myUpdateChecker = PucFactory::buildUpdateChecker(
	'https://plugins.zoltiq.com/chatbot/details.json',
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