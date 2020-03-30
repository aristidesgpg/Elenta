<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\LearnerProfile;
use App\Models\Program;
use App\Models\ProgramLearner;
use App\Models\Template;
use App\Models\TemplateRequest;
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

$factory->define(TemplateRequest::class, function (Faker $faker) {
    $template_ids = Template::pluck('id')->toArray();
    $learner_profile_ids = LearnerProfile::pluck('id')->toArray();

    return [
        'template_id' => $faker->randomElement($template_ids),
        'learner_profile_id' => $faker->randomElement($learner_profile_ids),
        'email' => $faker->companyEmail, // TODO: Email only if learner null
        'organization' => $faker->company,
        'comment' => $faker->sentences(2, true),
    ];
});
