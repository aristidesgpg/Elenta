<?php

use App\RecipientList;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRecipientListsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('recipient_lists', function (Blueprint $table) {
            $table->uuid('id')->primary();
            // TODO: Make polymorhpic so it works for templates too
            $table->uuid('program_id')->nullable();
            $table->uuid('template_id')->nullable();

            $table->string('name');
            $table->enum('channel', RecipientList::CHANNELS);
            $table->integer('max_recipients')->nullable();

            $table->timestamps();
            $table->softDeletes();

            $table->foreign('program_id')->references('id')->on('programs');
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
        Schema::dropIfExists('recipient_lists');
    }
}
