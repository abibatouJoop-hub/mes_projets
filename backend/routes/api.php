<?php
// ── Routes publiques ──
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use Illuminate\Support\Facades\Route;

Route::get('/projects',        [ProjectController::class, 'index']);
Route::get('/projects/{project}', [ProjectController::class, 'show']);
Route::get('/profile',         [ProfileController::class, 'show']);
Route::post('/admin/profile/photo', [ProfileController::class, 'uploadPhoto']);

// ── Auth ──
Route::post('/login',  [AuthController::class, 'login']);

// ── Routes protégées (Sanctum) ──
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me',      [AuthController::class, 'me']);

    Route::get('/admin/projects',              [ProjectController::class, 'adminIndex']);
    Route::post('/admin/projects',             [ProjectController::class, 'store']);
    Route::put('/admin/projects/{project}',    [ProjectController::class, 'update']);
    Route::delete('/admin/projects/{project}', [ProjectController::class, 'destroy']);

    Route::put('/admin/profile',        [ProfileController::class, 'update']);
    Route::post('/admin/profile/photo', [ProfileController::class, 'uploadPhoto']);  // ← nouveau
});
