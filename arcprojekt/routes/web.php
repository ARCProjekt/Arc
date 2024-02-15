<?php
use App\Http\Controllers\CsapatController;
use App\Http\Controllers\KategoriaController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AlkotoController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/
/*alkotók listázása*/ 
Route::get('/api/alkotok', [AlkotoController::class, 'index']);
/*csapat készítlése */
Route::post('/api/csapatok/alkot', [CsapatController::class, 'alkot']);
Route::post('/api/csapatok', [CsapatController::class, 'store']);
Route::get('/api/csapatok', [CsapatController::class, 'index']);




//alkoto letrehozasa
Route::get('/api/alkotok/create', [AlkotoController::class, 'create']);
Route::post('/api/alkotok', [AlkotoController::class, 'store']);
Route::get('/api/alkotok', [AlkotoController::class, 'index']);
Route::get('/', function () {
    return view('welcome');
});

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});
Route::get('/api/kategoriak', [KategoriaController::class, 'kategoriakLista']);
Route::get('/api/adott_csapat_galeria/{cs_id}', [CsapatController::class, 'show']);
require __DIR__.'/auth.php';
