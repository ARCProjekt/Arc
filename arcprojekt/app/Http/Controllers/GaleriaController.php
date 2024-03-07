<?php

namespace App\Http\Controllers;

use App\Models\Galeria;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Nyelv;
use App\Models\Kepek;
use App\Models\Galeria_kep;

class GaleriaController extends Controller
{
    public function csapatGaleriaja($csapat_id){
        $galery = DB::table('galerias as g')
        ->select('*')       
        ->join('csapats as cs', 'g.galeria_id','=','cs.galeria_id')
        ->where('cs_azon', '=', $csapat_id)
        ->get();
        return $galery;
    }
  

    public function store(Request $request)
    {
        try {
            $request->validate([
                'kepek' => 'required|array|min:2', // Legalább két kép kötelező
                'kepek.*' => 'required|image|mimes:jpeg,png,jpg,gif',
                'galeria_leiras.magyar' => 'required',
                'galeria_leiras.angol' => 'required',
                'kep_leiras.magyar' => 'required',
                'kep_leiras.angol' => 'required',
                'fotos_neve' => 'required',
            ]);
    
            // Nyelv létrehozása mindkét leírással
            $nyelvGaleriaLeiras = Nyelv::create([
                'magyar' => $request->galeria_leiras['magyar'],
                'angol' => $request->galeria_leiras['angol'],
                'hol' => 'galeria leiras',
            ]);
    
            $nyelvKepLeiras = Nyelv::create([
                'magyar' => $request->kep_leiras['magyar'],
                'angol' => $request->kep_leiras['angol'],
                'hol' => 'kep leiras',
            ]);
    
            // Galéria létrehozása
            $galeria = Galeria::create([
                'fogaleria' => null, // vagy amit beállítottál, hogy alapból legyen
                'nyelv_id_leiras' => $nyelvGaleriaLeiras->nyelv_id,
            ]);
    
            $eleresi_utvonalak = [];
    
            // Elérési útvonalak mentése és képek feltöltése
            foreach ($request->file('kepek') as $kep) {
                $eleresi_utvonal = $kep->storeAs('public/csapatkepek', $kep->getClientOriginalName());
                $eleresi_utvonalak[] = $eleresi_utvonal;
    
                // Adatbázisba mentés
                $kepAdatok = [
                    'kep' => $eleresi_utvonal,
                    'nyelv_id_leiras' => $nyelvKepLeiras->nyelv_id,
                    'fotos_neve' => $request->fotos_neve,
                ];
    
                // Kép létrehozása
                $kepObj = Kepek::create($kepAdatok);
    
                // Galéria képek létrehozása a kapott id-kkel
                $galeriaKep = Galeria_kep::create([
                    'kep_azon' => $kepObj->kep_azon,
                    'galeria_id' => $galeria->galeria_id,
                    'kiemelt_kep' => false, // vagy amit beállítottál
                ]);
            }
    
            return response()->json(['message' => 'Képek és galéria sikeresen létrehozva', 'eleresi_utvonalak' => $eleresi_utvonalak]);
        } catch (\Exception $e) {
            \Log::error('Hiba történt a képek és galéria létrehozása közben: ' . $e->getMessage());
            return response()->json(['error' => 'Hiba történt a képek és galéria létrehozása közben.'], 500);
        }
    }
    
    
}
