<?php

namespace App\GraphQL\ErrorHandlers;

use Closure;
use GraphQL\Error\Error;
use Illuminate\Support\Facades\Log;
use Nuwave\Lighthouse\Execution\ErrorHandler;

class ElentaLighthouseErrorHandler implements ErrorHandler {
    public static function handle(Error $error, Closure $next): array {
        //Log::error($error);
        return $next($error);
    }
}
