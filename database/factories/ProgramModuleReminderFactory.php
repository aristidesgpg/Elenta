<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Module;
use App\Models\Program;
use App\Models\ProgramModule;
use App\Models\ProgramModuleReminder;
use App\Models\ProgramModuleTrigger;
use App\Models\Template;
use App\Models\TemplateModule;
use App\Models\User;
use Faker\Generator as Faker;
use Illuminate\Support\Str;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
*/

$factory->define(ProgramModuleReminder::class, function (Faker $faker) {
    $program_module_ids = ProgramModule::pluck('id')->toArray();

    return [
        'program_module_id' => $faker->randomElement($program_module_ids),
        'type' => $faker->randomElement(ProgramModuleReminder::TYPES),
        'subject' => $faker->words(4),
        'message' => $faker->sentences(3),
        'frequency' => $faker->randomElement([24,48,72, 7*24]),
        'max_reminders' => $faker->numberBetween(1, 5)
    ];
});
