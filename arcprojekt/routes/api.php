<?php

use App\Http\Controllers\CsapatController;
use App\Http\Controllers\GaleriaController;
use App\Http\Controllers\KategoriaController;
use App\Http\Controllers\AlkotoController;
use App\Http\Controllers\UserController;
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

//bejelentkezett felhasználó
Route::middleware('auth.basic')->group(function () {
    Route::patch('/buszkeseg/{alkoto_id}', [AlkotoController::class, 'buszkeseg']);
    Route::post('/alkotok/alkot', [AlkotoController::class, 'create']);
});

Route::get('/adott_csapat/{cs_azon}', [CsapatController::class, 'show']);
Route::get('/kategoriaklista', [KategoriaController::class, 'kategoriakLista']);

Route::get('/csapat_galeriaja/{csapat_id}', [GaleriaController::class, 'csapatGaleriaja']);
Route::get('/alkotok', [AlkotoController::class, 'index']);
Route::get('/adott_alkoto/{alkoto_id}', [AlkotoController::class, 'adottAlkoto']);

Route::get('/adott_csapat_galeria/{cs_id}', [CsapatController::class, 'show']);
Route::get('/csapatok/create', [CsapatController::class, 'create']);
Route::post('/csapatok', [CsapatController::class, 'store']);

Route::post('/api/userLetrehoz', [UserController::class, 'store']);


Route::get('/csapatok', [CsapatController::class, 'index']);
Route::get('/buszkeseg_kiir', [AlkotoController::class, 'buszkesegKiir']);
