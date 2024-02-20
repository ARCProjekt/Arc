<?php

use App\Http\Controllers\AlkotoController;
use App\Http\Controllers\GaleriaController;
use App\Http\Controllers\KategoriaController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/api/alkotok', [AlkotoController::class, 'index']);
/*csapat készítlése */
/* /*csapat készítlése 
Route::post('/api/csapatok/alkot', [CsapatController::class, 'alkot']);
Route::post('/api/csapatok', [CsapatController::class, 'store']);
Route::get('/api/csapatok', [CsapatController::class, 'index']);
Route::get('/api/csapatok', [CsapatController::class, 'index']); */

Route::middleware(['admin'])->group(function () {
    Route::post('/userLetrehoz', [UserController::class, 'store']);
});
//alkoto letrehozasa
Route::get('/alkotok/create', [AlkotoController::class, 'create']);
Route::post('/alkotok', [AlkotoController::class, 'store']);
Route::get('/alkotok', [AlkotoController::class, 'index']);
Route::get('/kategoriaklista', [KategoriaController::class, 'kategoriakLista']);
Route::get('/csapat_galeriaja/{csapat_id}', [GaleriaController::class, 'csapatGaleriaja']);
//Route::get('/api/alkotok', [AlkotoController::class, 'index']);
Route::get('/', function () {
    return view('welcome');
});