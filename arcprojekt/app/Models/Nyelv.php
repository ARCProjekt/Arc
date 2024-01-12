<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Nyelv extends Model
{
    use HasFactory;

    protected  $primaryKey = 'nyelv_id';

    protected $fillable = [
        'magyar',
        'angol',
        'hol'
    ];

}
