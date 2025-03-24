<?php
require_once plugin_dir_path(__FILE__) . '/tools/WooCommerceAiTool.php';

use LLphp\Chat\HistoryChat;
use LLphp\Chat\OpenAIChat;
use LLphp\Chat\FunctionInfo\Parameter;
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
   $historyChat = new HistoryChat(10, 'save_message_to_transient', 'get_chat_history_from_transient');

   /* Retrieve the API key from WordPress options and create an OpenAI client */
   $apiKey = esc_attr(get_option('chatbot_api_key', ''));
   $client = OpenAI::client($apiKey);

   /* Load default options and merge them with any saved options */
   $default_options = require plugin_dir_path(__FILE__) . 'default-options.php';
   $options = get_option('chatbot_options', $default_options);

   /* Create an instance of OpenAIChat with the chosen model and history handler*/
   $chat = new OpenAIChat($client, $options['model_choice'], $historyChat);
   /* Set the system prompt for the chat session */
   $chat->setSystemMessage($options['prompt_system']);

   /* Define a parameter representing the user's query */
   $user_query = new Parameter('user_query', 'string', 'User Query');
   
   /* Create a FunctionInfo object for a tool that searches for products by RAG */
   $function = new FunctionInfo(
      'search_product_by_rag',
      new WooCommerceAiTool($client), 
      'Pobiera odpowiednie fragmenty dokumentacji na podstawie zapytania z RAG.',
      [$user_query],
      [$user_query]
   );

   /* Add the tool function to the chat system */
   $chat->addTool($function);
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

   $message = sanitize_text_field($data['chatInput']);
    
   if (!$message) {
      wp_send_json_error('Invalid message');
   }

   /* Add the user's message to the chat history */
   $historyChat->addMessageToHistory(Message::user($message));
   
   try {
		/* Generate a response from the chatbot or determine if a tool function should be called */
      $stringOrFunctionInfo = $chat->generateTextOrReturnFunctionCalled($message);

		/* If a tool function is requested, execute it and handle its result */
      if ($stringOrFunctionInfo instanceof FunctionInfo) {
		   
         /* Run the requested function/tool */
         $content = FunctionRunner::run($stringOrFunctionInfo);
     
		   /* Add a message indicating that the assistant is requesting tool results */
         $historyChat->addMessageToHistory(
            Message::assistantAskingTools([$chat->lastFunctionCalled->asToolCallObject()])
         );
		   
          /* Add the result from the tool to the chat history */
         $toHistory = Message::toolResult($content, $stringOrFunctionInfo->getToolCallId());
		   $historyChat->addMessageToHistory($toHistory);
		   
         /* Generate a final chat response using the updated history */
         $stringOrFunctionInfo = $chat->generateChat($historyChat->getMessageFromHistory());
	   } 
   } catch(Exception $e) {
	   wp_send_json_error(["message" => 'plug-in error or bad configuration']);
	   die();
   }
   
   /* If the final output is a simple string, add it to the history and send it as the AJAX response */
   if (is_string($stringOrFunctionInfo)) {
      $historyChat->addMessageToHistory(Message::assistant($stringOrFunctionInfo));
      wp_send_json_success(["message" => $stringOrFunctionInfo]);
   }
}
add_action('wp_ajax_chatbot_request', 'chatbot_request');
add_action('wp_ajax_nopriv_chatbot_request', 'chatbot_request');