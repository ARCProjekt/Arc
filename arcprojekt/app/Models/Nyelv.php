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
    public function csapatokNev()
    {
        return $this->hasMany(Csapat::class, 'nyelv_id_csapat_nev', 'nyelv_id');
    }

    public function csapatokLeiras()
    {
        return $this->hasMany(Csapat::class, 'nyelv_id_leiras', 'nyelv_id');
    }
    public function kepekLeiras()
    {
        return $this->hasMany(Kepek::class, 'nyelv_id_leiras', 'nyelv_id');
    }

}
