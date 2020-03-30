<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\ConsultantProfile;
use App\Models\LearnerProfile;
use App\Models\Module;
use App\Models\Program;
use App\Models\ProgramModule;
use App\Models\ProgramModuleReminder;
use App\Models\ProgramModuleSend;
use App\Models\ProgramModuleTrigger;
use App\Models\Template;
use App\Models\TemplateModule;
use App\Models\User;
use Carbon\Carbon;
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

$factory->define(ProgramModuleSend::class, function (Faker $faker) {
    $learner_profile_ids = LearnerProfile::pluck('id')->toArray();
    $program_module_ids = ProgramModule::pluck('id')->toArray();

    $ts = [];
    $ts['send_timestamp'] = $faker->dateTimeThisMonth();
    $ts['open_timestamp'] = $faker->dateTimeBetween($ts['send_timestamp'], Carbon::parse($ts['send_timestamp'])->addHours(rand(1, 20)));
    $ts['click_timestamp'] = $faker->dateTimeBetween($ts['open_timestamp'], Carbon::parse($ts['open_timestamp'])->addMinutes(rand(1, 20)));
    $ts['response_timestamp'] = $faker->dateTimeBetween($ts['click_timestamp'], Carbon::parse($ts['click_timestamp'])->addMinutes(rand(10, 60)));

    return array_merge([
        'program_module_id' => $faker->randomElement($program_module_ids),
        'learner_profile_id' => $faker->randomElement($learner_profile_ids),
        'reason' => $faker->randomElement(ProgramModuleSend::REASONS),
        'channel' => $faker->randomElement(ProgramModuleSend::CHANNELS),
        'subject' => $faker->words(4, true),
        'message' => $faker->sentences(3, true),
        'response_feedback' => rand(0,10) > 8 ? $faker->sentences(3, true) : null,
        'response_rating' => $faker->numberBetween(0,1),
        'response_data' => '{}' // TODO
    ], $ts);
});
