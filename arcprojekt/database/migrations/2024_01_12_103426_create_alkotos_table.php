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
        Schema::create('alkotos', function (Blueprint $table) {
            $table->id('a_azon');
            $table->foreignId('szak_id')->references('szak_id')->on('szaks');
            $table->string('nev');
            $table->foreignId('kep_azon')->references('kep_azon')->on('kepeks');
            $table->foreignId('nyelv_id')->references('nyelv_id')->on('nyelvs');
            $table->boolean('buszkesegeink');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('alkotos');
    }
};
