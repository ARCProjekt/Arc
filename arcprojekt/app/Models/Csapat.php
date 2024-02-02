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
    public function alkotok()
    {
        return $this->belongsToMany(Alkoto::class, 'csapat_alkotok', 'csapat_id', 'alkoto_id');
    }
    public function nyelvCsapatNev()
    {
        return $this->belongsTo(Nyelv::class, 'nyelv_id_csapat_nev');
    }

    public function nyelvLeiras()
    {
        return $this->belongsTo(Nyelv::class, 'nyelv_id_leiras');
    }
}
