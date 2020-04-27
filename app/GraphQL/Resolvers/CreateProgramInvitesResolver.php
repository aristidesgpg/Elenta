<?php

namespace App\GraphQL\Resolvers;

use App\Models\ProgramInvite;
use App\Models\User;
use GraphQL\Type\Definition\ResolveInfo;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;
use Illuminate\Support\Facades\Auth;


class CreateProgramInvitesResolver {
    /**
     * @param $rootValue
     * @param array $args
     * @param \Nuwave\Lighthouse\Support\Contracts\GraphQLContext|null $context
     * @param \GraphQL\Type\Definition\ResolveInfo $resolveInfo
     * @return array
     * @throws \Exception
     */
    public function resolve($rootValue, array $args, GraphQLContext $context = null, ResolveInfo $resolveInfo) {
        //TODO: Add some protection here to stop people spamming - e.g domain restriction, or throttling
        $invites = [];
        foreach ($args['input'] as $input) {
            $program_id = $input['program']['connect'];
            $email = $input['email'];

            if (ProgramInvite::whereEmail($email)->where('program_id', $program_id)->count() == 0) {

                $invite = new ProgramInvite();
                $invite->fill([
                    'email' => $email,
                    'message' => $input['message'] ?: "",
                    'program_id' => $program_id,
                    'user_id' => Auth::user()->getAuthIdentifier()
                ]);
                if ($existing_user = User::whereEmail($input['email'])->first()) {
                    if ($existing_user->learnerProfile) {
                        $invite->learner_profile_id = $existing_user->learnerProfile->id;
                    }
                }
                $invite->save();
                $invites[] = $invite;
            }
        }
        return $invites;
    }
}
