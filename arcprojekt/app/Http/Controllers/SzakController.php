<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SzakController extends Controller
{
    public function szakokKiir(){
        $szakok = DB::select('

        SELECT  szak_id,szak_nev.magyar

        from szaks
        inner join nyelvs as szak_nev
        on szaks.nyelv_id_elnevezes = szak_nev.nyelv_id
        
           

        ');
        return response()->json(['szakok' => $szakok]);

        
    }
}
