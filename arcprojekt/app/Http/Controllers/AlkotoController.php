<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Alkoto;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class AlkotoController extends Controller
{
    public function index()
    {
        $alkotok = Alkoto::all();
        return response()->json($alkotok);
    }

    public function buszkeseg($alkoto){
        $user = Auth::user();
        DB::table('alkotos')
        ->where('a_azon', '=', $alkoto)
        ->where('buszkesegeink', '=', false )
        ->update(['buszkeseg' => 1]); 
    }
    //adott alkoto
     public function adottAlkoto($alkoto)
    {
        $alkoto = DB::table('alkotots')
        ->where('a_azon', '=', $alkoto);
        return $alkoto;
    }
    //alkoto letrehozasa
} 
