<?php

namespace App\Http\Controllers;

use App\Models\Galeria;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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
}
