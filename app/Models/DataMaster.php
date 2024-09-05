<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DataMaster extends Model
{
    use HasFactory;

    protected $table = 'data_master';

    protected $guarded = [];

    public function users()
    {
        return $this->belongsTo(User::class);
    }

    public function penilaianJabatan()
    {
        return $this->hasMany(DataMasterPenilaianJabatan::class, 'data_master_id');
    }
}
