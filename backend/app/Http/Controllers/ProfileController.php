<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateProfileRequest;
use App\Services\ProfileService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ProfileController extends Controller
{
    public function __construct(private ProfileService $service) {}

    public function show()
    {
        $profile = $this->service->get();
        if (!$profile) {
            return response()->json(['message' => 'Profil introuvable.'], 404);
        }
        return response()->json($profile);
    }

    public function update(UpdateProfileRequest $request)
    {
        $profile = $this->service->update($request->validated());
        return response()->json($profile);
    }

    public function uploadPhoto(Request $request)
    {
        $request->validate([
            'photo' => 'required|image|mimes:jpg,jpeg,png,webp|max:4096',
        ]);

        $profile = $this->service->get();

        if ($profile && $profile->photo_url) {
            $oldPath = $this->extractPathFromUrl($profile->photo_url);
            if ($oldPath) {
                Storage::disk('s3')->delete($oldPath);
            }
        }

        $filename = 'profile/' . Str::uuid() . '.' . $request->file('photo')->extension();

        // ── DEBUG : capture le résultat de put() ──
        $result = Storage::disk('s3')->put(
            $filename,
            file_get_contents($request->file('photo')->getRealPath()),
            'public'
        );

        Log::info('Résultat upload (true=succès, false=échec): ' . json_encode($result));
        Log::info('Le fichier existe-t-il sur le disk ? ' . json_encode(Storage::disk('s3')->exists($filename)));
        // ── FIN DEBUG ──

        $baseUrl = rtrim(env('AWS_URL'), '/');
        $url = "{$baseUrl}/{$filename}";

        $updated = $this->service->update(['photo_url' => $url]);

        return response()->json($updated);
    }

    private function extractPathFromUrl(string $url): ?string
    {
        $bucket = env('AWS_BUCKET', 'portfolio');
        $marker = "/{$bucket}/";
        $pos = strpos($url, $marker);

        if ($pos === false) return null;

        return substr($url, $pos + strlen($marker));
    }
}
