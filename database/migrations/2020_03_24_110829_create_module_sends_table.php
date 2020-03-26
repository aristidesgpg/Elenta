<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateModuleSendsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('module_sends', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('module_id');
            $table->uuid('user_id');

            $table->enum('reason', ['MANUAL', 'TRIGGER', 'REMINDER']);
            $table->enum('channel', ['EMAIL', 'SLACK']);
            $table->string('subject');
            $table->text('message');

            $table->timestamp('send_timestamp');
            $table->timestamp('open_timestamp');
            $table->timestamp('click_timestamp');
            $table->timestamp('response_timestamp');

            $table->text('response_feedback');
            $table->unsignedSmallInteger('response_rating');
            $table->jsonb('response_data');

            $table->timestamps();
            $table->softDeletes();

            $table->foreign('module_id')->references('id')->on('modules');
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
        Schema::dropIfExists('module_sends');
    }
}
