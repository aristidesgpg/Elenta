<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CreateTemplateModulesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('template_modules', function (Blueprint $table) {
            $table->id();
            $table->uuid('template_id')->nullable();
            $table->uuid('module_id')->nullable();

            $table->string('folder')->nullable();
            $table->integer('order')->nullable();

            $table->timestamps();
            $table->softDeletes();

            $table->foreign('template_id')->references('id')->on('templates');
            $table->foreign('module_id')->references('id')->on('modules');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('template_modules');
    }
}
