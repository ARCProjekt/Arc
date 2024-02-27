<?php

namespace App\Http\Middleware;
use Illuminate\Support\Facades\Auth;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class Admin
{
    public function handle(Request $request, Closure $next)
    {
        if (Auth::check()) {
            // Ellenőrizd, hogy a felhasználónak admin jogosultsága van-e
            if (Auth::user()->jog === 'A') {
                return $next($request);
            }
        }
        // Ha nincs admin jogosultság, dobunk egy hibát
        abort(403, 'Unauthorized action.');
    }
}
