<?php

use App\Models\Program;
use App\Models\Template;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        factory(User::class, 5)->create();
        factory(Template::class, 10)->create();
        factory(Program::class, 20)->create();
    }
}
