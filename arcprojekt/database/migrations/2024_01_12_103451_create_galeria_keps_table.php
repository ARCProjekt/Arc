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
        Schema::create('galeria_keps', function (Blueprint $table) {
            $table->foreignId('galeria_id')->references('galeria_id')->on('galerias');
            $table->foreignId('kep_azon')->references('kep_azon')->on('kepeks');
            $table->primary(['galeria_id', 'kep_azon']);
            $table->boolean('kiemelt_kep');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('galeria_keps');
    }
};
