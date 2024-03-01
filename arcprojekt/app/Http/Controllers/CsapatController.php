<?php

namespace App\Http\Controllers;

use App\Models\Alkoto;
use App\Models\Nyelv;
use App\Models\Csapat;
use App\Models\Galeria;
use App\Models\Kepek;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class CsapatController extends Controller
{
    public function csapatok()
    {
        return Csapat::all();
    }
    public function csapatokKiir()
    {
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
    public function show($id)
    {
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

    public function csapatGaleriaja($csapat_id)
    {
        $galery = DB::table('galerias as g')
            ->select('*')
            ->join('csapats as cs', 'g.galeria_id', '=', 'cs.galeria_id')
            ->where('cs_azon', '=', $csapat_id)
            ->get();
        return $galery;
    }

    public function create()
    {
        return view('csapatok.create');
    }




    public function store(Request $request)
    {
        $request->validate(['galeria_id' => 'required|exists:galerias,id',             'k_id' => 'required|exists:kategorias,id',             'magyar_nev' => 'required',             'angol_nev' => 'required',             'magyar_leiras' => 'required',             'angol_leiras' => 'required',             'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048',]);
        $nyelvMagyarNev = Nyelv::create([
            'magyar' => $request->magyar_nev,             'angol' => $request->angol_nev,
            'hol' => 'csapat nev',
        ]);
        $nyelvMagyarLeiras = Nyelv::create([
            'magyar' => $request->magyar_leiras,             'angol' => $request->angol_leiras,
            'hol' => 'csapat leiras',
        ]);
        $csapat = Csapat::create([
            'galeria_id' => $request->galeria_id,             'k_id' => $request->k_id,
            'nyelv_id_csapat_nev' => $nyelvMagyarNev->id,             'nyelv_id_leiras' => $nyelvMagyarLeiras->id,
        ]);
        if ($request->hasFile('images')) {
            $galeria = Galeria::findOrFail($request->galeria_id);
            foreach ($request->file('images') as $image) {
                $imageName = time() . '_cs' . $csapat->id . '_g' . $galeria->id . '.' . $image->getClientOriginalExtension();
                $path = $image->storeAs('public/csapatkepek', $imageName);
                $kep = new Kepek([
                    'fotos_neve' => $imageName,                     'elérési_út' => Storage::url($path),
                    'galeria_id' => $galeria->id,
                ]);
                $kep->save();
            }
        }
        return response()->json(['message' => 'Csapat sikeresen létrehozva', 'createdCsapat' => $csapat]);
    }
}
