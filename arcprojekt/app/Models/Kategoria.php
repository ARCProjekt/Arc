<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kategoria extends Model
{
    use HasFactory;

    protected  $primaryKey = 'k_id';

    protected $fillable = [
        'k_nev',
        'nyelv_id',
    ];

}
