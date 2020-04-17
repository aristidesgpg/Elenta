<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\ConsultantProfile;
use App\Models\LearnerProfile;
use App\Models\Module;
use App\Models\Program;
use App\Models\ProgramModule;
use App\Models\ModuleReminder;
use App\Models\ProgramModuleSend;
use App\Models\ModuleTrigger;
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
    $source_ids = LearnerProfile::pluck('id')->shuffle()->crossJoin(ProgramModule::pluck('id'));

    $ts = [];
    $ts['send_timestamp'] = $faker->dateTimeThisMonth();
    $ts['open_timestamp'] = $faker->dateTimeBetween($ts['send_timestamp'], Carbon::parse($ts['send_timestamp'])->addHours(rand(1, 20)));
    $ts['click_timestamp'] = $faker->dateTimeBetween($ts['open_timestamp'], Carbon::parse($ts['open_timestamp'])->addMinutes(rand(1, 20)));

    $i = $source_ids->random();
    $ids = [
        'program_module_id' => $i[1],
        'learner_profile_id' => $i[0]
    ];

    return array_merge([
        'reason' => $faker->randomElement(ProgramModuleSend::REASONS),
        'channel' => $faker->randomElement(ProgramModuleSend::CHANNELS),
        'subject' => $faker->words(4, true),
        'message' => $faker->sentences(3, true),
        'response_feedback' => rand(0,10) > 8 ? $faker->sentences(3, true) : null,
        'response_rating' => $faker->numberBetween(0,1),
        'response_data' => '{}' // TODO
    ], $ts, $ids);
});
