<?php
require plugin_dir_path(__FILE__) . 'check-min-db-ver.php';

/**
 * Zoltiq Chatbot for WordPress - Settings Page
 *
 * This file contains the code for the Zoltiq Chatbot settings page.
 * It allows users to configure the API key and other parameters
 * required to access the API from their own account.
 *
 * @package zoltiq-chatbot
 */

/**
 * Adds the Chatbot settings page to the admin menu.
 *
 * @return void
 */ 
function chatbot_settings_page() {
    add_options_page(
        'Chatbot Settings',  
        'Chatbot',            
        'manage_options',         
        'chatbot-settings',            
        'chatbot_settings_page_html' 
    );
}
add_action('admin_menu', 'chatbot_settings_page');


/**
 * Registers and enqueues styles and scripts for the admin panel.
 *
 * @param string $hook The current admin page.
 * @return void
 */
function chatbot_admin_enqueue_scripts($hook) {
    if ($hook !== 'settings_page_chatbot-settings') {
        return;
    }

    wp_enqueue_style(
        'chatbot-settings-admin-style',
        plugins_url('assets/css/admin-panel.min.css', dirname(__FILE__, 1)),
        array(),
        '1.0.9'
    );

    wp_register_script(
        'chatbot-settings-admin-script',
        plugins_url('assets/js/admin-panel.min.js', dirname(__FILE__, 1)),
        array(), 
        '1.4.7',
        true
    );

    $current_locale = get_locale();
    $lang_code = substr($current_locale, 0, 2);

    $default_options = require plugin_dir_path(__FILE__) . 'default-options.php';
    $options = get_option('chatbot_options', $default_options);
    
    $options['api_key'] = get_option('chatbot_api_key') 
        ? '__chatbot_BLANK_VALUE_00000000-0000-0000-0000-000000000000' 
        : '';

    $options['locale'] = $lang_code;
	$options['nonce'] = wp_create_nonce('chatbot_admin');
    $pages = get_pages(); 

    foreach ($pages as $page) {
        $options['pages'][] = array(
            'title' => esc_html($page->post_title),
            'slug'  => esc_html($page->post_name),
			'chatbot_enable' => $page->chatbot_enable
        );
    }
 
    wp_localize_script('chatbot-settings-admin-script', 'chatParams', $options);
    wp_enqueue_script('chatbot-settings-admin-script');
}
add_action('admin_enqueue_scripts', 'chatbot_admin_enqueue_scripts');

/**
 * Renders the Chatbot settings page.
 *
 * @return void
 */
function chatbot_settings_page_html() {
    if (!current_user_can('manage_options')) {
        return;
    }

	check_minimum_db_version();
	
    settings_errors('chatbot_settings_messages');


    ?>
    <div id="chatbotSettings"></div>
    <?php
}