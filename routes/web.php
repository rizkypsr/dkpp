<?php

use App\Http\Controllers\DataMasterController;
use App\Http\Controllers\KurjaController;
use App\Http\Controllers\MonevRenaksiController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RenaksiController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::redirect('/', '/dashboard');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {

    Route::resource('data-master', DataMasterController::class);

    Route::get('/data-laporan-renaksi/tribulan', [RenaksiController::class, 'tribulan'])->name('data-laporan-renaksi.tribulan');
    Route::get('/data-laporan-renaksi/tribulan/feedback', [RenaksiController::class, 'feedback'])->name('data-laporan-renaksi.feedback');
    Route::resource('data-laporan-renaksi', RenaksiController::class);

    Route::resource('data-laporan-monev-renaksi', MonevRenaksiController::class);

    Route::resource('data-laporan-kurja', KurjaController::class);

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
