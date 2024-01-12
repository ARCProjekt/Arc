<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('alkotjaks', function (Blueprint $table) {
            $table->id('alkotjak_id');
            $table->foreignId('cs_azon')->references('cs_azon')->on('csapats');
            $table->foreignId('a_azon')->references('a_azon')->on('alkotos');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('alkotjaks');
    }
};
