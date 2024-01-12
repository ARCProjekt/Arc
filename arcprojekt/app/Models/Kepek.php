<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kepek extends Model
{
    use HasFactory;

    protected  $primaryKey = 'kep_azon';

    protected $fillable = [
        'kep',
        'nyelv_id',
        'fotos_neve'
    ];

}
