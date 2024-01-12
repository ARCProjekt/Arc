<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reszprojekt extends Model
{
    use HasFactory;

    protected  $primaryKey = 'projekt_id';

    protected $fillable = [
        'k_id',
        'galeria_id',
        'elnevezes',
        'e_elnevezes',
        'nyelv_id'
    ];


}
