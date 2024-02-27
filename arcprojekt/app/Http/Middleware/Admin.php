<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class Admin
{
    public function handle(Request $request, Closure $next)
    {
        // Ellenőrizd, hogy a bejelentkezett felhasználónak admin jogosultsága van-e
        if (Auth::check() && Auth::user()->jog === 1) {
            return $next($request);
        }

        // Ha nincs admin jogosultság, dobunk egy hibát
        abort(403, 'Unauthorized action.');
    }
}
