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

}
