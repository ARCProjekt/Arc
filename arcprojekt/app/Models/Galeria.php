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
        'nyelv_id_leiras'
    ];
    public function csapatok()
    {
        return $this->hasMany(Csapat::class, 'galeria_id', 'galeria_id');
    }
    public function galeriaKepek()
    {
        return $this->hasMany(Galeria_kep::class, 'galeria_id', 'galeria_id');
    }
    
}
