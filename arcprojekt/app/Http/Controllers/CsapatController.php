<?php

namespace App\Http\Controllers;

use App\Models\Csapat;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CsapatController extends Controller
{
    public function show($id){
        return Csapat::find($id);
    }

    public function csapatGaleriaja($csapat_id){
        $galery = DB::table('galeries as g')
        ->select('*')
        ->where('cs_azon', '=', $csapat_id)
        ->get();
        return $galery;
    }
}
