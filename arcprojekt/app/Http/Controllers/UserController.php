<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Jogosultsag;

class UserController extends Controller
{
    public function users()
    {
       /*  $user = Auth::user();
        if (!$user || $user->jog !== 1) {
            abort(401, 'Nincs jogosultsága új felhasználókat lekérdezni.');
        } */

        if (!Auth::check() || Auth::user()->jog !== 1) {
            abort(401, 'Nincs jogosultsága felhasználókat lekérni.');
        }

        return User::all();
    }


    public function store(Request $request)
    {
         //$user = Auth::user();

        if (!Auth::check() || Auth::user()->jog !== 1) {
            abort(401, 'Nincs jogosultsága új felhasználókat létrehozni.');
        }
 

        
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required',
            'jog' => 'required|in:tanar,admin',
        ]);

           // Lekérjük a jogosultsági szerepköröket
        $jogTanar = 2;
        $jogAdmin = 1; 
        // Lekérjük mindkét jogosultsági szerepkört
        $jogosultsagok = Jogosultsag::whereIn('jog', ['T', 'A'])->get();

        $jogTanar = $jogosultsagok->where('jog', 'T')->first();
        $jogAdmin = $jogosultsagok->where('jog', 'A')->first();

        if (!$jogTanar || !$jogAdmin) {
            abort(500, 'Nem találhatók megfelelő jogosultsági szerepkörök az adatbázisban.');
        }

        // Új felhasználó létrehozása
        $user = new User([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'jog' => ($request->jog == 'tanar') ? $jogTanar->id : $jogAdmin->id,
        ]);

        $user->save();
    }

    public function userTorol($id){
        if (!Auth::check() || Auth::user()->jog !== 1) {
            abort(401, 'Nincs jogosultsága felhasználókat törölni.');
        }

        User::find($id)->delete();
    }


}
