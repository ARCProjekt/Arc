<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function create()
    {

        if (Auth::user()->jog !== 1) {
            abort(403, 'Nincs jogosultsága új felhasználókat létrehozni.');
        }


        // Alkotók lekérdezése
        $users = User::all();

        // Űrlap nézetének megjelenítése és az alkotók átadása
        return view('users.create', compact('users'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required',
            'password' => 'required',
            'jog' => 'required'
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password,
            'jog' => $request->jog,
        ]);

        $jogosultsag = $user->jogosultsag;

        return view('users.userLetrehoz', ['message' => 'Felhasználó sikeresen létrehozva', 'users' => User::all()]);
    }
}
