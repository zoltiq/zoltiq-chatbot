<?php

namespace LLphp\Chat;

use Exception;
use LLphp\Chat\Enums\ChatRole;
use LLphp\Chat\FunctionInfo\FunctionInfo;
use LLphp\Chat\FunctionInfo\ToolFormatter;
use OpenAI\Client;
use OpenAI\Responses\Chat\CreateResponse;


class OpenAIChat implements ChatInterface
{

    private ?CreateResponse $lastResponse = null;
    private int $totalTokens = 0;
    private Message $systemMessage;

    /** @var FunctionInfo[] */
    private array $tools = [];

    public ?FunctionInfo $lastFunctionCalled = null;
    public ?FunctionInfo $requiredFunction = null;
	public $currentMessage = '';

    /**
     * Constructor for OpenAIChat.
     *
     * @param Client|null $client
     * @param string|null $model
     * @param float|null $temperature
     * @param HistoryChat|null $historyChat
     */

    public function __construct(
        public ?Client $client = null,
        public ?string $model = null,
        public ?float $temperature = null,
        public ?HistoryChat $historyChat = null
    ) {}


    /**
     * Sets the system message which will act as initial context for the chat.
     *
     * @param string $message 
     * @return void
     */
    public function setSystemMessage(string $message): void
    {
        $systemMessage = new Message();
        $systemMessage->role = ChatRole::System;
        $systemMessage->content = $message;
        $this->systemMessage = $systemMessage;
    }
	
	
	/**
     * Retrieves the current system message.
     *
     * @return Message|null
     */
    public function getSystemMessage(): ?Message
    {
        return $this->systemMessage ?? null;
    }

    /**
     * Builds the arguments array for the OpenAI API based on provided messages and tool settings.
     *
     * @param array $messages
     * @param bool|null $addTools
     * @return array<string, mixed>
     */
    private function getOpenAiArgs(array $messages, ?bool $addTools = false): array
    {
        // The system message should be the first
        $finalMessages = [];
        if (isset($this->systemMessage)) {
            $finalMessages[] = $this->systemMessage;
        }

        $finalMessages = array_merge($finalMessages, $messages);
        
        $openAiArgs = [
            'model' => $this->model,
            'temperature' => $this->temperature,
            'messages' => $finalMessages
        ];

        if(!$addTools) {
            return $openAiArgs;
        }
                
        if ($this->tools !== []) {
            $openAiArgs['tools'] = ToolFormatter::formatFunctionsToOpenAITools($this->tools);
        }

        if ($this->requiredFunction instanceof FunctionInfo) {
           $openAiArgs['tool_choice'] = ToolFormatter::formatToolChoice($this->requiredFunction);
        }

        return $openAiArgs;
    }

  
    /**
     * Generates a response from OpenAI or returns a function call if applicable.
     *
     * @param string $prompt
     * @return array{name: string, content: string}|FunctionInfo
     */
    public function generateTextOrReturnFunctionCalled(string $prompt): array|FunctionInfo
    {
        $this->lastFunctionCalled = null;
         
        $messages = isset($this->historyChat) ? $this->historyChat->getMessageFromHistory() : array(Message::user($prompt));
        $openAiArgs = $this->getOpenAiArgs($messages, true);

        $answer = $this->client->chat()->create($openAiArgs);
		
        $this->lastResponse = $answer;
        $this->totalTokens += $answer->usage->totalTokens ?? 0;

        $toolsToCall = $this->getToolsToCall($answer);

        foreach ($toolsToCall as $toolToCall) {
            $this->lastFunctionCalled = $toolToCall;
        }

        if ($this->lastFunctionCalled instanceof FunctionInfo) {
            return $this->lastFunctionCalled;
        }
        
        return [
            'name' => 'Text',
            'content' => $answer->choices[0]->message->content ?? ''
        ];
        
    }

    /**
     * Generates a chat response based on the provided messages.
     *
     * @param array $messages
     * @return string
     */
    public function generateChat(array $messages): string
    {
        $openAiArgs = $this->getOpenAiArgs($messages);

        $answer = $this->client->chat()->create($openAiArgs);
        $this->lastResponse = $answer;
        $this->totalTokens += $answer->usage->totalTokens ?? 0;
        return $answer->choices[0]->message->content ?? '';
    }
    
    
    /**
     * Extracts the tools to call from the OpenAI response.
     *
     * @param CreateResponse $answer
     * @return FunctionInfo[]
     */
    private function getToolsToCall(CreateResponse $answer): array
    {
        $functionInfos = [];
        /** @var CreateResponseToolCall $toolCall */
        foreach ($answer->choices[0]->message->toolCalls as $toolCall) {
            $functionName = $toolCall->function->name;
            $arguments = $toolCall->function->arguments;
            $functionInfo = $this->getFunctionInfoFromName($functionName, $toolCall->id);
            $functionInfo->jsonArgs = $arguments;

            $functionInfos[] = $functionInfo;
        }

        return $functionInfos;
    }
   
    /**
     * Adds a new tool (function) that can be called by the OpenAI API.
     *
     * @param FunctionInfo $functionInfo
     * @return void
     */
    public function addTool(FunctionInfo $functionInfo): void
    {
        $this->tools[] = $functionInfo;
    }
    
    /**
     * Retrieves a FunctionInfo object by its name.
     *
     * @param string $functionName
     * @param string $toolCallId
     * @return FunctionInfo 
     * @throws Exception
     */
    private function getFunctionInfoFromName(string $functionName, string $toolCallId): FunctionInfo
    {
        foreach ($this->tools as $function) {
            if ($function->name === $functionName) {
                return $function->cloneWithId($toolCallId);
            }
        }

        throw new Exception("OpenAI tried to call $functionName which doesn't exist");
    }
    
}