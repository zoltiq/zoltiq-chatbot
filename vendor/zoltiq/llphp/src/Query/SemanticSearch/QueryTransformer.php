<?php

namespace LLphp\Query\SemanticSearch;

interface QueryTransformer
{
    /**
     * @return string[]
     */
    public function transformQuery(string $query): array;
}
