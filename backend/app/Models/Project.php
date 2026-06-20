<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = [
        'title', 'description', 'emoji', 'bg_color',
        'tags', 'github_url', 'live_url', 'type',
        'is_visible', 'order',
    ];

    protected $casts = [
        'tags'       => 'array',
        'is_visible' => 'boolean',
        'order'      => 'integer',
    ];
}
