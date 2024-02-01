<?php

use App\Http\Controllers\CsapatController;
use App\Http\Controllers\KategoriaController;
use App\Models\Csapat;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/adott_csapat/{cs_azon}', [CsapatController::class, 'show']);
Route::get('/kategoriakLista', [KategoriaController::class, 'kategoriakLista']);