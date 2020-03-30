<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Module;
use App\Models\Program;
use App\Models\ProgramModule;
use App\Models\Template;
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

$factory->define(ProgramModule::class, function (Faker $faker) {
    $program_ids = Program::pluck('id')->toArray();
    $module_ids = Module::pluck('id')->toArray();

    $folder = rand(0, 100) > 80 ? "Folder {$faker->numberBetween(0, 5)}" : null;
    return [
        'program_id' => $faker->randomElement($program_ids),
        'module_id' => $faker->randomElement($module_ids),
        'folder' => $folder,
        'order' => 0, // TODO
    ];
});
