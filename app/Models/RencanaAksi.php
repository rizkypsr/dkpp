<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RencanaAksi extends Model
{
    use HasFactory;

    protected $table = 'rencana_aksi';

    protected $guarded = [];

    public function dataLaporanRenaksi()
    {
        return $this->belongsTo(MonevRenaksi::class);
    }

    public function feedbackBy()
    {
        return $this->belongsTo(User::class, 'feedback_by');
    }
}
