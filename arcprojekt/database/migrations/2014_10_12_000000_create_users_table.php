<?php

use App\Models\User;
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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->foreignId('jog')->references('id')->on('jogosultsags');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();
        });

       /*  User::create([
            'name' => 'Cséfalvay Katalain',
            'jog' => 2,
            'email' => 'csefi@gmail.com',
            'jelszo' => 'aa',
            
        ]);

        User::create([
            'name' => 'admin',
            'jog' => 1,
            'email' => 'admin@admin.com',
            'jelszo' => 'admin',
           
        ]); */



    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
