<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateModulesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('modules', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('consultant_profile_id');

            $table->string('title');
            $table->text('description');
            $table->boolean('is_public')->default(false);
            $table->jsonb('content')->nullable();
            // TODO: Can we set triggers, reminders, etc. in templates?
            $table->jsonb('conditions')->nullable();

            $table->timestamps();
            $table->softDeletes();

            $table->foreign('consultant_profile_id')->references('id')->on('consultant_profiles');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('modules');
    }
}
