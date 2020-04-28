<?php

namespace App\GraphQL\Resolvers;

use App\Models\LearnerProfile;
use App\Models\ProgramInvite;
use App\Models\ProgramModule;
use App\Models\ProgramModuleSend;
use App\Models\User;
use GraphQL\Type\Definition\ResolveInfo;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;
use Illuminate\Support\Facades\Auth;


class CreateProgramModuleSendsResolver {
    /**
     * @param $rootValue
     * @param array $args
     * @param \Nuwave\Lighthouse\Support\Contracts\GraphQLContext|null $context
     * @param \GraphQL\Type\Definition\ResolveInfo $resolveInfo
     * @return array
     * @throws \Exception
     */
    public function resolve($rootValue, array $args, GraphQLContext $context = null, ResolveInfo $resolveInfo) {
        $program_module_id = $args['program_module_id'];

        /** @var ProgramModule $pm */
        $pm = ProgramModule::find($program_module_id);
        $pm->recipientList->recipients->each(function (LearnerProfile $l) use ($pm) {
            $pm->sendModule($l, ProgramModuleSend::REASON_MANUAL, ProgramModuleSend::CHANNEL_EMAIL);
        });
        return $pm->sends->toArray();
    }
}
