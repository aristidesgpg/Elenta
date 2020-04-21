<?php

namespace App\GraphQL\Resolvers;

use App\Models\{
    Module, ModuleReminder, ModuleTrigger, Program, Template
};
use DB;
use GraphQL\Type\Definition\ResolveInfo;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;


class DuplicateTemplateModulesResolver
{
    /**
     * @param $rootValue
     * @param array $args
     * @param \Nuwave\Lighthouse\Support\Contracts\GraphQLContext|null $context
     * @param \GraphQL\Type\Definition\ResolveInfo $resolveInfo
     * @return Program|Template
     * @throws \Exception
     */
    public function resolve($rootValue, array $args, GraphQLContext $context = null, ResolveInfo $resolveInfo)
    {
        /** @var Template|Program $rootObject */
        $rootObject = null;
        switch ($args['type']) {
            case "template":
                {
                    $rootObject = Template::findOrFail($args['id']);
                    break;
                }
            case "program":
                {
                    $rootObject = Program::findOrFail($args['id']);
                    break;
                }
            default:
                {
                    throw new \Exception("Invalid parent type");
                    break;
                }
        }

        DB::transaction(function () use ($args, $rootObject) {
            foreach ($args['modules'] as $moduleId) {
                /** @var Module $module */
                $module = Module::findOrFail($moduleId);

                $newModule = $module->replicate();
                $newModule->save();

                $rootObject->modules()->attach($newModule);

                $module->trigger()->each(function (ModuleTrigger $moduleTrigger) use ($newModule) {
                    /** @var ModuleTrigger $newTrigger */
                    $newTrigger = $moduleTrigger->replicate();
                    $newTrigger->module()->associate($newModule);
                    $newTrigger->save();
                });

                $module->reminder()->each(function (ModuleReminder $moduleReminder) use ($newModule) {
                    /** @var ModuleReminder $newReminder */
                    $newReminder = $moduleReminder->replicate();
                    $newReminder->module()->associate($newModule);
                    $newReminder->save();
                });
            }
        });

        return $rootObject->load(["modules.reminders", "modules.triggers"]);
    }
}