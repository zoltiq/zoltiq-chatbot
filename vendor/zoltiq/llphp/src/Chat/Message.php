<?php

namespace LLphp\Chat;

use LLphp\Chat\Enums\ChatRole;
use LLphp\Chat\FunctionInfo\ToolCall;

class Message
{
    public ChatRole $role;
    public string $content;
    public string $tool_call_id;
    public string $name;

    /**
     * @var ToolCall[]
     */
    public array $tool_calls;

    /**
     * Creates a system role message.
     *
     * @param string $content
     * @return self
     */
    public static function system(string $content): self
    {
        $message = new self();
        $message->role = ChatRole::System;
        $message->content = $content;

        return $message;
    }

    /**
     * Creates a user role message.
     *
     * @param string $content
     * @return self
     */
    public static function user(string $content): self
    {
        $message = new self();
        $message->role = ChatRole::User;
        $message->content = $content;

        return $message;
    }

    /**
     * Creates an assistant message that includes a request to call tools.
     *
     * @param ToolCall[] $toolCalls
     * @return self 
     */
    public static function assistantAskingTools(array $toolCalls): self
    {
        $message = new self();
        $message->role = ChatRole::Assistant;
        $message->tool_calls = $toolCalls;

        return $message;
    }

    /**
     * Creates an assistant role message with text content.
     *
     * @param string $content
     * @return self
     */
    public static function assistant(string $content): self
    {
        $message = new self();
        $message->role = ChatRole::Assistant;
        $message->content = $content;

        return $message;
    }

    /**
     * Creates a function result message.
     *
     * @param string $content
     * @param string $name
     * @return self
     */
    public static function functionResult(string $content, string $name): self
    {
        $message = new self();
        $message->role = ChatRole::Function;
        $message->content = $content;
        $message->name = $name;

        return $message;
    }

    /**
     * Creates a tool result message.
     *
     * @param string $content
     * @param string|null $toolCallId
     * @return self
     */
    public static function toolResult(string $content, ?string $toolCallId = null): self
    {
        $message = new self();
        $message->role = ChatRole::Tool;
        $message->content = $content;

        if ($toolCallId !== null) {
            $message->tool_call_id = $toolCallId;
        }

        return $message;
    }
}
