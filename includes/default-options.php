<?php
	
return [
	'api_key' => '',
	'model_choice' => 'gpt-4o-mini',
	'temperature' => 1.0,
	'title' => 'ChatBot',
	'start_status' =>  'closed',
	'initial_greeting' => 'Hello👋 <br> What can I help you with today?',
	'prompt_system' => 'You are an assistant to an online store selling products.',
	'image_upload' => true,
	'emoji' => true,
	'styles' => [
		'primary_color' =>  '#05b6fb',
		'secondary_color' => '#f2f2f2',
		'background_color' => '#fff',
		'background_text_color' => '#f2faff',
		'background_input_color' => '#fff',
		'outline_input_color' => '#c7ebf9',
		'button_color' => '#606060',
		'hover_button_color' => '#3bc4f9',
		'cancel_btn_file_color' => '#FF0000', 
		'animation_dot_color' => '#66baff',
		'header_background_gradient_col' => 'linear-gradient(170deg, #059cd7 22%, #5fdaff 67%)',
		'input_placeholder' =>  'Message...',
		'width_narrow' => '375px',
		'height_narrow' => '80vh',
		'right_margin' =>  '2rem',
		'bottom_margin' => '8rem',
		'border_radius' => '0.75rem',
		'toggler_right_margin' =>  '35px',
		'toggler_bottom_margin' => '30px',
		'toggler_border_radius' => '50%',
		'toggler_size' => '50px'
	],
	"tools" => [
		"product_list" => [
			"prompt_system" => ""
		]
	],
	'pages' => [],
	'disable_chatbot_pages' => [],
	'locale' => 'en'
];