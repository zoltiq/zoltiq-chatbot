<?php

namespace LLphp\Embeddings\DataReader;

use LLphp\Embeddings\Document;

interface DataReader
{
    /**
     * @return Document[]
     */
    public function getDocuments(): array;
}
