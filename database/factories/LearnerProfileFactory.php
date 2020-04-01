<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\LearnerProfile;
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

$factory->define(LearnerProfile::class, function (Faker $faker) {
    $user_ids = User::pluck('id')->toArray();
    return [
        'user_id' => $faker->unique()->randomElement($user_ids),
        'picture_url' => $faker->imageUrl(),
        'role' => $faker->words(3, true),
        'tenure' => $faker->words(2, true)
    ];
});
