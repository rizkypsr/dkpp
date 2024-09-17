<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kurja extends Model
{
    use HasFactory;

    protected $table = 'data_laporan_kurja';

    protected $guarded = [];

    public function keterkaitanKurja()
    {
        return $this->hasMany(KerterkaitanKurja::class, 'data_laporan_kurja_id');
    }
}
