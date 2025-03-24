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

    public function __construct(private ?Client $client = null, private ?string $model = null, private ?HistoryChat $historyChat = null)
    {

    }


    /**
     * We only need one system message in most of the case
     */
    public function setSystemMessage(string $message): void
    {
        $systemMessage = new Message();
        $systemMessage->role = ChatRole::System;
        $systemMessage->content = $message;
        $this->systemMessage = $systemMessage;
    }
	
	
	/**
     * We get system message in most of the case
     */
    public function getSystemMessage(): ?Message
    {
        return $this->systemMessage ?? null;
    }

    /**
     * @param  Message[]  $messages
     * @return array<string, mixed>
     */
    private function getOpenAiArgs(array $messages): array
    {
        // The system message should be the first
        $finalMessages = [];
        if (isset($this->systemMessage)) {
            $finalMessages[] = $this->systemMessage;
        }

        $finalMessages = array_merge($finalMessages, $messages);

        $openAiArgs = ['model' => $this->model, 'messages' => $finalMessages];

        if ($this->tools !== []) {
            $openAiArgs['tools'] = ToolFormatter::formatFunctionsToOpenAITools($this->tools);
        }

        if ($this->requiredFunction instanceof FunctionInfo) {
           $openAiArgs['tool_choice'] = ToolFormatter::formatToolChoice($this->requiredFunction);
        }

        return $openAiArgs;
    }
   
    
    public function generateTextOrReturnFunctionCalled(string $prompt): string|FunctionInfo
    {
        $this->lastFunctionCalled = null;
         
        $messages = isset($this->historyChat) ? $this->historyChat->getMessageFromHistory() : array(Message::user($prompt));
        $openAiArgs = $this->getOpenAiArgs($messages);
 
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

        return $answer->choices[0]->message->content ?? '';
    }


    public function generateChat(array $messages): string
    {
        $openAiArgs = $this->getOpenAiArgs($messages);
        $answer = $this->client->chat()->create($openAiArgs);
        $this->lastResponse = $answer;
        $this->totalTokens += $answer->usage->totalTokens ?? 0;
        return $answer->choices[0]->message->content ?? '';
    }
    
    
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
   

    public function addTool(FunctionInfo $functionInfo): void
    {
        $this->tools[] = $functionInfo;
    }
    
    /**
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