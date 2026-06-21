<?php

use Illuminate\Support\Facades\Route;

// ── Route racine (garde celle-ci, nécessaire pour le Health Check Render) ──
Route::get('/', function () {
    return response()->json([
        'status'  => 'ok',
        'message' => 'Portfolio API — Mame Aby Diop',
    ]);
});

// ── La route de migration a été retirée — elle a fait son travail ✅ ──