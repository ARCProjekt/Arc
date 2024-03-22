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
    public function alkotok()
    {
        return Alkoto::all();
    }

    public function alkotokKiir()
    {
        $alkotok = DB::select('
        SELECT a_azon,nyelvs.magyar as alkoto_nev, nyelvs_bemutat.magyar as bemutato_nev, kepeks.kep, szak_elnev.magyar as szak,alkotos.cs_azon as csapat, csap_nev_nyelv.magyar as csapat_nev, buszkesegeink
            from alkotos
            inner join nyelvs
            on alkotos.nyelv_id_nev = nyelvs.nyelv_id
            INNER JOIN nyelvs AS nyelvs_bemutat
            ON alkotos.nyelv_id_bemutat = nyelvs_bemutat.nyelv_id
            inner join kepeks
            on alkotos.kep_azon = kepeks.kep_azon
            inner join szaks
            on alkotos.szak_id = szaks.szak_id
            inner join nyelvs as szak_elnev
            on szaks.nyelv_id_elnevezes = szak_elnev.nyelv_id
            inner join csapats
            on alkotos.cs_azon = csapats.cs_azon
            inner join nyelvs as csap_nev_nyelv
            on csapats.nyelv_id_csapat_nev = csap_nev_nyelv.nyelv_id
            order by a_azon


        ');
        return response()->json(['alkotok' => $alkotok]);
    }
    public function buszkeseg($alkoto)
    {
        $user = Auth::user();
        DB::table('alkotos')
            ->where('a_azon', '=', $alkoto)
            ->where('buszkesegeink', '=', false)
            ->update(['buszkesegeink' => 1]);
    }
    //adott alkoto
    public function adottAlkoto($alkoto_id)
    {
        $alkoto = DB::table('alkotos')
            //->select('nev_nyelv.magyar as nev', 'bemutat_nyelv.magyar as bemutatkozas', 'szak_nyelv.magyar as szak')
            ->select('nev_nyelv.magyar as nevHU', 'nev_nyelv.angol as nevEN', 'bemutat_nyelv.magyar as bemutatHU', 'bemutat_nyelv.angol as bemutatEN', 'szak_nyelv.magyar as szakHU', 'szak_nyelv.angol as szakEN', 'kepeks.kep_azon as kep', 'kategoria_nyelv.magyar as kategoriaHU', 'kategoria_nyelv.angol as kategoriaEN')
            ->join('nyelvs as nev_nyelv', 'alkotos.nyelv_id_nev', '=', 'nev_nyelv.nyelv_id')
            ->join('nyelvs as bemutat_nyelv', 'alkotos.nyelv_id_bemutat', '=', 'bemutat_nyelv.nyelv_id')
            ->join('szaks', 'alkotos.szak_id', '=', 'szaks.szak_id')
            ->join('nyelvs as szak_nyelv', 'szaks.nyelv_id_elnevezes', '=', 'szak_nyelv.nyelv_id')
            ->join('kepeks', 'alkotos.kep_azon', '=', 'kepeks.kep_azon')
            ->join('csapats', 'alkotos.cs_azon', '=', 'csapats.cs_azon')
            ->join('kategorias', 'csapats.k_id', '=', 'kategorias.k_id')
            ->join('nyelvs as kategoria_nyelv', 'kategorias.nyelv_id_elnevezes', '=', 'kategoria_nyelv.nyelv_id')
            ->where('a_azon', '=', $alkoto_id)
            ->get();
        //return $alkoto; 

        /* $alkoto = DB::select('
        SELECT nev_nyelv.magyar
        from alkotos
        inner join nyelvs as nev_nyelv
        on alkotos.nyelv_id_nev = nev_nyelv.nyelv_id
        where a_azon = {}
        '); */
        return response()->json(['adottalkoto' => $alkoto]);
    }
    //buszkeseg listazasa
    public function buszkesegKiir()
    {
        $buszkesegeink = DB::select('
            SELECT nyelvs.magyar as alkoto_nev, nyelvs_bemutat.magyar as bemutato_nev, kepeks.kep, szak_elnev.magyar as szak
            from alkotos
            inner join nyelvs
            on alkotos.nyelv_id_nev = nyelvs.nyelv_id
            INNER JOIN nyelvs AS nyelvs_bemutat 
            ON alkotos.nyelv_id_bemutat = nyelvs_bemutat.nyelv_id
            inner join kepeks
            on alkotos.kep_azon = kepeks.kep_azon
            inner join szaks
            on alkotos.szak_id = szaks.szak_id
            inner join nyelvs as szak_elnev
            on szaks.nyelv_id_elnevezes = szak_elnev.nyelv_id
            where buszkesegeink = 1
        ');
        return response()->json(['buszkesegeink' => $buszkesegeink]);
    }

    //uj alkoto

    public function store(Request $request)
    {
        $request->validate([
            'szak_id' => 'required',
            'magyar_nev' => 'required',
            'angol_nev' => 'required',
            'magyar_bemutat' => 'required',
            'angol_bemutat' => 'required',
            'kep_azon' => 'required|numeric',
            'cs_azon' => 'required|numeric',
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
            'cs_azon' => $request->cs_azon,
        ]);

        $alkoto->save();
    }
    public function update(Request $request, $id)
    {
        $alkoto = Alkoto::find($id);

        try {
            $alkoto->fill($request->only([
                'szak_id',
                'magyar_nev',
                'angol_nev',
                'magyar_bemutat',
                'angol_bemutat',
                'kep_azon',
                'cs_azon',
                'buszkesegeink',
            ]));

            // Ha a kép azonosítót vagy cs_azon-t is frissíteni szeretnéd, akkor itt frissítsd

            // Alkotó nevének nyelvi objektumának frissítése
            $nyelvMagyarNev = Nyelv::updateOrCreate(
                ['nyelv_id' => $alkoto->nyelv_id_nev],
                ['magyar' => $request->magyar_nev, 'angol' => $request->angol_nev, 'hol' => 'alkoto nev']
            );

            // Alkotó bemutatkozásának nyelvi objektumának frissítése
            $nyelvMagyarBemutat = Nyelv::updateOrCreate(
                ['nyelv_id' => $alkoto->nyelv_id_bemutat],
                ['magyar' => $request->magyar_bemutat, 'angol' => $request->angol_bemutat, 'hol' => 'alkoto bemutat']
            );

            // Alkotó frissítése
            $alkoto->update([
                'szak_id' => $request->szak_id,
                'nyelv_id_nev' => $nyelvMagyarNev->nyelv_id,
                'nyelv_id_bemutat' => $nyelvMagyarBemutat->nyelv_id,
                'buszkesegeink' => $request->buszkesegeink,
                'kep_azon' => $request->kep_azon,
                'cs_azon' => $request->cs_azon,
            ]);

            // Válasz visszaküldése
            return response()->json(['message' => 'Az alkotó sikeresen frissítve lett!'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Adatbázis hiba: ' . $e->getMessage()], 500);
        }
    }
}
