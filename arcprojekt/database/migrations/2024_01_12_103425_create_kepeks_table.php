<?php

use App\Models\Kepek;
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
            $table->foreignId('nyelv_id_leiras')->references('nyelv_id')->on('nyelvs');
            $table->string('fotos_neve');
            $table->timestamps();
        });

        Kepek::create([
            'kep' => '/kepek/legolas.jpg',
            'nyelv_id_leiras' => 30,
            'fotos_neve' => 'R. Máté'
        ]); 
        Kepek::create([
            'kep' => '/kepek/legolas.jpg',
            'nyelv_id_leiras' => 31,
            'fotos_neve' => 'Balázs'
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kepeks');
    }
};
