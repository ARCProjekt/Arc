<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Alkoto extends Model
{
    use HasFactory;
    protected  $primaryKey = 'a_azon';

    protected $fillable = [
        'szak_id',
        'nyelv_id_nev',
        'kep_azon',
        'nyelv_id_bemutat',
        'buszkesegeink'
    ];

}
