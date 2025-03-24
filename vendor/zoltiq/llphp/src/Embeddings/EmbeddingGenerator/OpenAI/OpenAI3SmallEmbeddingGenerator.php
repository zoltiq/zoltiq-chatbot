<?php

declare(strict_types=1);

namespace LLphp\Embeddings\EmbeddingGenerator\OpenAI;
use OpenAI\Client;

final class OpenAI3SmallEmbeddingGenerator extends AbstractOpenAIEmbeddingGenerator
{
    public function __construct(?Client $client = null)
    {
        parent::__construct($client); 
    }
    
    public function getEmbeddingLength(): int
    {
        return 1536;
    }

    public function getModelName(): string
    {
        return 'text-embedding-3-small';
    }
}
