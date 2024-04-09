<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class VerifyCsrfToken extends Middleware
{
    /**
     * The URIs that should be excluded from CSRF verification.
     *
     * @var array<int, string>
     */
    protected $except = [
        '/api/userletrehoz',
        '/api/alkotoletrehoz',
        '/api/usertorol/*',
        '/api/kepek/alkotoKepek',
        '/api/updateuser/*',
        '/api/alkotoszerkeszt/*',
        '/api/csapat/store',
        'api/galeria/store',
        '/api/csapatTorol/*',
        '/api/csapatmodosit/*'
    ];
}
