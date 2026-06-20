<?php

namespace App\Services;

use App\Models\Project;
use Illuminate\Database\Eloquent\Collection;

class ProjectService
{
    // Tous les projets visibles (visiteurs)
    public function getVisible(): Collection
    {
        return Project::where('is_visible', true)
            ->orderBy('order')
            ->get();
    }

    // Tous les projets (admin)
    public function getAll(): Collection
    {
        return Project::orderBy('order')->get();
    }

    // Un projet par id
    public function findOrFail(int $id): Project
    {
        return Project::findOrFail($id);
    }

    // Créer un projet
    public function create(array $data): Project
    {
        // Si order non fourni, on le met en dernier
        if (!isset($data['order'])) {
            $data['order'] = Project::max('order') + 1;
        }

        return Project::create($data);
    }

    // Modifier un projet
    public function update(Project $project, array $data): Project
    {
        $project->update($data);
        return $project->fresh();
    }

    // Supprimer un projet
    public function delete(Project $project): void
    {
        $project->delete();
    }

}
