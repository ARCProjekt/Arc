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
        return User::all();
    }


    public function store(Request $request)
    {
        $user = Auth::user();

        if (!$user || $user->jog !== 1) {
            abort(403, 'Nincs jogosultsága új felhasználókat létrehozni.');
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

        // Új felhasználó létrehozása
        $user = new User([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'jog' => ($request->jog == 'tanar') ? $jogTanar : $jogAdmin,
        ]);

        $user->save();
    }
}