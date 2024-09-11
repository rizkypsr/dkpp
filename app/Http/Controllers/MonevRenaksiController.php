<?php

namespace App\Http\Controllers;

use App\Models\MonevRenaksi;
use App\Models\RencanaAksi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class MonevRenaksiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $dataMonevRenaksi = MonevRenaksi::with(['rencanaAksi', 'rencanaAksi.feedbackBy'])->paginate(10);

        return Inertia::render('MonevRenaksi/Index', [
            'dataMonevRenaksi' => $dataMonevRenaksi,
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
        ], [
            'kinerja.required' => 'Kinerja wajib diisi',
            'kinerja.max' => 'Kinerja maksimal 255 karakter',
            'indikator_kinerja_individu.required' => 'Indikator Kinerja Individu wajib diisi',
            'indikator_kinerja_individu.max' => 'Indikator Kinerja Individu maksimal 255 karakter',
        ]);

        try {
            MonevRenaksi::create([
                'kinerja' => $validated['kinerja'],
                'indikator_kinerja_individu' => $validated['indikator_kinerja_individu'],
            ]);

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
        $validated = $request->validate([
            'kinerja' => 'required|max:255',
            'indikator_kinerja_individu' => 'required|max:255',
        ], [
            'kinerja.required' => 'Kinerja wajib diisi',
            'kinerja.max' => 'Kinerja maksimal 255 karakter',
            'indikator_kinerja_individu.required' => 'Indikator Kinerja Individu wajib diisi',
            'indikator_kinerja_individu.max' => 'Indikator Kinerja Individu maksimal 255 karakter',
        ]);

        try {

            $monevRenaksi = MonevRenaksi::findOrFail($id);

            $monevRenaksi->update([
                'kinerja' => $validated['kinerja'],
                'indikator_kinerja_individu' => $validated['indikator_kinerja_individu'],
            ]);

            return redirect()->back()->with('success', 'Data berhasil diubah');
        } catch (\Exception $e) {
            return redirect()->back()->withErrors([
                'error' => $e->getMessage(),
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $rencanaAksi = RencanaAksi::where('data_laporan_monev_renaksi_id', $id)->get();

            foreach ($rencanaAksi as $item) {
                if ($item->bukti_pendukung) {
                    Storage::disk('public')->delete('data-laporan-monev-renaksi/'.$item->bukti_pendukung);
                }

                $item->delete();
            }

            MonevRenaksi::findOrFail($id)->delete();

            return redirect()->back()->with('success', 'Data berhasil dihapus');
        } catch (\Exception $e) {
            return redirect()->back()->withErrors([
                'error' => $e->getMessage(),
            ]);
        }
    }
}
