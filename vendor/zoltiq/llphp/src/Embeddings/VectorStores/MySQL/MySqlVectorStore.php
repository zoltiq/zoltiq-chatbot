<?php

namespace LLphp\Embeddings\VectorStores\MySQL;

use Exception;
use LLphp\Embeddings\Document;
use LLphp\Embeddings\DocumentStore\DocumentStore;
use LLphp\Embeddings\VectorStores\VectorStoreBase;
use PDO;
use PDOException;

class MySqlVectorStore extends VectorStoreBase implements DocumentStore
{
    /** @var Document[] */
    private array $documentsPool = [];
	private readonly PDO $pdo;
	private string $currentCollection;

  
	public function __construct(
        string $host = 'localhost',
        string $database = 'default_database',
		string $db_user = 'default_user',
		string $db_pass = 'default_password',
    ) {
        
		try {
			// Connect to the MySQL database using PDO...
			$pdo = new PDO('mysql:host=' . $host . ';dbname=' . $database . ';charset=utf8', $db_user, $db_pass);
			$pdo->setAttribute(PDO::ATTR_STRINGIFY_FETCHES, false);
			$pdo->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
			$this->pdo = $pdo;
			//return $pdo;
		} catch (PDOException $e) {
			// Could not connect to the MySQL database, if this error occurs make sure you check your db settings are correct!
			header('HTTP/1.1 500 Internal Server Error');
			exit;
		}
	}


	public function setCurrentCollection(string $collection): void
    {
        $this->currentCollection = $collection;
    }


    public function addDocument(Document $document): void
    {
        $this->documentsPool[] = $document;
    }

    public function addDocuments(array $documents): void
    {
        $this->documentsPool = array_merge($this->documentsPool, $documents);
    }

    /**
     * @throws Exception
     */
    public function similaritySearch(array $embedding, int $k = 4, array $additionalArguments = []): array
    {
		
        
        
        
        
        
        
        
        $result = [];

		$sql_query = "
        SELECT url, price, regular_price, average_rating, title, summary, content 
        FROM products
        ORDER BY VEC_DISTANCE_COSINE(embedding, VEC_FromText(?))
        LIMIT 2";  
		
		
		try {
			$stmt = $this->pdo->prepare($sql_query);
			$stmt->execute([json_encode($embedding)]);
			$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
		} catch (Exception $e) {
			echo $e;
			exit(header('HTTP/1.1 500 Internal Server Error'));
		}

		return $result;	
		
    }

    public function fetchDocumentsByChunkRange(string $sourceType, string $sourceName, int $leftIndex, int $rightIndex): iterable
    {
        // This is a naive implementation, just to create an example of a DocumentStore
        $result = [];

        foreach ($this->documentsPool as $document) {
            if ($document->sourceType === $sourceType && $document->sourceName === $sourceName && $document->chunkNumber >= $leftIndex && $document->chunkNumber <= $rightIndex) {
                $result[$document->chunkNumber] = $document;
            }
        }

        \ksort($result);

        return $result;
    }
}
