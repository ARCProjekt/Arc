<?php

namespace App\Http\Controllers;
use App\Models\Alkoto;
use App\Models\Nyelv;
use App\Models\Csapat;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CsapatController extends Controller
{
    public function show($id){
        return Csapat::find($id);
    }

    public function csapatGaleriaja($csapat_id){
        $galery = DB::table('galerias as g')
        ->select('*')    
        ->join('csapats as cs' ,'g.galeria_id','=','cs.galeria_id')
        ->where('cs_azon', '=', $csapat_id)
        ->get();
        return $galery;
    }
    public function create()
    {
        // Alkotók lekérdezése
        $alkotok = Alkoto::all();

        // Űrlap nézetének megjelenítése és az alkotók átadása
        return view('csapatok.create', compact('alkotok'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'galeria_id' => 'required',
            'k_id' => 'required',
            'alkotok' => 'required|array',
            'magyar_nev' => 'required',
            'angol_nev' => 'required',
            'magyar_leiras' => 'required',
            'angol_leiras' => 'required',
        ]);
    
        // Nyelv létrehozása magyar névvel
        $nyelvMagyarNev = Nyelv::create([
            'magyar' => $request->magyar_nev,
            'angol' => $request->angol_nev,
            'hol' => 'csapat nev',
        ]);
    
        // Nyelv létrehozása magyar leírással
        $nyelvMagyarLeiras = Nyelv::create([
            'magyar' => $request->magyar_leiras,
            'angol' => $request->angol_leiras,
            'hol' => 'csapat leiras',
        ]);
    
        // Csapat létrehozása
        $csapat = Csapat::create([
            'galeria_id' => $request->galeria_id,
            'k_id' => $request->k_id,
            'nyelv_id_csapat_nev' => $nyelvMagyarNev->nyelv_id, // Megváltoztatva
            'nyelv_id_leiras' => $nyelvMagyarLeiras->nyelv_id, // Megváltoztatva
        ]);
    
        // Az új csapat adatainak lekérése
        $createdCsapat = Csapat::with(['nyelvCsapatNev', 'nyelvLeiras', 'alkotok'])->find($csapat->id);
    
        // Visszatérés az űrlap nézettel, például sikerüzenettel és alkotókkal
        return view('csapatok.create', ['message' => 'Csapat sikeresen létrehozva', 'alkotok' => Alkoto::all(), 'createdCsapat' => $createdCsapat]);
    }
    
    
}
