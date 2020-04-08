<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Module;
use App\Models\Program;
use App\Models\Template;
use App\Models\TemplateModule;
use App\Models\User;
use Faker\Generator as Faker;
use Illuminate\Support\Facades\Log;
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

$factory->define(TemplateModule::class, function (Faker $faker) {
    $template_ids = Template::pluck('id')->toArray();
    $module_ids = Module::pluck('id')->toArray();

    $folder = rand(0, 100) > 80 ? "Folder {$faker->numberBetween(0, 5)}" : null;
    return [
        'template_id' => $faker->randomElement($template_ids),
        'module_id' => $faker->randomElement($module_ids),
        'folder' => $folder,
        'order' => 0, // TODO
    ];
});
