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
        Schema::create('reszprojekts', function (Blueprint $table) {
            $table->id('projekt_id');
            $table->foreignId('k_id')->references('k_id')->on('kategorias');
            $table->foreignId('galeria_id')->references('galeria_id')->on('galerias');
            $table->foreignId('nyelv_id_elnevezes')->references('nyelv_id')->on('nyelvs');
            $table->foreignId('nyelv_id_leir')->references('nyelv_id')->on('nyelvs');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reszprojekts');
    }
};
