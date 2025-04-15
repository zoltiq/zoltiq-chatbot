<?php
require_once plugin_dir_path(__FILE__) . '/tools/ProductSearchTool.php';

use LLphp\Chat\HistoryChat;
use LLphp\Chat\OpenAIChat;
use LLphp\Chat\FunctionInfo\FunctionInfo;
use LLphp\Chat\FunctionInfo\FunctionRunner;
use LLphp\Chat\Message;


/**
 * Initialize the chatbot system.
 *
 */
function init_chatbot() {
   global $chat, $historyChat;

   /* Initialize HistoryChat with a maximum of 10 iterations */
   $historyChat = new HistoryChat(10, 'save_msg_to_transient', 'get_msg_history_from_transient', 'clear_msg_history_from_transient');

   /* Retrieve the API key from WordPress options and create an OpenAI client */
   $apiKey = esc_attr(get_option('chatbot_api_key', ''));

   /* Load default options and merge them with any saved options */
   $default_options = require plugin_dir_path(__FILE__) . 'default-options.php';
   $options = get_option('chatbot_options', $default_options);

   /* Create an instance of OpenAIChat with the chosen model and history handler*/
   $chat = new OpenAIChat(OpenAI::client($apiKey), $options['model_choice'], $options['temperature'], $historyChat);
    
   /* Set the system prompt for the chat session */
   $chat->setSystemMessage($options['prompt_system']);

   /* Add the tool Product Search Tool to the chat system */
   $chat->addTool(ProductSearchTool::getFunctionInfo($chat));
}
/* Initialize the chatbot when the plugin loads */
init_chatbot();


/**
 * Handle the AJAX request for the chatbot.
 *
 */
function chatbot_request() {
   
   global $chat, $historyChat;
   
   /* Retrieve the JSON payload from the request body */
   $json = file_get_contents('php://input');
   $data = json_decode($json, true);

   $chat->currentMessage = sanitize_text_field($data['chatInput']);
    
   if (!$chat->currentMessage) {
      wp_send_json_error('Invalid message');
   }

   /* Add the user's message to the chat history */
   $historyChat->addMessageToHistory(Message::user($chat->currentMessage));
   
   try {
		/* Generate a response from the chatbot or determine if a tool function should be called */
      $stringOrFunctionInfo = $chat->generateTextOrReturnFunctionCalled($chat->currentMessage);

		/* If a tool function is requested, execute it and handle its result */
      if ($stringOrFunctionInfo instanceof FunctionInfo) {
		   
         /* Run the requested function/tool */
         $stringOrFunctionInfo = FunctionRunner::run($stringOrFunctionInfo);
     	} else {
         $historyChat->addMessageToHistory(Message::assistant($stringOrFunctionInfo['content']));
      } 

   } catch(Exception $e) {
	   wp_send_json_error(["message" => 'plug-in error or bad configuration']);
	   die();
   }
   
   /* If the final output is a simple string, add it to the history and send it as the AJAX response */
   if (is_array($stringOrFunctionInfo)) {
      wp_send_json_success($stringOrFunctionInfo);
   }
}
add_action('wp_ajax_chatbot_request', 'chatbot_request');
add_action('wp_ajax_nopriv_chatbot_request', 'chatbot_request');


function delete_history() {
	global $historyChat;
	$historyChat->deleteMessageHistory();
	wp_send_json_success();
}
add_action('wp_ajax_delete_history', 'delete_history');
add_action('wp_ajax_nopriv_delete_history', 'delete_history');