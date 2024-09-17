<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KeterkaitanKurja extends Model
{
    use HasFactory;

    protected $table = 'keterkaitan_kurja';

    protected $guarded = [];

    public function dataLaporanKurja()
    {
        return $this->belongsTo(Kurja::class, 'data_laporan_kurja_id');
    }
}
