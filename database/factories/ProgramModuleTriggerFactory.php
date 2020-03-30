<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Module;
use App\Models\Program;
use App\Models\ProgramModule;
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

$factory->define(ProgramModuleTrigger::class, function (Faker $faker) {
    $program_module_ids = ProgramModule::pluck('id')->toArray();

    return [
        'program_module_id' => $faker->randomElement($program_module_ids),
        'start_timestamp' => $faker->dateTimeThisMonth(),
        'start_timestamp_field' => null, // TODO
        'frequency' => $faker->randomElement([24,48,72, 7*24]),
        'max_sends' => $faker->numberBetween(1, 5), // TODO
    ];
});
