<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreProjectRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'title'       => 'required|string|max:255',
            'description' => 'required|string',
            'emoji'       => 'nullable|string',
            'bg_color'    => 'nullable|string',
            'tags'        => 'nullable|array',
            'tags.*'      => 'string',
            'github_url'  => 'nullable|url',
            'live_url'    => 'nullable|url',
            'type'        => 'required|in:Solo,Collaboratif',
            'is_visible'  => 'boolean',
            'order'       => 'integer|min:0',
        ];
    }

    public function messages(): array
    {
        return [
            'title.required'       => 'Le titre est obligatoire.',
            'description.required' => 'La description est obligatoire.',
            'type.in'              => 'Le type doit être Solo ou Collaboratif.',
            'github_url.url'       => 'Le lien GitHub doit être une URL valide.',
            'live_url.url'         => 'Le lien du site doit être une URL valide.',
        ];
    }
}
