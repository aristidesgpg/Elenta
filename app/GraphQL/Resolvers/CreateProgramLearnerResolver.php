<?php

namespace App\GraphQL\Resolvers;

use App\Models\LearnerProfile;
use App\Models\Program;
use App\Models\ProgramInvite;
use App\Models\ProgramLearner;
use App\Models\User;
use GraphQL\Type\Definition\ResolveInfo;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;
use Illuminate\Support\Facades\Auth;


class CreateProgramLearnerResolver {
    /**
     * @param $rootValue
     * @param array $args
     * @param \Nuwave\Lighthouse\Support\Contracts\GraphQLContext|null $context
     * @param \GraphQL\Type\Definition\ResolveInfo $resolveInfo
     * @return array
     * @throws \Exception
     */
    public function resolve($rootValue, array $args, GraphQLContext $context = null, ResolveInfo $resolveInfo) {
        $program = Program::find($args['program_id']);
        $learner_profile = LearnerProfile::whereUserId(Auth::user()->getAuthIdentifier())->first();

        if ($existing = $program->learners()->where('learner_profile_id', $learner_profile->id)->first()) {
            return $existing->toArray();
        }

        if (
            $program->is_public ||
            ProgramInvite::pluck('learner_profile_id')->contains($learner_profile->id)
        ) {
            $pl = new ProgramLearner();
            $pl->fill([
                'program_id' => $program->id,
                'learner_profile_id' => $learner_profile->id
            ]);
            $pl->save();
            return $pl->toArray();
        }
    }
}
