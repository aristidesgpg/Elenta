<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Module;
use App\Models\Program;
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

$factory->define(Module::class, function (Faker $faker) {
    return [
        'title' => "Module {$faker->numberBetween(0, 999)}",
        'description' => $faker->paragraph(5),
        'is_public' => $faker->boolean(),
        'content' => '{}', // TODO
        'conditions' => '{}', // TODO
    ];
});
