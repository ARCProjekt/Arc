<?php

use App\Models\Szak;
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
        Schema::create('szaks', function (Blueprint $table) {
            $table->id('szak_id');
            $table->foreignId('nyelv_id_elnevezes')->references('nyelv_id')->on('nyelvs');
            $table->timestamps();
        });

        Szak::create([
            'nyelv_id_elnevezes' => 22,
        ]);
        Szak::create([
            'nyelv_id_elnevezes' => 23,
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('szaks');
    }
};
