<?php

namespace App\Http\Controllers;

use App\Models\DataMaster;
use App\Models\Jabatan;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class DataMasterController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $dataMaster = DataMaster::with(['users.jabatan', 'penilaianJabatan.jabatan'])->paginate(10);

        $options = Jabatan::all()->map(function ($jabatan) {
            return [
                'value' => $jabatan->id,
                'label' => $jabatan->nama,
            ];
        });

        return Inertia::render('DataMaster/Index', [
            'dataMaster' => $dataMaster,
            'options' => $options,
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
            'nip' => 'required|numeric|unique:users,nip',
            'name' => 'required|max:255',
            'password' => 'required|min:8',
            'jabatan' => 'required|exists:jabatan,id',
            'penilaianKeJabatan' => 'required|array',
        ]);

        // $user = User::create([
        //     'nip' => $request->nip,
        //     'username' => $request->nip,
        //     'name' => $request->name,
        //     'password' => Hash::make('password'),
        //     'jabatan_id' => $request->jabatan,
        // ]);

        // dd($user);

        // create data master
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
