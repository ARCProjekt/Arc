<?php

namespace App\Http\Controllers;

use App\Models\Kategoria;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class KategoriaController extends Controller
{
    public function kategoriakLista()
    {
        $kategoriak = DB::select(
            '
        SELECT *
        from kategorias 
        inner join nyelvs
        on kategorias.nyelv_id_elnevezes = nyelvs.nyelv_id
        '
        );
        return response()->json(['kategoriak' => $kategoriak]);
    }
    public function kategoriaElnevezesek()
    {
        $kategoriak = DB::select(
            '
        SELECT nyelvs.magyar
        from kategorias 
        inner join nyelvs
        on kategorias.nyelv_id_elnevezes = nyelvs.nyelv_id
        '
        );
        return response()->json(['kategoriak' => $kategoriak]);
    }
}
