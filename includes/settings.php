<?php
$default_options = require plugin_dir_path(__FILE__) . 'default-options.php';



/**
 * Checks if the database version meets the minimum requirements.
 *
 * @return bool True if the database version is below the required minimum, false otherwise.
 */
function handle_ajax_save_options() {

	
	$json = file_get_contents('php://input');
   $res = json_decode($json, true);
	
	if (!isset($res['security']) || !wp_verify_nonce($res['security'], 'chatbot_admin')) {
      wp_send_json_error(['message' => 'Security check failed'], 403);
   }	

	$data = $res['data'];
	
	$options_keys = [
		'model_choice',
		'temperature',
		'title',
		'start_status',
		'initial_greeting',
		'prompt_system',
		'image_upload',
		'emoji',
		'input_placeholder',
		'styles',
		'tools',
		'disable_chatbot_pages'
	];

	$options = [];
	foreach ($options_keys as $key) {
		$options[$key] = $data[$key] ?? $default_options[$key];
	}
	
	$style_keys = [
		'primary_color',
		'secondary_color',
		'background_color',
		'background_text_color',
		'background_input_color',
		'outline_input_color',
		'button_color',
		'hover_button_color',
		'cancel_btn_file_color', 
		'animation_dot_color',
		'header_background_gradient_col',
		'width_narrow',
		'height_narrow',
		'right_margin',
		'bottom_margin',
		'border_radius',
		'toggler_right_margin',
		'toggler_bottom_margin',
		'toggler_border_radius',
		'toggler_size'
	];

	$options['styles'] = [];
	foreach ($style_keys as $key) {
		$options['styles'][$key] = $data['styles'][$key] ?? $default_options[$key];
	}

	$options['tools'] = [];
	$options['tools']['product_list'] = $data['tools']['product_list'] ?? $default_options['product_list'];
	
	
		
	$api_key = $data['api_key'];
	if(!strpos($api_key, "BLANK_VALUE")){
		update_option('chatbot_api_key', $api_key);
	}
			
	update_option('chatbot_options', $options);
	
	wp_send_json_success();
}
add_action('wp_ajax_update', 'handle_ajax_save_options');