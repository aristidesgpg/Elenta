<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProgramInvitesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('program_invites', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('program_id');
            $table->uuid('user_id');
            $table->uuid('learner_profile_id')->nullable();

            $table->string('email');
            $table->string('message')->nullable();

            $table->timestamps();
            $table->softDeletes();

            $table->foreign('program_id')->references('id')->on('programs');
            $table->foreign('learner_profile_id')->references('id')->on('learner_profiles');
            $table->foreign('user_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('program_invites');
    }
}
