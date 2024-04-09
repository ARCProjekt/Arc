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
    public function kep()
    {
        return $this->belongsTo(Kepek::class, 'kep_azon', 'kep_azon');
    }

    public function galeria()
    {
        return $this->belongsTo(Galeria::class, 'galeria_id', 'galeria_id');
    }
}
