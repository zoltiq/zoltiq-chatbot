<?php

namespace LLphp\Chat\FunctionInfo;

class FunctionRunner
{
    
     /**
     * Executes the function stored in the FunctionInfo object.
     *
     * If no arguments are provided (`jsonArgs` is empty), the function is called without parameters.
     * Otherwise, arguments are decoded from JSON and passed to the function dynamically.
     *
     * @param FunctionInfo $functionInfo
     * @return mixed
     *
     */
    public static function run(FunctionInfo $functionInfo): mixed
    {
        if (empty($functionInfo->jsonArgs)) {
			return $functionInfo->instance->{$functionInfo->name}();
		}
        $arguments = json_decode($functionInfo->jsonArgs, true, 512, JSON_THROW_ON_ERROR);

        return $functionInfo->instance->{$functionInfo->name}(...$arguments);
    }
}
