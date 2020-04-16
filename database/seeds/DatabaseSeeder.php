<?php

use App\Models\ConsultantProfile;
use App\Models\LearnerProfile;
use App\Models\Module;
use App\Models\Program;
use App\Models\ProgramInvite;
use App\Models\ProgramLearner;
use App\Models\ProgramModule;
use App\Models\ModuleReminder;
use App\Models\ProgramModuleSend;
use App\Models\ModuleTrigger;
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
        factory(TemplateModule::class, 100)->create();
        factory(ProgramModule::class, 100)->create();
        factory(ModuleTrigger::class, 100)->create();
        factory(ModuleReminder::class, 100)->create();

        // Hack to retry till enough are created without violating unique column constraint
        $created = false;
        while (!$created) {
            if (ProgramModuleSend::all()->count() >= 100) break;
            try {
                factory(ProgramModuleSend::class, 100)->create();
                $created = true;
            } catch  (\Illuminate\Database\QueryException $e) {
                $created = false;
            }
        }

        factory(ProgramLearner::class, 50)->create();
        factory(TemplateRequest::class, 200)->create();
        factory(ProgramInvite::class, 200)->create();
    }
}
