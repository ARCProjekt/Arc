<?php

use App\Models\Galeria;
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
        Schema::create('galerias', function (Blueprint $table) {
            $table->id('galeria_id');
            $table->foreignId('fogaleria')->nullable();
            $table->foreign('fogaleria')->references('galeria_id')->on('galerias');
            $table->foreignId('nyelv_id_leiras')->references('nyelv_id')->on('nyelvs');
            $table->timestamps();
        });



       Galeria::create([
            'nyelv_id_leiras' => 32,
        ]);

        Galeria::create([
            'fogaleria' => 1,
            'nyelv_id_leiras' => 32,
        ]);

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('galerias');
    }
};
