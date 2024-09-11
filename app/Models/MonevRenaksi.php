<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MonevRenaksi extends Model
{
    use HasFactory;

    protected $table = 'data_laporan_monev_renaksi';

    protected $guarded = [];

    public function rencanaAksi()
    {
        return $this->hasMany(RencanaAksi::class, 'data_laporan_monev_renaksi_id');
    }
}
