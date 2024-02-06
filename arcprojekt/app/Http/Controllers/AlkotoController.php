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
        ->update(['buszkesegeink' => 1]); 
    }
    //adott alkoto
    /*  public function adottAlkoto($alkoto)
    {
        $alkoto = DB::table('alkotots')
        ->where('a_azon', '=', $alkoto);
        return $alkoto;
    } */
    //buszkeseg listazasa
    /* public function buszkesegKiir()
    {
        $buszkeseg =  Alkoto::all()
        ->where('buszkesegeink', '=', true );
        return response()->json($buszkeseg);
    } */
    //uj alkoto
    /* public function store(Request $request){
        $alkoto = new Alkoto();
        $alkoto->szak_id = $request->szak_id;
        $alkoto->nyelv_id_nev = $request->nyelv_id_nev;
        $alkoto->kep_azon = $request->kep_azon;
        $alkoto->nyelv_id_bemutat = $request->nyelv_id_bemutat;
        $alkoto->buszkesegeink=FALSE;
        $alkoto->save();
        
    } */
} 
