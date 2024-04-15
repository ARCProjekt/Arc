<?php

namespace App\Http\Controllers;

use App\Models\Kepek;
use App\Models\Nyelv;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Laravel\Prompts\Key;

class KepekController extends Controller
{
    public function kepek()
    {
        return Kepek::all();
    }
     
    public function create()
    {
        return view('kepek.create');
    }

   

    public function alkotoKepek(Request $request)
    {
        try {
            $request->validate([
                'kep' => 'required|image|mimes:jpeg,png,jpg,gif',
                'nyelv_id_leiras_magyar' => 'required',
                'nyelv_id_leiras_angol' => 'required',
                'fotos_neve' => 'required',
            ]);

            // Elérési útvonal mentése
            $eleresi_utvonal = $request->file('kep')->storeAs('/storage/alkotokepek', $request->file('kep')->getClientOriginalName());
            // Nyelv létrehozása mindkét leírással
            $nyelvMagyarLeiras = Nyelv::create([
                'magyar' => $request->nyelv_id_leiras_magyar,
                'angol' => $request->nyelv_id_leiras_angol,
                'hol' => 'alkoto bemutat',
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
            Log::error('Hiba történt a kepek létrehozása közben: ' . $e->getMessage());
            return response()->json(['error' => 'Hiba történt a kepek létrehozása közben.'], 500);
        }
    }
}
