<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateProfileRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'name'              => 'sometimes|string|max:255',
            'tagline'           => 'sometimes|string|max:255',
            'bio'               => 'sometimes|string',
            'email'             => 'sometimes|email',
            'phone'             => 'nullable|string|max:20',
            'location'          => 'nullable|string|max:100',
            'fiverr_url'        => 'nullable|url',
            'github_url'        => 'nullable|url',
            'linkedin_url'      => 'nullable|url',
            'skills'            => 'nullable|array',
            'skills.*.category' => 'required|string',
            'skills.*.items'    => 'required|array',
            'skills.*.items.*'  => 'string',
            'education'         => 'nullable|array',
            'education.*.year'   => 'required|string',
            'education.*.degree' => 'required|string',
            'education.*.school' => 'required|string',
            'soft_skills'       => 'nullable|array',
            'soft_skills.*'     => 'string',
        ];
    }

    public function messages(): array
    {
        return [
            'email.email'                  => 'L\'email doit être valide.',
            'skills.*.category.required'   => 'Chaque groupe de compétences doit avoir une catégorie.',
            'education.*.degree.required'  => 'Chaque formation doit avoir un intitulé.',
        ];
    }
}
