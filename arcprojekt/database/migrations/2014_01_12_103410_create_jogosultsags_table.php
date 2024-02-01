<?php

use App\Models\Jogosultsag;
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
        Schema::create('jogosultsags', function (Blueprint $table) {
            $table->id();
            $table->char('jog');
            $table->string('elnevezes');
            $table->timestamps();
        });

        Jogosultsag::create([
            'jog' => "A", 
            'elnevezes' => 'Admin', 
        ]);


        Jogosultsag::create([
            'jog' => "T", 
            'elnevezes' => 'Tanár', 
        ]);
    }

    

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('jogosultsags');
    }
};
