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
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required',
            'jog' => 'required|in:tanar,admin',
        ]);

        // Lekérjük a jogosultsági szerepköröket
        $jogTanar = Jogosultsag::where('jog', 'T')->firstOrFail()->id;
        $jogAdmin = Jogosultsag::where('jog', 'A')->firstOrFail()->id;

        // Új felhasználó létrehozása
        $user = new User([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'jog' => ($request->jog == 'tanar') ? $jogTanar : $jogAdmin,
        ]);

        $user->save();

      
       
}}
