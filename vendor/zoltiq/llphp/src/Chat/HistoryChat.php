<?php

namespace LLphp\Chat;

class HistoryChat
{

    private $saveFunction;
    private $loadFunction;
   public function __construct(public readonly int $max_history, callable $saveFunction, callable $loadFunction)
   {
	   	$this->saveFunction = $saveFunction;
        $this->loadFunction = $loadFunction;
   }
   
   // Funkcja do dodawania wiadomości do historii 
   public function addMessageToHistory(Message $message) {
	   call_user_func($this->saveFunction, $message, $this->max_history);

   }

   public function getMessageFromHistory(): array {
	  return call_user_func($this->loadFunction);
   }
}