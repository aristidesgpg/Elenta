<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateModuleRemindersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('module_reminders', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('module_id');

            $table->enum('type', ['MANUAL', 'AUTOMATED']);
            $table->string('subject');
            $table->text('message');
            $table->integer('frequency')->default(36);
            $table->integer('max_reminders')->default(3);

            $table->timestamps();
            $table->softDeletes();

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
        Schema::dropIfExists('module_reminders');
    }
}
