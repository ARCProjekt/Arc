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

    public function update(Request $request, $id){
        if (!Auth::check() || Auth::user()->jog !== 1) {
            abort(401, 'Nincs jogosultsága felhasználókat módosítani.');
        }

         $user = User::find($id);
        /* $user->name = $request->name;
        $user->email = $request->email;
        $user->password = $request->password;
        $user->jog = $request->jog; */
        /* $user->fill($request->only(['name', 'email', 'password', 'jog']));
        $user->save(); */
        //return response()->json($user); */

        try {
            $user->fill($request->only(['name', 'email', 'password', 'jog']));
            
            // Itt a jelszót bcrypt-tel kell titkosítani, ha a jelszót is frissíteni szeretnéd
            if ($request->has('password')) {
                $user->password = bcrypt($request->password);
            }
            
            $user->save();
            return response()->json($user);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Adatbázis hiba: ' . $e->getMessage()], 500);
        }
    }

}
