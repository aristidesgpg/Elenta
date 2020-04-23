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
            $table->uuid('program_id');

            $table->string('name');
            $table->enum('channel', RecipientList::CHANNELS);
            $table->integer('max_recipients')->nullable();

            $table->timestamps();
            $table->softDeletes();

            $table->foreign('program_id')->references('id')->on('programs');
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
