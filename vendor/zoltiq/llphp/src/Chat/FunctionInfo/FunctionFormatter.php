<?php

namespace LLphp\Chat\FunctionInfo;

class FunctionFormatter
{
      
   
    /**
     * @return array{type: string, description: string, items?: array{type: string, properties?: array<string, array{type: string, description: string}>}, properties?: array<string, array{type: string, description: string}>, enum?: mixed[], format?: string}
     *
     * @throws \Exception
     */
    public static function formatParameter(Parameter $parameter): array
    {
        $param = [
            'type' => $parameter->type,
            'description' => $parameter->description,
        ];

        if ($parameter->type === 'array') {
            if ($parameter->itemsOrProperties === null) {
                throw new \Exception('Array type parameter must have items description. Define a type or use the Parameter class for object.');
            }

            if (is_string($parameter->itemsOrProperties)) {
                $param['items'] = [
                    'type' => $parameter->itemsOrProperties,
                ];
            } else {
                $properties = [];
                /** @var Parameter $property */
                foreach ($parameter->itemsOrProperties as $property) {
                    $properties[$property->name] = [
                        'type' => $property->type,
                        'description' => $property->description,
                    ];
                }

                $param['items'] = [
                    'type' => 'object',
                    'properties' => $properties,
                ];
            }
        }

        if ($parameter->type === 'object') {
            if (! is_array($parameter->itemsOrProperties)) {
                throw new \Exception('Object type parameter must have properties description. You need to pass an array of Parameter.');
            }

            $properties = [];
            /** @var Parameter $item */
            foreach ($parameter->itemsOrProperties as $item) {
                $properties[$item->name] = [
                    'type' => $item->type,
                    'description' => $item->description,
                ];
            }

            $param['properties'] = $properties;
        }

        if ($parameter->enum) {
            $param['enum'] = $parameter->enum;
        }

        if ($parameter->format) {
            $param['format'] = $parameter->format;
        }

        return $param;
    }

    /**
     * @param  FunctionInfo[]  $tools
     * @return array<int, array<string, mixed>>
     */
    public static function formatFunctionsToAnthropic(array $tools): array
    {
        if ($tools === []) {
            return [];
        }

        $result = [];
        foreach ($tools as $tool) {
            $result[] = self::formatOneFunctionToAnthropic($tool);
        }

        return $result;
    }

    /**
     * @return array{name: string, description: string, input_schema: mixed[]}
     */
    private static function formatOneFunctionToAnthropic(FunctionInfo $tool): array
    {
        return [
            'name' => $tool->name,
            'description' => $tool->description,
            'input_schema' => self::toInputSchema($tool->parameters, $tool->requiredParameters),
        ];
    }

    /**
     * @param  Parameter[]  $parameters
     * @param  Parameter[]  $requiredParameters
     * @return array{type: string, properties: array<string, array{type: string, description: string}>}
     */
    private static function toInputSchema(array $parameters, array $requiredParameters): array
    {
        $result = [];
        foreach ($parameters as $parameter) {
            $result[$parameter->name] = [
                'type' => $parameter->type,
                'description' => $parameter->description,
            ];

            if ($parameter->enum) {
                $result[$parameter->name]['enum'] = $parameter->enum;
            }
        }

        $requiredParametersNames = [];
        foreach ($requiredParameters as $requiredParameter) {
            $requiredParametersNames[] = $requiredParameter->name;
        }

        return [
            'type' => 'object',
            'properties' => $result,
            'required' => $requiredParametersNames,
            'additionalProperties' => False
        ];
    }
}
