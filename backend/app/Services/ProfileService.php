<?php

namespace App\Services;

use App\Models\Profile;

class ProfileService
{
    // Lire le profil (il n'y en a qu'un)
    public function get(): ?Profile
    {
        return Profile::first();
    }

    // Modifier ou créer le profil
    public function update(array $data): Profile
    {
        $profile = Profile::firstOrNew([]);
        $profile->fill($data)->save();
        return $profile;
    }
}
