<?php

use App\Models\ProgramModuleReminder;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProgramModuleRemindersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('program_module_reminders', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('program_module_id');

            $table->enum('type', ProgramModuleReminder::TYPES);
            $table->string('subject');
            $table->text('message');
            $table->integer('frequency')->default(72);
            $table->integer('max_reminders')->default(3);

            $table->timestamps();
            $table->softDeletes();

            $table->foreign('program_module_id')->references('id')->on('program_modules');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('program_module_reminders');
    }
}
