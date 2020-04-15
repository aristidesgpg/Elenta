<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Module;
use App\Models\Program;
use App\Models\Tag;
use App\Models\Taggable;
use App\Models\Template;
use Faker\Generator as Faker;

$factory->define(Taggable::class, function (Faker $faker) {
    $tag_ids = Tag::pluck('id')->toArray();
    $template_ids = Template::pluck('id')->toArray();
    $program_ids = Program::pluck('id')->toArray();
    $module_ids = Module::pluck('id')->toArray();
    $type_choice = rand(0, 2);
    return [
        'tag_id' => $faker->randomElement($tag_ids),
        'taggable_id' => $type_choice == 0 ? $faker->randomElement($template_ids) :
            (($type_choice == 1) ? $faker->randomElement($program_ids) : $faker->randomElement($module_ids)),
        'taggable_type' => $type_choice == 0 ? Taggable::TEMPLATE :
            (($type_choice == 1) ? Taggable::PROGRAM : Taggable::MODULE)
    ];
});
