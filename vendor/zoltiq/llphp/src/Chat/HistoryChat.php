<?php

namespace LLphp\Chat;

class HistoryChat
{

    private $saveMsgFunction;
    private $loadMsgFunction;
	private $clearMsgFunction;

    /**
     * Constructs a new HistoryChat instance.
     *
     * @param int $max_history Maximum number of messages to store in history.
     * @param callable $saveMsgFunction
     * @param callable $loadMsgFunction
     * @param callable $clearMsgFunction
     */
    public function __construct(
        public readonly int $max_history,
        callable $saveMsgFunction,
        callable $loadMsgFunction,
        callable $clearMsgFunction
    ) {
	   	$this->saveMsgFunction = $saveMsgFunction;
        $this->loadMsgFunction = $loadMsgFunction;
		$this->clearMsgFunction = $clearMsgFunction;
    }
   
    /**
     * Adds a message to the history using the provided save function.
     *
     * @param Message $message 
     * @return void
     */
    public function addMessageToHistory(Message $message) {
	    call_user_func($this->saveMsgFunction, $message, $this->max_history);
    }

    /**
     * Retrieves messages from history using the provided load function.
     *
     * @return Message[] 
     */
    public function getMessageFromHistory(): array {
	    return call_user_func($this->loadMsgFunction);
    }
   
    /**
     * Deletes all messages from history using the provided clear function.
     *
     * @return mixed The result of the clear function.
     */
    public function deleteMessageHistory() {
	    return call_user_func($this->clearMsgFunction);
    }
}