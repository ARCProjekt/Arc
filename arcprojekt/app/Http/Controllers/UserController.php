<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Jogosultsag;
class UserController extends Controller
{
    public function create()
    {
       /*  $user = Auth::user();

        if (!$user || $user->jog !== 1) {
            abort(403, 'Nincs jogosultsága új felhasználókat létrehozni.');
        } */

       // Alkotók lekérdezése
       $users = User::all();
       return view('users.useruserLetrehoz', compact('users'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required',
        ]);
    
        // Lekérjük a jogosultsági szerepköröket
        $jogTanar = Jogosultsag::where('jog', 'T')->first();
        $jogAdmin = Jogosultsag::where('jog', 'A')->first();
    
        // Felhasználó létrehozása a megfelelő jogosultsági szerepkörrel
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'jog' => ($request->jog == 'tanar') ? $jogTanar->id : $jogAdmin->id,
        ]);
    
        return view('users.useruserLetrehoz', [
            'message' => 'Felhasználó sikeresen létrehozva',
            'users' => User::all(),
            'lastCreatedUser' => $user
        ]);
    }
    
}
