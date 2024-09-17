<?php

namespace App\Http\Controllers;

use App\Models\KeterkaitanKurja;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KeterkaitanKurjaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($data_laporan_kurja_id)
    {
        $dataKeterkaitanKurja = KeterkaitanKurja::where('data_laporan_kurja_id', $data_laporan_kurja_id)->paginate(10);

        return Inertia::render('Kurja/Keterkaitan/Index', [
            'kurjaId' => $data_laporan_kurja_id,
            'dataKeterkaitanKurja' => $dataKeterkaitanKurja,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, $data_laporan_kurja_id)
    {
        $validated = $request->validate([
            'program' => 'required|max:255',
            'anggaran' => 'required|numeric|min:1',
            'realisasi_rupiah' => 'required|numeric|min:1',
            'realisasi_persentase' => 'required|numeric',
        ], [
            'program.required' => 'Program wajib diisi',
            'program.max' => 'Program maksimal 255 karakter',
            'anggaran.required' => 'Anggaran wajib diisi',
            'anggaran.numeric' => 'Anggaran harus berupa angka',
            'anggaran.min' => 'Anggaran minimal 1',
            'realisasi_rupiah.required' => 'Realisasi Rupiah wajib diisi',
            'realisasi_rupiah.numeric' => 'Realisasi Rupiah harus berupa angka',
            'realisasi_rupiah.min' => 'Realisasi Rupiah minimal 1',
            'realisasi_persentase.required' => 'Realisasi Persentase wajib diisi',
            'realisasi_persentase.numeric' => 'Realisasi Persentase harus berupa angka',
            'realisasi_persentase.min' => 'Realisasi Persentase minimal 1',
        ]);

        try {
            KeterkaitanKurja::create([
                'data_laporan_kurja_id' => $data_laporan_kurja_id,
                'program' => $validated['program'],
                'anggaran' => $validated['anggaran'],
                'realisasi_rupiah' => $validated['realisasi_rupiah'],
                'realisasi_persentase' => $validated['realisasi_persentase'],
            ]);

            return redirect()->back()->with('success', 'Data berhasil ditambahkan');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Data gagal ditambahkan');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
