<?php

namespace App\Http\Controllers;

use App\Models\Kurja;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KurjaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $dataKurja = Kurja::paginate(10);

        return Inertia::render('Kurja/Index', [
            'dataKurja' => $dataKurja,
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
    public function store(Request $request)
    {
        $validated = $request->validate([
            'kinerja' => 'required|max:255',
            'indikator_kinerja_individu' => 'required|max:255',
            'target' => 'required|max:255',
            'realisasi' => 'required|max:255',
            'capaian' => 'required|max:255',
            'penjelasan' => 'required|max:255',
            'alternatif' => 'required|max:255',
        ], [
            'kinerja.required' => 'Kinerja wajib diisi',
            'kinerja.max' => 'Kinerja maksimal 255 karakter',
            'indikator_kinerja_individu.required' => 'Indikator Kinerja Individu wajib diisi',
            'indikator_kinerja_individu.max' => 'Indikator Kinerja Individu maksimal 255 karakter',
            'target.required' => 'Target wajib diisi',
            'target.max' => 'Target maksimal 255 karakter',
            'realisasi.required' => 'Realisasi wajib diisi',
            'realisasi.max' => 'Realisasi maksimal 255 karakter',
            'capaian.required' => 'Capaian wajib diisi',
            'capaian.max' => 'Capaian maksimal 255 karakter',
            'penjelasan.required' => 'Penjelasan wajib diisi',
            'penjelasan.max' => 'Penjelasan maksimal 255 karakter',
            'alternatif.required' => 'Alternatif wajib diisi',
            'alternatif.max' => 'Alternatif maksimal 255 karakter',
        ]);

        try {
            Kurja::create($validated);

            return redirect()->back()->with('success', 'Data berhasil disimpan');
        } catch (\Exception $e) {
            return redirect()->back()->withErrors([
                'error' => $e->getMessage(),
            ]);
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
