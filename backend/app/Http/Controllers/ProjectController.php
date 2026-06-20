<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Models\Project;
use App\Services\ProjectService;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function __construct(private ProjectService $service) {}

    // PUBLIC — projets visibles
    public function index()
    {
        return response()->json($this->service->getVisible());
    }

    // PUBLIC — un projet
    public function show(Project $project)
    {
        if (!$project->is_visible) abort(404);
        return response()->json($project);
    }

    // ADMIN — tous les projets
    public function adminIndex()
    {
        return response()->json($this->service->getAll());
    }

    // ADMIN — créer
    public function store(StoreProjectRequest $request)
    {
        $project = $this->service->create($request->validated());
        return response()->json($project, 201);
    }

    // ADMIN — modifier
    public function update(UpdateProjectRequest $request, Project $project)
    {
        $updated = $this->service->update($project, $request->validated());
        return response()->json($updated);
    }

    // ADMIN — supprimer
    public function destroy(Project $project)
    {
        $this->service->delete($project);
        return response()->json(['message' => 'Projet supprimé.']);
    }
}
