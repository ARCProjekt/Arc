<?php

use App\Models\Kategoria;
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
        Schema::create('kategorias', function (Blueprint $table) {
            $table->id('k_id');
            $table->foreignId('nyelv_id_elnevezes')->references('nyelv_id')->on('nyelvs');
            $table->timestamps();
        });

      for ($i = 1; $i <= 21; $i++) {
            Kategoria::create([
                'nyelv_id_elnevezes' => $i,
        
            ]);
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kategorias');
    }
};
