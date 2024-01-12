<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Alkotjak extends Model
{
    use HasFactory;
    protected  $primaryKey = 'alkotjak_id';

    protected $fillable = [
        'cs_azon',
        'a_azon',
    ];

}
