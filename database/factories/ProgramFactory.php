<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\ConsultantProfile;
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

$factory->define(Program::class, function (Faker $faker) {
    $consultant_profile_ids = ConsultantProfile::pluck('id')->toArray();
    $template_ids = Template::pluck('id')->toArray();

    $format = $faker->randomElement(Template::FORMATS);
    $format_params = [];
    if ($format != 'SELF_DIRECTED') {
        $format_params['max_learners'] = $faker->numberBetween(5, 50);
        $format_params['start_timestamp'] = $faker->dateTimeThisMonth();
    }
    return array_merge([
        'consultant_profile_id' => $faker->randomElement($consultant_profile_ids),
        'template_id' => $faker->randomElement($template_ids),
        'title' => "Program {$faker->numberBetween(0, 999)}",
        'description' => $faker->sentence(50),
        'can_invite' => $faker->boolean(),
        'is_public' => $faker->boolean(),
        'format' => $format,
        'dynamic_fields' => '{}',
        'dynamic_fields_data' => '{}', //TODO: Sample JSON data
    ], $format_params);
});
