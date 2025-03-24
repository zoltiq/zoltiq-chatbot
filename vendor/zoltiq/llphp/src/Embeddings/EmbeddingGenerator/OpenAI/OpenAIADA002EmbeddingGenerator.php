<?php

declare(strict_types=1);

namespace LLphp\Embeddings\EmbeddingGenerator\OpenAI;

use LLphp\OpenAIConfig;

final class OpenAIADA002EmbeddingGenerator extends AbstractOpenAIEmbeddingGenerator
{
    public function __construct(?OpenAIConfig $config = null)
    {
        parent::__construct($config); 
    }    
    
    public function getEmbeddingLength(): int
    {
        return 1536;
    }

    public function getModelName(): string
    {
        return 'text-embedding-ada-002';
    }
}
