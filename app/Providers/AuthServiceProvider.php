<?php

namespace App\Providers;

use App\Models\{ConsultantProfile,
    LearnerProfile,
    Module,
    ModuleReminder,
    ModuleTrigger,
    Policies\ConsultantProfilePolicy,
    Program,
    ProgramInvite,
    ProgramLearner,
    ProgramModule,
    ProgramModuleSend,
    Template,
    TemplateModule,
    TemplateRequest,
    User};
use App\Policies\{
    LearnerProfilePolicy,
    ModulePolicy,
    ModuleReminderPolicy,
    ModuleTriggerPolicy,
    ProgramInvitePolicy,
    ProgramLearnerPolicy,
    ProgramModulePolicy,
    ProgramModuleSendPolicy,
    ProgramPolicy,
    TemplateModulePolicy,
    TemplatePolicy,
    TemplateRequestPolicy,
    UserPolicy
};
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        User::class => UserPolicy::class,
        ConsultantProfile::class => ConsultantProfilePolicy::class,
        LearnerProfile::class => LearnerProfilePolicy::class,
        Module::class => ModulePolicy::class,
        ModuleReminder::class => ModuleReminderPolicy::class,
        ModuleTrigger::class => ModuleTriggerPolicy::class,
        ProgramInvite::class => ProgramInvitePolicy::class,
        ProgramLearner::class => ProgramLearnerPolicy::class,
        ProgramModule::class => ProgramModulePolicy::class,
        ProgramModuleSend::class => ProgramModuleSendPolicy::class,
        Program::class => ProgramPolicy::class,
        Template::class => TemplatePolicy::class,
        TemplateModule::class => TemplateModulePolicy::class,
        TemplateRequest::class => TemplateRequestPolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        //
    }
}
