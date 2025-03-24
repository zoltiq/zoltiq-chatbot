<?php

namespace LLphp\Query\SemanticSearch;

use LLphp\Chat\Message;
use LLphp\Embeddings\Document;
use LLphp\Embeddings\EmbeddingGenerator\EmbeddingGeneratorInterface;
use LLphp\Embeddings\VectorStores\VectorStoreBase;

class QuestionAnswering
{
    /** @var Document[] */
    protected array $retrievedDocs;

    public string $systemMessageTemplate = "Use the following pieces of context to answer the question of the user. If you don't know the answer, just say that you don't know, don't try to make up an answer.";

    public function __construct(
        public readonly VectorStoreBase $vectorStoreBase,
        public readonly EmbeddingGeneratorInterface $embeddingGenerator,
        private readonly QueryTransformer $queryTransformer = new IdentityTransformer(),
        private readonly RetrievedDocumentsTransformer $retrievedDocumentsTransformer = new IdentityDocumentsTransformer())
    {
    }

   
    /**
     * @param  array<string, string|int>|array<mixed[]>  $additionalArguments
     */
   
    public function generateContextfromDocument(string $question, int $k = 4, array $additionalArguments = []): string
    {
        $questions = $this->queryTransformer->transformQuery($question);
        
        $this->retrievedDocs = [];

        foreach ($questions as $question) {
            $embedding = $this->embeddingGenerator->embedText($question);
            $docs = $this->vectorStoreBase->similaritySearch($embedding, $k, $additionalArguments);
            foreach ($docs as $doc) {
                //md5 is needed for removing duplicates
                $this->retrievedDocs[\md5($doc['content'])] = $doc;
            }
        }

        // Ensure retro-compatibility and help in resorting the array
        $this->retrievedDocs = \array_values($this->retrievedDocs);

        $this->retrievedDocs = $this->retrievedDocumentsTransformer->transformDocuments($questions, $this->retrievedDocs);

        $context = '';
        $i = 0;
        foreach ($this->retrievedDocs as $document) {
            if ($i >= $k) {
                break;
            }
            $i++;
            $context .= $document['content'].' ';
        }

        return $context;
    }
 
       
}
