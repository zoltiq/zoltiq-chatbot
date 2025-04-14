<?php

namespace LLphp\Chat;

use LLphp\Chat\FunctionInfo\FunctionInfo;
use LLphp\Chat\Message;


interface ChatInterface
{
    /**
     * Sets the system message which will act as initial context for the chat.
     */
    public function setSystemMessage(string $message): void;

    /**
     * Retrieves the current system message.
     */
    public function getSystemMessage(): ?Message;

    /**
     * Generates a response from OpenAI or returns a function call if applicable.
     */
    public function generateTextOrReturnFunctionCalled(string $prompt): array|FunctionInfo;
    
    /**
     * Generates a chat response based on the provided messages.
     */
    public function generateChat(array $messages): string;

    /**
     * Adds a new tool (function) that can be called by the OpenAI API.
     */
    public function addTool(FunctionInfo $functionInfo): void;
    
}
