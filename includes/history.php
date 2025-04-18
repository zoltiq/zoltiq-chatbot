<?php

use LLphp\Chat\Message;

/**
 * Generates or retrieves a unique anonymous user key stored in a cookie.
 * If the cookie does not exist, a new UUID is generated and stored for 30 days.
 *
 * @return string The sanitized unique user key.
 */
function get_anonymous_user_key() {
   if (!isset($_COOKIE['wp_anonymous_user'])) {
      /* Generate a unique key for the user */
      $unique_id = wp_generate_uuid4();
      
      /* Store the cookie for 30 days */
      setcookie('wp_anonymous_user', $unique_id, time() + 3600 * 24 * 30, COOKIEPATH, COOKIE_DOMAIN);
      $_COOKIE['wp_anonymous_user'] = $unique_id;
   }
   return sanitize_text_field($_COOKIE['wp_anonymous_user']);
}


/**
 * Saves a chat message to a transient storage with a limit on the number of messages.
 * Oldest messages are removed if the limit is exceeded.
 *
 * @param Message $message The chat message object to be stored.
 * @param int $max_messages The maximum number of messages to keep in the transient.
 * @return void
 */


function save_msg_to_transient(Message $message, int $max_messages) {
   
   /* Retrieve the unique user key */
   $transient_key = 'chatbot_history_' . get_anonymous_user_key();

   /* Retrieve existing chat history */
   $history = get_transient($transient_key) ?: [];
   $history[] =  (array)$message;
   
   if (count($history) > $max_messages) {
      $removedMessage = array_shift($history);
     
      if (isset($removedMessage['tool_calls'])) {
         array_shift($history);
      }
   }
   
   /* Store the chat history for 1 hour */
   set_transient($transient_key, $history, HOUR_IN_SECONDS);
}


/**
 * Retrieves the message history from transient storage for the current anonymous user.
 *
 * @return array The message history as an associative array.
 */
function get_msg_history_from_transient() {
   $user_key = get_anonymous_user_key();
   $transient_key = 'chatbot_history_' . $user_key;

   return get_transient($transient_key) ?: [];
}


/**
 * Clears the message history stored in transient storage for the current anonymous user.
 *
 * @return void
 */
function clear_msg_history_from_transient() {
   $user_key = get_anonymous_user_key();
   $transient_key = 'chatbot_history_' . $user_key;
   delete_transient($transient_key);
}