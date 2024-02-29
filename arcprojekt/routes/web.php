<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CsapatController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::any('/', function () {
    return ['Laravel' => app()->version()];
});
Route::get('/token', function () {
    return request()->session()->token();
});
require __DIR__.'/auth.php';
