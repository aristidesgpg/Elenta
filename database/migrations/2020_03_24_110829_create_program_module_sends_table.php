<?php

use App\Models\ProgramModuleSend;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProgramModuleSendsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('program_module_sends', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->bigInteger('program_module_id');
            $table->uuid('learner_profile_id');
            // TODO: Not nullable
            $table->uuid('recipient_list_id')->nullable();

            $table->enum('reason', ProgramModuleSend::REASONS);
            $table->enum('channel', ProgramModuleSend::CHANNELS);
            $table->string('subject')->nullable();
            $table->text('message')->nullable();

            $table->timestamp('send_timestamp')->nullable();
            $table->timestamp('open_timestamp')->nullable();
            $table->timestamp('click_timestamp')->nullable();
            $table->timestamp('response_timestamp')->nullable();

            $table->timestamp('last_reminded_at')->nullable();

            $table->text('response_feedback')->nullable();
            $table->unsignedSmallInteger('response_rating')->nullable();
            $table->jsonb('response_data')->nullable();

            $table->timestamps();
            $table->softDeletes();

            $table->foreign('program_module_id')->references('id')->on('program_modules');
            $table->foreign('learner_profile_id')->references('id')->on('learner_profiles');
            $table->foreign('recipient_list_id')->references('id')->on('recipient_lists');
            $table->unique(['program_module_id', 'learner_profile_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('program_module_sends');
    }
}
