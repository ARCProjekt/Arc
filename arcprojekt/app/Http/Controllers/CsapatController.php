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

        SELECT cs_azon, csapat_nev.magyar
        from csapats
        inner join nyelvs as csapat_nev
        on csapats.nyelv_id_csapat_nev = csapat_nev.nyelv_id
       

        ');
        return response()->json(['csapatok' => $csapatok]);
    }
    public function adottcsapatKiir(){
        $csapatok = DB::select('

        SELECT cs_azon, csapat_nev.magyar,alkotok.a_azon
        from csapats
        inner join nyelvs as csapat_nev
        on csapats.nyelv_id_csapat_nev = csapat_nev.nyelv_id
        inner join alkotos as alkotok
        on csapat.cs_azon = alkotok.cs_azon

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
    public function store(Request $request)
    {
        try {
            $this->middleware('auth');
            $request->validate([
                'galeria_id' => 'required|exists:galerias,galeria_id',
                'k_id' => 'required|exists:kategorias,k_id',
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
    
            $nyelvMagyarLeiras = Nyelv::create([
                'magyar' => $request->magyar_leiras,
                'angol' => $request->angol_leiras,
                'hol' => 'csapat leiras',
            ]);
    
            $csapat = Csapat::create([
                'galeria_id' => $request->galeria_id,
                'k_id' => $request->k_id,
                'nyelv_id_csapat_nev' => $nyelvMagyarNev->nyelv_id,
                'nyelv_id_leiras' => $nyelvMagyarLeiras->nyelv_id,
            ]);
    
            // Az új csapat adatainak lekérése
            $createdCsapat = Csapat::with(['nyelvCsapatNev', 'nyelvLeiras', 'alkotok'])->find($csapat->id);
    
            return response()->json(['message' => 'Csapat sikeresen létrehozva', 'csapat' => $createdCsapat], 200);
        } catch (\Exception $e) {
            \Log::error('Hiba történt a csapat létrehozása közben: ' . $e->getMessage());
            return response()->json(['error' => 'Hiba történt a csapat létrehozása közben.'], 500);
        }
    }
    
   /*  public function store(Request $request)
    {
        $this->middleware('auth:api');

      

        $request->validate([
            'galeria_id' => 'required|exists:galerias,galeria_id',
            'k_id' => 'required|exists:kategorias,k_id',
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

        $nyelvMagyarLeiras = Nyelv::create([
            'magyar' => $request->magyar_leiras,
            'angol' => $request->angol_leiras,
            'hol' => 'csapat leiras',
        ]);

        $csapat = Csapat::create([
            'galeria_id' => $request->galeria_id,
            'k_id' => $request->k_id,
            'nyelv_id_csapat_nev' => $nyelvMagyarNev->nyelv_id,
            'nyelv_id_leiras' => $nyelvMagyarLeiras->nyelv_id,
        ]);

        // Az új csapat adatainak lekérése
        $createdCsapat = Csapat::with(['nyelvCsapatNev', 'nyelvLeiras', 'alkotok'])->find($csapat->id);

        // API token hozzárendelése a válaszhoz
        $token = Auth::user()->createToken('API Token')->accessToken;

        // Válasz küldése, beleértve a tokent is
        return response()->json(['message' => 'Csapat sikeresen létrehozva', 'csapat' => $createdCsapat, 'access_token' => $token], 200);
    } */
    public function csapatTorol($id){
        Alkoto::where('cs_azon', $id)->delete();
        Csapat::destroy($id);
    }
    public function update(Request $request, $id)
{
    try {
        $csapat = Csapat::findOrFail($id);

        $request->validate([
            'galeria_id' => 'nullable|exists:galerias,galeria_id',
            'k_id' => 'nullable|exists:kategorias,k_id',
            'magyar_nev' => 'nullable',
            'angol_nev' => 'nullable',
            'magyar_leiras' => 'nullable',
            'angol_leiras' => 'nullable',
        ]);

        // Csapat név nyelvi objektumának frissítése, ha van megadva új név
        if ($request->filled('magyar_nev')) {
            $csapat->nyelvCsapatNev->update(['magyar' => $request->magyar_nev]);
        }

        if ($request->filled('angol_nev')) {
            $csapat->nyelvCsapatNev->update(['angol' => $request->angol_nev]);
        }

        // Csapat leírás nyelvi objektumának frissítése, ha van megadva új leírás
        if ($request->filled('magyar_leiras')) {
            $csapat->nyelvLeiras->update(['magyar' => $request->magyar_leiras]);
        }

        if ($request->filled('angol_leiras')) {
            $csapat->nyelvLeiras->update(['angol' => $request->angol_leiras]);
        }

        // Egyéb csapat adatok frissítése, ha vannak megadva
        $csapat->update($request->only(['galeria_id', 'k_id']));

        // Csapat neve és leírása frissítve
        return response()->json(['message' => 'A csapat sikeresen frissítve lett.', 'csapat' => $csapat], 200);
    } catch (\Exception $e) {
        return response()->json(['error' => 'Hiba történt a csapat módosítása közben: ' . $e->getMessage()], 500);
    }
}

}
