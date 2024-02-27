<?php

namespace App\Http\Controllers;

use App\Models\Kepek;
use Illuminate\Http\Request;
use Laravel\Prompts\Key;

class KepekController extends Controller
{
    public function kepek(){
        return Kepek::all();
    } 
}
