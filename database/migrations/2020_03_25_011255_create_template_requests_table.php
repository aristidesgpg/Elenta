<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTemplateRequestsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('template_requests', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('template_id');
            $table->uuid('learner_profile_id')->nullable();

            $table->string('email')->nullable();
            $table->string('organization')->nullable();
            $table->text('comment')->nullable();

            $table->timestamps();
            $table->softDeletes();

            $table->foreign('template_id')->references('id')->on('templates');
            $table->foreign('learner_profile_id')->references('id')->on('learner_profiles');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('template_requests');
    }
}
