<?php

use App\Models\ConsultantProfile;
use App\Models\LearnerProfile;
use App\Models\Module;
use App\Models\Program;
use App\Models\ProgramInvite;
use App\Models\ProgramLearner;
use App\Models\ProgramModule;
use App\Models\ProgramModuleReminder;
use App\Models\ProgramModuleSend;
use App\Models\ProgramModuleTrigger;
use App\Models\Template;
use App\Models\TemplateModule;
use App\Models\TemplateRequest;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Log;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        factory(User::class, 10)->create();
        factory(LearnerProfile::class, 5)->create();
        factory(ConsultantProfile::class, 5)->create();
        factory(Template::class, 10)->create();
        factory(Program::class, 20)->create();
        factory(Module::class, 50)->create();
        factory(TemplateModule::class, 25)->create();
        factory(ProgramModule::class, 25)->create();
        factory(ProgramModuleTrigger::class, 25)->create();
        factory(ProgramModuleReminder::class, 25)->create();
        factory(ProgramModuleSend::class, 25)->create();
        factory(ProgramLearner::class, 10)->create();
        factory(TemplateRequest::class, 100)->create();
        factory(ProgramInvite::class, 100)->create();
    }
}
