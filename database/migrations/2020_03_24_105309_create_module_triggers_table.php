<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CreateModuleTriggersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('module_triggers', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('module_id');

            $table->timestamp('start_timestamp')->nullable();
            $table->string('start_timestamp_field')->nullable();

            $table->integer('frequency')->default(0);
            $table->integer('max_sends')->default(1);

            $table->timestamps();
            $table->softDeletes();

            $table->foreign('module_id')->references('id')->on('modules');
        });

        DB::statement('
            ALTER TABLE module_triggers ADD CONSTRAINT one_start_timestamp_check CHECK (
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
