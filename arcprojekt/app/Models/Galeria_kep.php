<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Galeria_kep extends Model
{
    use HasFactory;

    protected $fillable = [
        'kep_azon',
        'galeria_id',
        'kiemelt_kep'
    ];

}
