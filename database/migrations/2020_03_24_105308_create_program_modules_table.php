<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProgramModulesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('program_modules', function (Blueprint $table) {
            $table->id();
            $table->uuid('program_id');
            $table->uuid('module_id');
            // TODO not nullable
            $table->uuid('recipient_list_id')->nullable();

            $table->string('folder')->nullable();
            $table->integer('order')->nullable();

            $table->timestamps();
            $table->softDeletes();

            $table->foreign('program_id')->references('id')->on('programs');
            $table->foreign('module_id')->references('id')->on('modules');
            $table->foreign('recipient_list_id')->references('id')->on('recipient_lists');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('program_modules');
    }
}
