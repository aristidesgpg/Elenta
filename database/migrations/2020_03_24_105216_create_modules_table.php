<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateModulesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('modules', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('template_id')->nullable();
            $table->uuid('program_id')->nullable();

            $table->string('title');
            $table->text('description');
            $table->boolean('is_public')->default(false);
            $table->string('folder');
            $table->integer('order');
            $table->jsonb('content');
            $table->jsonb('conditions');

            $table->timestamps();
            $table->softDeletes();

            $table->foreign('template_id')->references('id')->on('templates');
            $table->foreign('program_id')->references('id')->on('programs');
            $table->unique(['template_id', 'program_id', 'order']);
        });

        DB::statement('
            ALTER TABLE modules ADD CONSTRAINT one_module_parent_check CHECK (
                template_id is null or program_id is null
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
        Schema::dropIfExists('modules');
    }
}
