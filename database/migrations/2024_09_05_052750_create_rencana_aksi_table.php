<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('rencana_aksi', function (Blueprint $table) {
            $table->id();
            $table->string('rencana_aksi')->nullable();
            $table->string('target')->nullable();
            $table->string('realisasi')->nullable();
            $table->string('capaian')->nullable();
            $table->string('catatan')->nullable();
            $table->string('tindak_lanjut')->nullable();
            $table->string('bukti_pendukung')->nullable();
            $table->string('feedback')->nullable();

            $table->foreignId('feedback_by')->nullable()->constrained('users')->onDelete('cascade');
            $table->foreignId('data_laporan_monev_renaksi_id')->constrained('data_laporan_monev_renaksi')->onDelete('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rencana_aksi');
    }
};
