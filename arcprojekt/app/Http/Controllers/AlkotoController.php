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
        SELECT a_azon,nyelvs.magyar as alkoto_nev, nyelvs_bemutat.magyar as bemutato_nev, kepeks.kep, szak_elnev.magyar as szak,alkotos.cs_azon as csapat, csap_nev_nyelv.magyar as csapat_nev
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
            ->where('a_azon', '=', $alkoto_id)
            ->get();
        return $alkoto;
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
    
    public function updateAlkoto(Request $request, $alkoto_id)
{
    // Validate the request if needed

    // Find the record in the database
    $alkoto = Alkoto::find($alkoto_id);

    // Update the record with the new data
    $alkoto->szak_id = $request->input('szak_id');
    $alkoto->nyelv_id_nev = $request->input('nyelv_id_nev');
    $alkoto->nyelv_id_bemutat = $request->input('nyelv_id_bemutat');
    $alkoto->buszkesegeink = $request->input('buszkesegeink');
    $alkoto->kep_azon = $request->input('kep_azon');
    
    // Assuming that 'cs_azon' is the field you want to update
    $alkoto->cs_azon = $request->input('cs_azon');

    // ... update other fields ...

    // Save the changes
    $alkoto->save();

    return response()->json(['message' => 'Alkoto updated successfully']);
}

}
