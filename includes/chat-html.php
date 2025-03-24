<?php


/**
 * Enqueues styles and scripts for the Chatbot interface.
 *
 * This function loads the necessary CSS and JavaScript files
 * required for the Chatbot toggle button and functionality.
 *
 * @return void
 */
function chatbot_enqueue_scripts() {
    wp_enqueue_style(
        'chatbot-toggle-css',
        plugins_url('assets/css/toggle.css', dirname(__FILE__, 1)), 
        array(),
        '1.0.3'
    );

    wp_enqueue_script(
        'chatbot-toggle-js',
        plugins_url('assets/js/toggle.js', dirname(__FILE__, 1)), 
        array(),
        '1.0.7',
        true 
    );
}
add_action('wp_enqueue_scripts', 'chatbot_enqueue_scripts');


/**
 * Enqueues the Chatbot HTML and JavaScript module.
 *
 * This function initializes the Chatbot interface by injecting the necessary
 * script and styles into the footer of the page. It also configures chatbot
 * options based on saved settings.
 *
 * @return void
 */
function chatbot_enqueue_html() {
   $default_options = require plugin_dir_path(__FILE__) . 'default-options.php';
    $options = get_option('chatbot_options', $default_options);
    $styles = $options['styles'];
    
    $current_locale = get_locale(); 
    $lang_code = substr($current_locale, 0, 2);
 
    $chat_params = wp_json_encode(array(
       'webhook_url'       => admin_url('admin-ajax.php?action=chatbot_request'),
	   'locale'     	   => $lang_code,
	   ...$options
	));
    
    // Retrieve the URL for the ES6 module
    $module_url = plugins_url('assets/js/chat.bundle.es.js?27', dirname(__FILE__, 1));
    
    $inline_module_script = "
    	import { createChat } from '{$module_url}';
    	document.addEventListener('DOMContentLoaded', () => {
        	createChat($chat_params);
    	});
    ";
 
    $display_chatbot = ($options['start_status'] == 'open') ? 'block' : 'none';
        
    // Inject iframe into the footer
    add_action('wp_footer', function() use ($inline_module_script, $styles, $display_chatbot) {
        
        $srcdoc = htmlspecialchars("<link rel='stylesheet' href='" .  plugins_url('assets/css/chat.css?12', dirname(__FILE__, 1)) . "' type='text/css'>
            <script type='module'>" . $inline_module_script . "</script>", 
            ENT_QUOTES, 
            'UTF-8'
        ); 

        ?>

        <iframe id="chatbotFrame" srcdoc="<?php echo $srcdoc ?>" 
            style="position: fixed;
            right: <?php echo $styles['right_margin'] ?>;
            z-index: 9999999; border: none;
            width: <?php echo $styles['width_narrow'] ?>;
            bottom: <?php echo $styles['bottom_margin'] ?>;
            height: <?php echo $styles['height_narrow'] ?>;
            border-radius: <?php echo $styles['border_radius'] ?>; 
            box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.1) 0px 8px 10px -6px;
            display: <?php echo $display_chatbot ?>;
            pointer-events: auto;">
        </iframe>

        <button style="
            background: <?php echo $styles['primary_color']?>;
            bottom: <?php echo $styles['toggler_bottom_margin']?>;
            right: <?php echo $styles['toggler_right_margin']?>;
            height: <?php echo $styles['toggler_size']?>;
            width: <?php echo $styles['toggler_size']?>;
            border-radius: <?php echo $styles['toggler_border_radius']?>"
            id="chatbot-toggler">
            <span style="color: <?php echo $styles['secondary_color']?>" class="material-symbols-rounded">mode_comment</span>
            <span style="color: <?php echo $styles['secondary_color']?>" class="material-symbols-rounded">close</span>
        </button>
        <?php
    });
	
}
add_action('wp_enqueue_scripts', 'chatbot_enqueue_html', 20);