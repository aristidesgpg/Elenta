<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\ConsultantProfile;
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
    $consultant_profile_ids = ConsultantProfile::pluck('id')->toArray();
    return [
        'consultant_profile_id' => $faker->randomElement($consultant_profile_ids),
        'title' => "Module {$faker->numberBetween(0, 999)}",
        'description' => $faker->paragraph(5),
        'is_public' => $faker->boolean(),
        'content' => "
        {
            \"schema\": {\"type\":\"object\",\"properties\":{\"number\":{\"type\":\"number\",\"title\":\"Number\",\"description\":\"\",\"minimum\":5,\"maximum\":20,\"multipleOf\":1,\"default\":0},\"short_text\":{\"type\":\"string\",\"title\":\"Short Text\",\"description\":\"\",\"default\":\"\"},\"long_text\":{\"type\":\"string\",\"title\":\"Long Text\",\"description\":\"\",\"default\":\"\"}},\"required\":[]},
            \"uiSchema\": {\"ui:order\":[\"number\",\"short_text\",\"long_text\"],\"number\":{\"editSchema\":{\"type\":\"object\",\"properties\":{\"required\":{\"type\":\"boolean\"},\"minimum\":{\"type\":\"number\",\"title\":\"Minimum\",\"default\":0},\"maximum\":{\"type\":\"number\",\"title\":\"Maximum\",\"default\":100},\"multipleOf\":{\"type\":\"number\",\"title\":\"Step\",\"default\":1}}},\"editUISchema\":{}},\"short_text\":{\"editSchema\":{\"type\":\"object\",\"properties\":{\"required\":{\"type\":\"boolean\"}}},\"editUISchema\":{}},\"long_text\":{\"ui:widget\":\"textarea\",\"editSchema\":{\"type\":\"object\",\"properties\":{\"required\":{\"type\":\"boolean\"}},\"editUISchema\":{}}}}
        }",
        'conditions' => '{}', // TODO
    ];
});
