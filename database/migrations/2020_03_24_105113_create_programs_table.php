<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProgramsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('programs', function (Blueprint $table) {
            $table->uuid('id')->primary();

            $table->uuid('user_id');
            $table->uuid('template_id');

            $table->string('title');
            $table->string('format');
            $table->integer('max_learners')->nullable();
            $table->timestamp('start_timestamp')->nullable();
            $table->boolean('can_share')->default(true);
            $table->boolean('is_public')->default(false);
            $table->jsonb('dynamic_fields')->nullable();
            $table->jsonb('dynamic_fields_data')->nullable();

            $table->timestamps();
            $table->softDeletes();

            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('template_id')->references('id')->on('templates');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('programs');
    }
}
