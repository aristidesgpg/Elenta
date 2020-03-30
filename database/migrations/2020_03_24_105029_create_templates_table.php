<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTemplatesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('templates', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('consultant_profile_id');

            $table->string('title');
            $table->boolean('can_request')->default(true);
            $table->boolean('is_public')->default(false);
            $table->jsonb('dynamic_fields')->nullable();

            $table->timestamps();
            $table->softDeletes();

            $table->foreign('consultant_profile_id')->references('id')->on('consultant_profiles');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('templates');
    }
}
