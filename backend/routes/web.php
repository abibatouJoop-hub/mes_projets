<?php
// ════════════════════════════════════════
// routes/web.php — ajoute cette route TEMPORAIRE
// ════════════════════════════════════════

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Artisan;

Route::get('/run-migrations-secret-f8RvTOnux6w5yezQyY7YVD9h8', function () {
    // Remplace cette valeur par TA propre clé secrète
    if (request('key') !== 'kP9mX2vL7qR4tN8wZ5cF1bH6jY3aS0eD') {
        abort(403);
    }

    Artisan::call('migrate', ['--force' => true]);
    $migrateOutput = Artisan::output();

    Artisan::call('db:seed', ['--class' => 'AdminSeeder', '--force' => true]);
    $seedOutput = Artisan::output();

    return response()->json([
        'migrate' => $migrateOutput,
        'seed'    => $seedOutput,
    ]);
});