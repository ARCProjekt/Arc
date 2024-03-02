<?php

namespace App\Http\Controllers;
use App\Models\Nyelv;
use App\Models\Kepek;
use Illuminate\Http\Request;
use Laravel\Prompts\Key;

class KepekController extends Controller
{
    public function kepek(){
        return Kepek::all();
    } 
    public function create()
    {
        return view('kepek.create');
    }

    // ...

    public function store(Request $request)
    {
        try {
            $request->validate([
                'kep' => 'required|image|mimes:jpeg,png,jpg,gif',
                'nyelv_id_leiras.magyar' => 'required',
                'nyelv_id_leiras.angol' => 'required',
                'fotos_neve' => 'required',
            ]);
    
            // Elérési útvonal mentése
            $eleresi_utvonal = $request->file('kep')->storeAs('Csapatkepek', $request->file('kep')->getClientOriginalName(), 'public');
    
            // Nyelv létrehozása mindkét leírással
            $nyelvMagyarLeiras = Nyelv::create([
                'magyar' => $request->nyelv_id_leiras['magyar'],
                'angol' => $request->nyelv_id_leiras['angol'],
                'hol' => 'kep leiras',
            ]);
    
            // Adatbázisba mentés
            $kepAdatok = [
                'kep' => $eleresi_utvonal,
                'nyelv_id_leiras' => $nyelvMagyarLeiras->nyelv_id,
                'fotos_neve' => $request->fotos_neve,
            ];
    
            Kepek::create($kepAdatok);
    
            return response()->json(['message' => 'Kép sikeresen feltöltve', 'eleresi_utvonal' => $eleresi_utvonal]);
        } catch (\Exception $e) {
            \Log::error('Hiba történt a kepek létrehozása közben: ' . $e->getMessage());
            return response()->json(['error' => 'Hiba történt a kepek létrehozása közben.'], 500);
        }
    }
    

}
