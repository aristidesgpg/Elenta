<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\ConsultantProfile;
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

$factory->define(ConsultantProfile::class, function (Faker $faker) {
    $user_ids = User::pluck('id')->toArray();
    return [
        'user_id' => $faker->randomElement($user_ids),
        'picture_url' => $faker->imageUrl(),
        'title' => $faker->words(5, true),
        'bio' => $faker->sentences(5, true)
    ];
});
