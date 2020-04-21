<?php

use App\Models\Template;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CreateProgramsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('programs', function (Blueprint $table) {
            $table->uuid('id')->primary();

            $table->uuid('consultant_profile_id');
            $table->uuid('template_id');

            //TODO: Add company, logo, description
            $table->string('title');
            $table->text('description');
            $table->enum('format', Template::FORMATS);
            $table->integer('max_learners')->nullable();
            $table->timestamp('start_timestamp')->nullable();
            $table->boolean('can_invite')->default(true);
            $table->boolean('is_public')->default(false);
            $table->jsonb('dynamic_fields')->nullable();
            $table->string('company_name')->nullable();
            $table->string('company_logo_url')->nullable();

            // TODO: add venue, calendar details,  etc.

            $table->timestamps();
            $table->softDeletes();

            $table->foreign('consultant_profile_id')->references('id')->on('consultant_profiles');
            $table->foreign('template_id')->references('id')->on('templates');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('programs');
    }
}
