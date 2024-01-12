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
        Schema::create('kepeks', function (Blueprint $table) {
            $table->id('kep_azon');
            $table->string('kep');
            $table->foreignId('nyelv_id')->references('nyelv_id')->on('nyelvs');
            $table->string('fotos_neve');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kepeks');
    }
};
