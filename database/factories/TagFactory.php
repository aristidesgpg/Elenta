<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Module as Module;
use App\Models\Program as Program;
use App\Models\Tag;
use App\Models\Template as Template;
use Faker\Generator as Faker;

$factory->define(Tag::class, function (Faker $faker) {
    return [
        'name' => $faker->unique()->text($maxNbChars = 10)
    ];
});

// Generates a new relationship between a tag and template/program/module after a tag is inserted into database
$factory->afterCreating(Tag::class, function($tag, $faker) {
    $tag_ids = Tag::pluck('id')->toArray();
    $template_ids = Template::pluck('id')->toArray();
    $program_ids = Program::pluck('id')->toArray();
    $module_ids = Module::pluck('id')->toArray();
    $type_choice = rand(0, 2);
    $id_choice = rand(0, 9);
    DB::table('taggables')->insert(
        [
            'tag_id' => $tag_ids[rand(0, 9)],
            'taggable_id' => $type_choice == 0 ? $template_ids[$id_choice] :
                            (($type_choice == 1) ? $program_ids[$id_choice] : $module_ids[$id_choice]),
            'taggable_type' => $type_choice == 0 ? 'App\Models\Template' :
                            (($type_choice == 1) ? 'App\Models\Program' : 'App\Models\Module')
        ]
    );
    //$consultant_profile_ids = ConsultantProfile::pluck('id')->toArray();
});
