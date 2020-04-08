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

            $table->enum('reason', ProgramModuleSend::REASONS);
            $table->enum('channel', ProgramModuleSend::CHANNELS);
            $table->string('subject');
            $table->text('message');

            $table->timestamp('send_timestamp');
            $table->timestamp('open_timestamp');
            $table->timestamp('click_timestamp');
            $table->timestamp('response_timestamp');

            $table->text('response_feedback')->nullable();
            $table->unsignedSmallInteger('response_rating');
            $table->jsonb('response_data');

            $table->timestamps();
            $table->softDeletes();

            $table->foreign('program_module_id')->references('id')->on('program_modules');
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
        Schema::dropIfExists('program_module_sends');
    }
}
