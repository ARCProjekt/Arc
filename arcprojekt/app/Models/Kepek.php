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
        'nyelv_id_leiras',
        'fotos_neve'
    ];
    public function galeriaKepek()
    {
        return $this->hasMany(Galeria_kep::class, 'kep_azon', 'kep_azon');
    }
}
