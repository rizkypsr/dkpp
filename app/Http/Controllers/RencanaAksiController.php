<?php

namespace App\Http\Controllers;

use App\Models\MonevRenaksi;
use App\Models\RencanaAksi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class RencanaAksiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($id)
    {
        $dataRencanaAksi = RencanaAksi::where('data_laporan_monev_renaksi_id', $id)->with(['feedbackBy'])->paginate(10);

        return Inertia::render('MonevRenaksi/RencanaAksi/Index', [
            'id' => $id,
            'dataRencanaAksi' => $dataRencanaAksi,
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
    public function store(Request $request, $id)
    {
        $validated = $request->validate([
            'rencana_aksi' => 'required|max:255',
            'target' => 'required|max:255',
            'realisasi' => 'required|max:255',
            'capaian' => 'required|max:255',
            'catatan' => 'required|max:255',
            'tindak_lanjut' => 'required|max:255',
            'bukti_pendukung' => 'nullable|file|max:5120',
        ], [
            'rencana_aksi.required' => 'Rencana Aksi wajib diisi',
            'rencana_aksi.max' => 'Rencana Aksi maksimal 255 karakter',
            'target.required' => 'Target wajib diisi',
            'target.max' => 'Target maksimal 255 karakter',
            'realisasi.required' => 'Realisasi wajib diisi',
            'realisasi.max' => 'Realisasi maksimal 255 karakter',
            'capaian.required' => 'Capaian wajib diisi',
            'capaian.max' => 'Capaian maksimal 255 karakter',
            'catatan.required' => 'Catatan wajib diisi',
            'catatan.max' => 'Catatan maksimal 255 karakter',
            'tindak_lanjut.required' => 'Tindak Lanjut wajib diisi',
            'tindak_lanjut.max' => 'Tindak Lanjut maksimal 255 karakter',
            'bukti_pendukung.file' => 'Bukti Pendukung harus berupa file',
            'bukti_pendukung.max' => 'Bukti Pendukung maksimal 5MB',
        ]);

        $fileName = null;

        try {
            if ($request->hasFile('bukti_pendukung')) {
                $file = $request->file('bukti_pendukung');

                $fileName = time().'_'.uniqid().'.'.$file->getClientOriginalExtension();

                $file->storeAs('data-laporan-monev-renaksi', $fileName, 'public');
            }

            RencanaAksi::create([
                'rencana_aksi' => $validated['rencana_aksi'],
                'target' => $validated['target'],
                'realisasi' => $validated['realisasi'],
                'capaian' => $validated['capaian'],
                'catatan' => $validated['catatan'],
                'tindak_lanjut' => $validated['tindak_lanjut'],
                'bukti_pendukung' => $fileName,
                'data_laporan_monev_renaksi_id' => $id,
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
    public function edit(string $monevRenaksiId, string $rencanaAksiId)
    {

        $monevRenaksi = MonevRenaksi::findOrFail($monevRenaksiId);
        $rencanaAksi = RencanaAksi::findOrFail($rencanaAksiId);

        return Inertia::render('MonevRenaksi/RencanaAksi/Edit', [
            'dataMonevRenaksi' => $monevRenaksi,
            'dataRencanaAksi' => $rencanaAksi,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id, string $rencanaAksiId)
    {

        $validated = $request->validate([
            'rencana_aksi' => 'required|max:255',
            'target' => 'required|max:255',
            'realisasi' => 'required|max:255',
            'capaian' => 'required|max:255',
            'catatan' => 'required|max:255',
            'tindak_lanjut' => 'required|max:255',
            'bukti_pendukung' => 'nullable|file|max:5120',
        ], [
            'rencana_aksi.required' => 'Rencana Aksi wajib diisi',
            'rencana_aksi.max' => 'Rencana Aksi maksimal 255 karakter',
            'target.required' => 'Target wajib diisi',
            'target.max' => 'Target maksimal 255 karakter',
            'realisasi.required' => 'Realisasi wajib diisi',
            'realisasi.max' => 'Realisasi maksimal 255 karakter',
            'capaian.required' => 'Capaian wajib diisi',
            'capaian.max' => 'Capaian maksimal 255 karakter',
            'catatan.required' => 'Catatan wajib diisi',
            'catatan.max' => 'Catatan maksimal 255 karakter',
            'tindak_lanjut.required' => 'Tindak Lanjut wajib diisi',
            'tindak_lanjut.max' => 'Tindak Lanjut maksimal 255 karakter',
            'bukti_pendukung.file' => 'Bukti Pendukung harus berupa file',
            'bukti_pendukung.max' => 'Bukti Pendukung maksimal 5MB',
        ]);

        try {
            $rencanaAksi = RencanaAksi::findOrFail($rencanaAksiId);

            $fileName = $rencanaAksi->bukti_pendukung;

            if ($request->hasFile('bukti_pendukung')) {
                $file = $request->file('bukti_pendukung');

                $fileName = time().'_'.uniqid().'.'.$file->getClientOriginalExtension();

                $file->storeAs('data-laporan-monev-renaksi', $fileName, 'public');

                Storage::disk('public')->delete('data-laporan-monev-renaksi/'.$rencanaAksi->bukti_pendukung);
            }

            $rencanaAksi->update([
                'rencana_aksi' => $validated['rencana_aksi'],
                'target' => $validated['target'],
                'realisasi' => $validated['realisasi'],
                'capaian' => $validated['capaian'],
                'catatan' => $validated['catatan'],
                'tindak_lanjut' => $validated['tindak_lanjut'],
                'bukti_pendukung' => $fileName,
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
    public function destroy(string $monevRenaksiId, string $rencanaAksiId)
    {
        try {
            $rencanaAksi = RencanaAksi::findOrFail($rencanaAksiId);

            if ($rencanaAksi->bukti_pendukung) {
                Storage::disk('public')->delete('data-laporan-monev-renaksi/'.$rencanaAksi->bukti_pendukung);
            }

            $rencanaAksi->delete();

            return redirect()->back()->with('success', 'Data berhasil dihapus');
        } catch (\Exception $e) {
            return redirect()->back()->withErrors([
                'error' => $e->getMessage(),
            ]);
        }
    }

    public function updateFeedback(Request $request, string $id)
    {

        $validated = $request->validate([
            'feedback' => 'required|max:255',
        ], [
            'feedback.required' => 'Feedback wajib diisi',
            'feedback.max' => 'Feedback maksimal 255 karakter',
        ]);

        try {
            $rencanaAksi = RencanaAksi::findOrFail($id);

            $rencanaAksi->update([
                'feedback' => $validated['feedback'],
                'feedback_by' => auth()->user()->id,
            ]);

            return redirect()->route('data-laporan-monev-renaksi.rencana-aksi.index', $rencanaAksi->data_laporan_monev_renaksi_id)->with('success', 'Berhasil memberikan feedback');
        } catch (\Exception $e) {
            return redirect()->back()->withErrors([
                'error' => $e->getMessage(),
            ]);
        }
    }
}
