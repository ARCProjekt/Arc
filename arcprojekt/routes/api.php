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
Route::get('/galeria/newId', [GaleriaController::class, 'getNewGalleryId']);
Route::post('/galeria/store', [GaleriaController::class, 'store']);
Route::middleware('auth.basic')->group(function () {
    Route::post('/alkotoletrehoz', [AlkotoController::class, 'store']);
    Route::patch('/buszkeseg/{alkoto_id}', [AlkotoController::class, 'buszkeseg']);
    Route::post('/alkotok/alkot', [AlkotoController::class, 'create']);
    Route::post('/kepek/alkotoKepek',[KepekController::class,'alkotoKepek']);
    Route::delete('/alkototorol/{alkoto_id}', [AlkotoController::class, 'delete']);
    Route::delete('csapatTorol/{cs_azon}', [CsapatController::class, 'csapatTorol']);
    Route::patch('csapatmodosit/{cs_azon}', [CsapatController::class, 'update']);
    Route::post('/csapat/store', [CsapatController::class, 'store']);
    Route::middleware(['admin'])->group(function () {
        Route::post('/userletrehoz', [UserController::class, 'store']);
        Route::post('/alkotoletrehoz', [AlkotoController::class, 'store']);
        Route::patch('/alkotoszerkeszt/{alkoto_id}', [AlkotoController::class, 'update']);
        Route::get('/users', [UserController::class, 'users']);
        Route::get('/checkemail', [UserController::class, 'checkEmail']);
        Route::delete('/usertorol/{user_id}', [UserController::class, 'userTorol']);
        Route::patch('/updateuser/{user_id}', [UserController::class, 'update']);
    });
});

Route::get('/users', [UserController::class, 'users']);
Route::get('/alkotokkiir', [AlkotoController::class, 'alkotokKiir']);
Route::get('/buszkesegeink', [AlkotoController::class, 'buszkesegKiir']);
Route::get('/kepek', [KepekController::class, 'kepek']);
Route::get('/alkotok/create', [AlkotoController::class, 'create']);
Route::post('/alkotok', [AlkotoController::class, 'store']);
Route::get('/alkotok', [AlkotoController::class, 'index']);
Route::get('/kategoriaklista', [KategoriaController::class, 'kategoriakLista']);
Route::get('/csapat_galeriaja/{csapat_id}', [GaleriaController::class, 'csapatGaleriaja']);
Route::get('/adott_csapat/{csapat_id}', [CsapatController::class, 'show']);
Route::get('/csapatok', [CsapatController::class, 'csapatokKiir']);
Route::get('/szakok', [SzakController::class, 'szakokKiir']);
Route::get('/adottalkoto/{alkotoid}', [AlkotoController::class, 'adottAlkoto']);
Route::get('/', function () {
    return view('welcome');
});