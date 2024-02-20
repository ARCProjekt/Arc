<?php

namespace App\Http\Controllers;

use App\Models\Kategoria;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class KategoriaController extends Controller
{
    public function kategoriakLista()
    {
      /*  $kategoriak = DB::table('kategoriak as k')
            ->select('ny.magyar as nev')
            ->join('nyelvs as ny', 'k.nyelv_id_elnevezes', '=', 'ny.nyelv_id')
            ->get();
        return $kategoriak;*/

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
