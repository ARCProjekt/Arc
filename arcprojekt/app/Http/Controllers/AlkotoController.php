<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Alkoto;
class AlkotoController extends Controller
{
    public function index()
    {
        $alkotok = Alkoto::all();

        
        return response()->json($alkotok);
    }
}
