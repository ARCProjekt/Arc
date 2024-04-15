<?php

namespace App\Http\Controllers;

use App\Models\Galeria;
use App\Models\Galeria_kep;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class Galeria_kepController extends Controller
{
    public function galeriakepek($cs_azon)
    {
        $kepek = DB::table('galeria_keps as gk')
        ->select('k.kep','k.kep_azon')       
        ->join('kepeks as k', 'k.kep_azon','=','gk.kep_azon')
        //->join('nyelvs', 'k.nyelv_id_leiras', '=', 'nyelvs.nyelv_id')
        ->join('csapats as cs', 'gk.galeria_id','=','cs.galeria_id')
        ->where('cs_azon', '=', $cs_azon)
        ->get();
        return response()->json(['kepek' => $kepek]);
    }
}
