<?php

namespace LLphp\Chat;

use LLphp\Chat\FunctionInfo\FunctionInfo;
use LLphp\Chat\Message;


interface ChatInterface
{
    /**
     * We only need one system message in most of the case
     */
    public function setSystemMessage(string $message): void;

    /**
     * We get system message in most of the case
     */
    public function getSystemMessage(): ?Message;

    /**
     * @param string $prompt
     */
    public function generateTextOrReturnFunctionCalled(string $prompt): string|FunctionInfo;
    
    public function generateChat(array $messages): string;

    public function addTool(FunctionInfo $functionInfo): void;
    
}
