<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Artisan;

// ── Route racine (nécessaire pour le Health Check Render) ──
Route::get('/', function () {
    return response()->json([
        'status'  => 'ok',
        'message' => 'Portfolio API — Mame Aby Diop',
    ]);
});

// ── Route TEMPORAIRE de migration ──
Route::get('/run-migrations-secret-f8RvTOnux6w5yezQyY7YVD9h8', function () {
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