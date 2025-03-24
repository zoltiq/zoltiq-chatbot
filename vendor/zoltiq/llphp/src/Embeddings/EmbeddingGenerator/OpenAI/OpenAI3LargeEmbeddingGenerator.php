<?php

declare(strict_types=1);

namespace LLphp\Embeddings\EmbeddingGenerator\OpenAI;

use LLphp\OpenAIConfig;

final class OpenAI3LargeEmbeddingGenerator extends AbstractOpenAIEmbeddingGenerator
{
    public function __construct(?OpenAIConfig $config = null)
    {
        parent::__construct($config); 
    }
    
    public function getEmbeddingLength(): int
    {
        return 3072;
    }

    public function getModelName(): string
    {
        return 'text-embedding-3-large';
    }
}
