<?php

use App\Models\Alkoto;
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
            $table->foreignId('nyelv_id_nev')->references('nyelv_id')->on('nyelvs');
            $table->foreignId('kep_azon')->references('kep_azon')->on('kepeks');
            $table->foreignId('nyelv_id_bemutat')->references('nyelv_id')->on('nyelvs');
            $table->boolean('buszkesegeink')->default(0);
            $table->foreignId('cs_azon')->references('cs_azon')->on('csapats');
            $table->timestamps();
        });

       Alkoto::create([
            'szak_id' => 1,
            'nyelv_id_nev' => 24,
            'kep_azon' => 1,
            'nyelv_id_bemutat' => 28,
            'buszkesegeink' => false,
            'cs_azon' => 1,
        ]);

        Alkoto::create([
            'szak_id' => 2,
            'nyelv_id_nev' => 25,
            'kep_azon' => 2,
            'nyelv_id_bemutat' => 29,
            'buszkesegeink' => true,
            'cs_azon' => 1,
        ]);

        Alkoto::create([
            'szak_id' => 2,
            'nyelv_id_nev' => 26,
            'kep_azon' => 2,
            'nyelv_id_bemutat' => 40,
            'buszkesegeink' => true,
            'cs_azon' => 2,
        ]);

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('alkotos');
    }
};
