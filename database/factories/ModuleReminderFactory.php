<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Module;
use App\Models\Program;
use App\Models\ProgramModule;
use App\Models\ModuleReminder;
use App\Models\ModuleTrigger;
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

$factory->define(ModuleReminder::class, function (Faker $faker) {
    $module_ids = Module::pluck('id')->toArray();

    return [
        'module_id' => $faker->randomElement($module_ids),
        'subject' => $faker->words(4, true),
        'message' => $faker->sentences(3, true),
        'frequency' => $faker->numberBetween(1, 5),
        'max_reminders' => $faker->numberBetween(1, 5)
    ];
});
