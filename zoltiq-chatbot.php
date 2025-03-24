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

require 'vendor/autoload.php';
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
 * Adds necessary columns to the wp_posts table upon plugin activation.
 *
 * Ensures that the 'embedding' and 'embedding_modified' columns exist in the wp_posts table,
 * creating them if they are missing.
 */
function initialize_chat_plugin() {
    global $wpdb;
    $table_name = $wpdb->prefix . 'posts';

    /* Check if the necessary columns already exist */
    $columns = $wpdb->get_results("SHOW COLUMNS FROM `$table_name` WHERE Field IN ('embedding', 'embedding_modified')");
    $existing_columns = array();
    foreach ($columns as $column) {
        $existing_columns[] = $column->Field;
    }
    
    /* Add 'embedding' column if it does not exist */
    if (!in_array('embedding', $existing_columns)) {
        $wpdb->query("ALTER TABLE `$table_name` ADD COLUMN `embedding` VECTOR(1536) NOT NULL");
    }
    
    /* Add 'embedding_modified' column if it does not exist */
    if (!in_array('embedding_modified', $existing_columns)) {
        $wpdb->query("ALTER TABLE `$table_name` ADD COLUMN `embedding_modified` DATETIME NOT NULL DEFAULT '0000-00-00 00:00:00'");
    } 



}
register_activation_hook(__FILE__, 'initialize_chat_plugin');
