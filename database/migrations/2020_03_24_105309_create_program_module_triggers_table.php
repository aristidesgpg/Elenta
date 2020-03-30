<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProgramModuleTriggersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('program_module_triggers', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('program_module_id');

            $table->timestamp('start_timestamp')->nullable();
            $table->string('start_timestamp_field')->nullable();

            $table->integer('frequency')->default(0);
            $table->integer('max_sends')->default(1);

            $table->timestamps();
            $table->softDeletes();

            $table->foreign('program_module_id')->references('id')->on('program_modules');
        });

        DB::statement('
            ALTER TABLE program_module_triggers ADD CONSTRAINT one_start_timestamp_check CHECK (
                start_timestamp is null or start_timestamp_field is null
            );
        ');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('module_triggers');
    }
}
