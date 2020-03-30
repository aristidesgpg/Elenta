<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

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

$factory->define(Template::class, function (Faker $faker) {
    $user_ids = User::pluck('id')->toArray();
    return [
        'user_id' => $faker->randomElement($user_ids),
        'title' => "Template {$faker->numberBetween(0, 999)}",
        'can_request' => $faker->boolean(),
        'is_public' => $faker->boolean()
    ];
});
