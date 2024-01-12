<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Galeria extends Model
{
    use HasFactory;
    protected  $primaryKey = 'galeria_id';

    protected $fillable = [
        'fogaleria',
        'nyelv_id'
    ];

}
