<?php

namespace App\Http\Controllers;
use App\Models\Alkoto;
use App\Models\Nyelv;
use App\Models\Csapat;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CsapatController extends Controller
{
    public function csapatok(){
        return Csapat::all();
    }
    public function csapatokKiir(){
        $csapatok = DB::select('
        SELECT  csapat_nev.magyar
        from csapats
        inner join nyelvs as csapat_nev
        on csapats.nyelv_id_csapat_nev = csapat_nev.nyelv_id
        inner join nyelvs as csapat_bemutat
        on csapats.nyelv_id_leiras = csapat_bemutat.nyelv_id
        inner join kategorias
        on csapats.k_id = kategorias.k_id
        inner join nyelvs
        on kategorias.nyelv_id_elnevezes = nyelvs.nyelv_id
           

        ');
        return response()->json(['csapatok' => $csapatok]);
    }
    public function show($id){
        $csapat = DB::select('
        SELECT nyelvs.magyar as magyar_kategoria, csapat_nev.magyar, csapat_bemutat.magyar
        from csapats
        inner join nyelvs as csapat_nev
        on csapats.nyelv_id_csapat_nev = csapat_nev.nyelv_id
        inner join nyelvs as csapat_bemutat
        on csapats.nyelv_id_leiras = csapat_bemutat.nyelv_id
        inner join kategorias
        on csapats.k_id = kategorias.k_id
        inner join nyelvs
        on kategorias.nyelv_id_elnevezes = nyelvs.nyelv_id
        

        ');
        return response()->json(['adott_csapatt' => $csapat]);
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
    return view('csapatok.create');
}


    // CsapatController.php

public function store(Request $request)
{
    $request->validate([
        'galeria_id' => 'required',
        'k_id' => 'required',
        'magyar_nev' => 'required',
        'angol_nev' => 'required',
        'magyar_leiras' => 'required',
        'angol_leiras' => 'required',
        'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
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
        'nyelv_id_csapat_nev' => $nyelvMagyarNev->id,
        'nyelv_id_leiras' => $nyelvMagyarLeiras->id,
    ]);

    // Képek mentése
    if ($request->hasFile('images')) {
        foreach ($request->file('images') as $image) {
            // Kép nevében csatoljuk a csapat_id-t és a galéria_id-t
            $imageName = time() . '_cs' . $csapat->cs_azon . '_g' . $request->galeria_id . '_' . $image->getClientOriginalName();
            $image->storeAs('frontend/public/csapatkepek', $imageName, 'public');
        }
    }

    return response()->json(['message' => 'Csapat sikeresen létrehozva', 'createdCsapat' => $csapat]);
}

    }
    
    

