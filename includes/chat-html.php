<?php


/**
 * Enqueues chatbot scripts and styles and determines the page type based on context.
 *
 * @return void
 */
function chatbot_enqueue() {
	global $wp_query;
    $page_type = '';
	
    $default_options = require plugin_dir_path(__FILE__) . 'default-options.php';
	$options = get_option('chatbot_options', $default_options);

    if(function_exists('is_shop') && ( is_shop() || is_product() || is_product_category() || is_product_tag() )) {
	    $page_type = "sklep";
    } elseif ( is_home() || is_single() || is_archive() || is_category() || is_tag() ) {
        $page_type = 'blog';
	} elseif( isset( $wp_query->queried_object->post_name ) ) {
        $page_type = $wp_query->queried_object->post_name;
    } 

    if (!in_array($page_type, $options['disable_chatbot_pages'], true)) {
        chatbot_html($options);
    }
}
add_action('wp_enqueue_scripts', 'chatbot_enqueue', 20);

/**
 * Generates the HTML and loading logic for the chatbot.
 *
 * @param array $options Configuration options for the chatbot, including style settings, start status, and other parameters.
 * @return void
 */
function chatbot_html($options) {

    wp_enqueue_script(
        'chatbot-toggle-js',
        plugins_url('assets/js/toggle.js', dirname(__FILE__, 1)), 
        array(),
        '1.0.8',
        true 
    );
	
    
    $styles = $options['styles'];
    
    $current_locale = get_locale(); 
    $lang_code = substr($current_locale, 0, 2);
 
    $chat_params = wp_json_encode(array(
       'webhook_url'       => admin_url('admin-ajax.php'),
	   'locale'     	   => $lang_code,
	   ...$options
	));
    
    // Retrieve the URL for the ES6 module
    $module_url = plugins_url('assets/js/chat.bundle.es.js?45', dirname(__FILE__, 1));
    
    $inline_module_script = "
    	import { createChat } from '{$module_url}';
    	document.addEventListener('DOMContentLoaded', () => {
        	createChat($chat_params);
    	});
    ";
 
    $display_chatbot = ($options['start_status'] == 'open') ? 'block' : 'none';
        
    // Inject iframe into the footer
    add_action('wp_footer', function() use ($inline_module_script, $styles, $display_chatbot) {
        
        $srcdoc = htmlspecialchars("<link rel='stylesheet' href='" .  plugins_url('assets/css/widget.min.css?22', dirname(__FILE__, 1)) . "' type='text/css'>
            <script type='module'>" . $inline_module_script . "</script>", 
            ENT_QUOTES, 
            'UTF-8'
        ); 

        ?>
		
		<style type="text/css">
			@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0&family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@48,400,1,0');
            
			#chatbotFrame {
				position: fixed;
				right: <?php echo $styles['right_margin'] ?>; 
				bottom: <?php echo $styles['bottom_margin'] ?>;
				z-index: 999999;
				border: none;
				width: <?php echo $styles['width_narrow'] ?>;
				height: <?php echo $styles['height_narrow'] ?>;
				border-radius: <?php echo $styles['border_radius'] ?>; 
				box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.1) 0px 8px 10px -6px;
				display: <?php echo $display_chatbot ?>;
				pointer-events: auto;
         
				@media (max-width: 768px) {
					height: 100%;
					width: 100%;
					bottom: 0;
					right: 0; 
					border-radius: 0;
				}
			}
			
			#chatbot-toggler {
				background: <?php echo $styles['primary_color']?>;
				bottom: <?php echo $styles['toggler_bottom_margin']?>;
				right: <?php echo $styles['toggler_right_margin']?>;
				height: <?php echo $styles['toggler_size']?>;
				width: <?php echo $styles['toggler_size']?>;
				border-radius: <?php echo $styles['toggler_border_radius']?>;
				position: fixed;
				border: none;
				display: flex;
				align-items: center;
				justify-content: center;
				cursor: pointer;
				transition: all 0.2s ease;
			}
			
			#chatbot-toggler > span {
				color: <?php echo $styles['secondary_color']?>;
				position: absolute;
			}
			
			#chatbot-toggler.show-chatbot {
				transform: rotate(90deg);
			}
      
			#chatbot-toggler.show-chatbot span:first-child,
			#chatbot-toggler span:last-child {
				opacity: 0;
			}
      
			#chatbot-toggler.show-chatbot span:last-child {
				opacity: 1;
			}
				
        </style>

        <iframe id="chatbotFrame" srcdoc="<?php echo $srcdoc ?>"></iframe>

        <button id="chatbot-toggler">
            <span class="material-symbols-rounded">mode_comment</span>
            <span class="material-symbols-rounded">close</span>
        </button>
        <?php
    });

}