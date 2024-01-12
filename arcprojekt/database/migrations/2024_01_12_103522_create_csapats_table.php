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
        Schema::create('csapats', function (Blueprint $table) {
            $table->id('cs_azon');
            $table->foreignId('galeria_id')->references('galeria_id')->on('galerias');
            $table->foreignId('projekt_id')->references('projekt_id')->on('reszprojekts');
            $table->string('csapat_nev');
            $table->foreignId('nyelv_id')->references('nyelv_id')->on('nyelvs');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('csapats');
    }
};
