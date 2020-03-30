<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Program;
use App\Models\ProgramLearner;
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

$factory->define(ProgramLearner::class, function (Faker $faker) {
    $template_ids = Template::pluck('id')->toArray();
    $program_ids = Program::pluck('id')->toArray();

    return [
        'template_id' => $faker->randomElement($template_ids),
        'program_id' => $faker->randomElement($program_ids),
        'title' => "Module {$faker->randomNumber()}",
        'description' => $faker->paragraph(5),
        'is_public' => $faker->boolean(),
        'folder' => "Folder {$faker->numberBetween(1, 4)}",
        'order' => 0,
    ];
});
