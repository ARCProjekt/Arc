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

        if (!Auth::check() || Auth::user()->jog !== 1) {
            abort(401, 'Nincs jogosultsága felhasználókat lekérni.');
        }

        return User::all();
    }


    public function store(Request $request)
    {

        if (!Auth::check() || Auth::user()->jog !== 1) {
            abort(401, 'Nincs jogosultsága új felhasználókat létrehozni.');
        }

        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required',
            'jog' => 'required|in:tanar,admin',
        ]);

        $jogTanar = 2;
        $jogAdmin = 1;

        $jogosultsagok = Jogosultsag::whereIn('jog', ['T', 'A'])->get();

        $jogTanar = $jogosultsagok->where('jog', 'T')->first();
        $jogAdmin = $jogosultsagok->where('jog', 'A')->first();

        if (!$jogTanar || !$jogAdmin) {
            abort(500, 'Nem találhatók megfelelő jogosultsági szerepkörök az adatbázisban.');
        }

        $user = new User([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'jog' => ($request->jog == 'tanar') ? $jogTanar->id : $jogAdmin->id,
        ]);

        $user->save();
    }

    public function userTorol($id)
    {
        if (!Auth::check() || Auth::user()->jog !== 1) {
            abort(401, 'Nincs jogosultsága felhasználókat törölni.');
        }

        User::find($id)->delete();
    }

    public function update(Request $request, $id)
    {
        if (!Auth::check() || Auth::user()->jog !== 1) {
            abort(401, 'Nincs jogosultsága felhasználókat módosítani.');
        }

        $rules = [
            'name' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|email|unique:users,email,' . $id,
            'password' => 'sometimes|required|string|min:8',
            'jog' => 'sometimes|required|integer'
        ];

        $messages = [
            'email.email' => 'Hibás email formátum.',
            'email.unique' => 'Az email cím már használatban van.',
            'password.min' => 'A jelszónak legalább 8 karakter hosszúnak kell lennie.',
        ];

        $validatedData = $request->validate($rules, $messages);


        $user = User::find($id);
        try {
            foreach ($validatedData as $key => $value) {
                if ($key == 'password') {
                    $user->password = bcrypt($value);
                } else {
                    $user->$key = $value;
                }
            }

            $user->save();
            return response()->json($user);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Adatbázis hiba: ' . $e->getMessage()], 500);
        }
    }

    public function checkEmail(Request $request)
    {
        $email = $request->input('email');
        $egyedi = !User::where('email', $email)->exists();
        return response()->json(['egyedi' => $egyedi]);
    }
}
