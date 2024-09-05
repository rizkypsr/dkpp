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
        Schema::create('tribulan', function (Blueprint $table) {
            $table->id();
            $table->string('rencana_aksi')->nullable();
            $table->string('target')->nullable();
            $table->string('feedback')->nullable();

            $table->foreignId('feedback_by')->constrained('jabatan')->onDelete('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tribulan');
    }
};
