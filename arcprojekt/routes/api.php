<?php

use App\Http\Controllers\AlkotoController;
use App\Http\Controllers\CsapatController;
use App\Http\Controllers\GaleriaController;
use App\Http\Controllers\KategoriaController;
use App\Http\Controllers\KepekController;
use App\Http\Controllers\SzakController;
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


/* Route::post('/alkotoLetrehoz', [AlkotoController::class, 'store']);
 *//* 
    Route::post('/alkotok/alkot', [AlkotoController::class, 'create']);
    Route::middleware(['admin'])->group(function () {
        Route::post('/userletrehoz', [UserController::class, 'store']);
        Route::post('/alkotoletrehoz', [AlkotoController::class, 'store']);
    }); */


Route::middleware('auth.basic')->group(function () {
    Route::post('/alkotoletrehoz', [AlkotoController::class, 'store']);
    Route::patch('/buszkeseg/{alkoto_id}', [AlkotoController::class, 'buszkeseg']);
    Route::post('/alkotok/alkot', [AlkotoController::class, 'create']);


    Route::middleware(['admin'])->group(function () {
        Route::post('/userletrehoz', [UserController::class, 'store']);
        Route::post('/alkotoletrehoz', [AlkotoController::class, 'store']);
    });
});




/* 
Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    
    Route::post('/userletrehoz', [UserController::class, 'store']);
    
});
 */

Route::post('/kepek/alkotoKepek',[KepekController::class,'alkotoKepek']);

Route::get('/users', [UserController::class, 'users']);
Route::get('/alkotokkiir', [AlkotoController::class, 'alkotokKiir']);
Route::get('/buszkesegeink', [AlkotoController::class, 'buszkesegKiir']);
Route::get('/kepek', [KepekController::class, 'kepek']);
//alkoto letrehozasa
Route::get('/alkotok/create', [AlkotoController::class, 'create']);
Route::post('/alkotok', [AlkotoController::class, 'store']);
Route::get('/alkotok', [AlkotoController::class, 'index']);
Route::get('/kategoriaklista', [KategoriaController::class, 'kategoriakLista']);
Route::get('/csapat_galeriaja/{csapat_id}', [GaleriaController::class, 'csapatGaleriaja']);
Route::get('/adott_csapat/{csapat_id}', [CsapatController::class, 'show']);
Route::get('/csapatok', [CsapatController::class, 'csapatokKiir']);
Route::get('/szakok', [SzakController::class, 'szakokKiir']);
//Route::get('/api/alkotok', [AlkotoController::class, 'index']);
Route::get('/', function () {
    return view('welcome');
});
/*csapat készítlése */
/* /*csapat készítlése 
Route::post('/api/csapatok/alkot', [CsapatController::class, 'alkot']);
Route::post('/api/csapatok', [CsapatController::class, 'store']);
Route::get('/api/csapatok', [CsapatController::class, 'index']);
Route::get('/api/csapatok', [CsapatController::class, 'index']); */