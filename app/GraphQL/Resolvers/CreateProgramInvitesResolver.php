<?php

namespace App\GraphQL\Resolvers;

use App\Models\ConsultantProfile;
use App\Models\ProgramInvite;
use App\Models\User;
use GraphQL\Type\Definition\ResolveInfo;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;
use Illuminate\Support\Facades\Auth;


class CreateProgramInvitesResolver
{
    /**
     * @param $rootValue
     * @param array $args
     * @param \Nuwave\Lighthouse\Support\Contracts\GraphQLContext|null $context
     * @param \GraphQL\Type\Definition\ResolveInfo $resolveInfo
     * @return array
     * @throws \Exception
     */
    public function resolve($rootValue, array $args, GraphQLContext $context = null, ResolveInfo $resolveInfo)
    {
        $invites = [];
        foreach ($args['input'] as $input) {
            $invite = new ProgramInvite();
            $invite->fill([
                'email' => $input['email'],
                'message' => $input['message'],
                'program_id' => $input['program']['connect'],
                'user_id' => $input['creator']['connect'],
            ]);
            $invite->save();
            $invites[] = $invite;
        }
        return $invites;
    }
}
