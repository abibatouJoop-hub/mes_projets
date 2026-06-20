<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    protected $fillable = [
        'name', 'photo_url', 'tagline', 'bio', 'email', 'phone',
        'location', 'fiverr_url', 'github_url', 'linkedin_url',
        'skills', 'education', 'soft_skills',
    ];

    protected $casts = [
        'skills'      => 'array',
        'education'   => 'array',
        'soft_skills' => 'array',
    ];
}
