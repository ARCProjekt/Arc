<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Alkoto;
use App\Models\Kepek;
use App\Models\Nyelv;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class AlkotoController extends Controller
{
    public function index()
    {
        $alkotok = Alkoto::all();
        return response()->json($alkotok);
    }
    public function show($id){
        return Alkoto::find($id);
    }
    public function buszkeseg($alkoto){
        $user = Auth::user();
        DB::table('alkotos')
        ->where('a_azon', '=', $alkoto)
        ->where('buszkesegeink', '=', false )
        ->update(['buszkesegeink' => 1]); 
    }
    //adott alkoto
      public function adottAlkoto($alkoto_id)
    {
        $alkoto = DB::table('alkotos')
        ->where('a_azon', '=', $alkoto_id)
        ->get();
        return $alkoto;
    }  
    //buszkeseg listazasa
     public function buszkesegKiir()
    {
        $buszkeseg =  Alkoto::all()
        ->where('buszkesegeink', '=', true );
        return response()->json($buszkeseg);
    } 
    //uj alkoto
    public function alkot()
    {
        // Képek lekérdezése
        $kepek = Kepek::all();

        // Űrlap nézetének megjelenítése és az képek átadása
        return view('alkotok.alkot', compact('kepek'));
    }
    public function store(Request $request)
    {
        $request->validate([
            'szak_id' => 'required',
            'magyar_nev' => 'required',
            'angol_nev' => 'required',
            'magyar_bemutat' => 'required',
            'angol_bemutat' => 'required',
            'kep_azon' => 'required|numeric',
        ]);
    
        // Nyelv létrehozása magyar névvel
        $nyelvMagyarNev = Nyelv::create([
            'magyar' => $request->magyar_nev,
            'angol' => $request->angol_nev,
            'hol' => 'alkoto nev',
        ]);
    
        // Nyelv létrehozása magyar leírással
        $nyelvMagyarBemutat = Nyelv::create([
            'magyar' => $request->magyar_bemutat,
            'angol' => $request->angol_bemutat,
            'hol' => 'alkoto bemutat',
        ]);
    
        // Alkoto létrehozása képpel együtt
        $alkoto = Alkoto::create([
            'szak_id' => $request->szak_id,
            'nyelv_id_nev' => $nyelvMagyarNev->nyelv_id,
            'nyelv_id_bemutat' => $nyelvMagyarBemutat->nyelv_id,
            'buszkesegeink' => 0,
            'kep_azon' => $request->kep_azon,
        ]);
    
        // Az új alkotó adatainak lekérése
        $createdAlkoto = Alkoto::with(['szak_id', 'nyelvAlkotoNev', 'kep_azon', 'nyelvBemutat'])->find($alkoto->id);
    
        // Visszatérés az űrlap nézettel, például sikerüzenettel és alkotókkal
        return redirect()->route('alkotok.alkot')->with('success', 'Alkotó sikeresen létrehozva');
    }

}    