<?php

namespace App\GraphQL\Directives;

use Closure;
use GraphQL\Type\Definition\ResolveInfo;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;
use Nuwave\Lighthouse\Schema\Directives\BaseDirective;
use Nuwave\Lighthouse\Schema\Values\FieldValue;
use Nuwave\Lighthouse\Support\Contracts\FieldMiddleware;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

class ViewPolicyFilterDirective extends BaseDirective implements FieldMiddleware {
    /**
     * Filters GraphQL list fields using Policies 'view' method
     *
     * @param \Nuwave\Lighthouse\Schema\Values\FieldValue $fieldValue
     * @param \Closure $next
     * @return \Nuwave\Lighthouse\Schema\Values\FieldValue
     */
    // TODO: Remove this, and add conditions in model relationships that match Policies
    public function handleField(FieldValue $fieldValue, Closure $next): FieldValue {
        // Retrieve the existing resolver function
        /** @var Closure $previousResolver */
        $previousResolver = $fieldValue->getResolver();

        // Wrap around the resolver
        $wrappedResolver = function ($root, array $args, GraphQLContext $context, ResolveInfo $info) use ($previousResolver): array {
            // Call the resolver, passing along the resolver arguments
            /** @var Collection $result */
            $result = $previousResolver($root, $args, $context, $info);

            return $result instanceof Collection ? $result->filter(function (Model $r) {
                return Auth::user()->can('view', $r);
            })->toArray() : [];
        };

        // Place the wrapped resolver back upon the FieldValue
        // It is not resolved right now - we just prepare it
        $fieldValue->setResolver($wrappedResolver);

        // Keep the middleware chain going
        return $next($fieldValue);
    }
}
