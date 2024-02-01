<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Csapat extends Model
{
    use HasFactory;
    protected  $primaryKey = 'cs_azon';

    protected $fillable = [
        'galeria_id',
        'projekt_id',
        'nyelv_id_csapat_nev',
        'nyelv_id_leiras'
    ];

}
