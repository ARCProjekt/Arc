<?php

use App\Models\Felhasznalo;
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
        Schema::create('felhasznalos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('jog')->references('id')->on('jogosultsags');
            $table->string('jelszo');
            $table->string('email');
            $table->timestamps();
        });

        Felhasznalo::create([
            'jog' => 2,
            'jelszo' => 'aa',
            'email' => 'csefi@gmail.com',
        ]);

        Felhasznalo::create([
            'jog' => 1,
            'jelszo' => 'admin',
            'email' => 'admin@admin.com',
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('felhasznalos');
    }
};
