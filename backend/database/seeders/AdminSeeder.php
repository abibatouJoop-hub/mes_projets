<?php

namespace Database\Seeders;

use App\Models\Profile;
use App\Models\Project;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        // ── Créer le compte admin (toi) ──
        User::updateOrCreate(
            ['email' => 'abydiop0324@gmail.com'],
            [
                'name'     => 'Mame Aby Diop',
                'password' => Hash::make('ChangeMotDePasse123!'), // ← change ici !
            ]
        );

        // ── Créer le profil ──
        Profile::updateOrCreate(
            ['email' => 'abydiop0324@gmail.com'],
            [
                'name'     => 'Mame Aby Diop',
                'tagline'  => 'Développeuse Web Full Stack · Laravel · Angular · PostgreSQL',
                'bio'      => 'Passionnée par le développement web, je conçois des applications robustes et élégantes. Actuellement en Master 1 Génie Logiciel à l\'ISI Dakar.',
                'email'    => 'abydiop0324@gmail.com',
                'phone'    => '+221 77 766 05 40',
                'location' => 'Dakar, Sénégal',
                'skills'   => [
                    ['category' => 'Langages',          'items' => ['PHP', 'C#', 'Java', 'C/C++']],
                    ['category' => 'Développement Web', 'items' => ['Laravel', 'Angular', 'ASP.NET MVC', 'HTML5', 'CSS3', 'Bootstrap']],
                    ['category' => 'Bases de données',  'items' => ['PostgreSQL', 'MySQL', 'SQL Server', 'Oracle']],
                    ['category' => 'Outils',            'items' => ['Git/GitHub', 'Figma', 'Jira', 'VS Code', 'PHPStorm']],
                ],
                'education' => [
                    ['year' => 'En cours',    'degree' => 'Master 1 Génie Logiciel',                          'school' => 'Institut Supérieur d\'Informatique — Dakar'],
                    ['year' => '2022–2025',   'degree' => 'Licence Génie Logiciel',                           'school' => 'Institut Supérieur d\'Informatique — Dakar'],
                    ['year' => '2022–2024',   'degree' => 'BTS Informatique de Gestion · Mention Assez Bien', 'school' => 'Institut Supérieur d\'Informatique — Dakar'],
                    ['year' => '2019',        'degree' => 'Baccalauréat Scientifique S2',                     'school' => 'Lycée Pikine Est — Dakar'],
                ],
                'soft_skills' => ['Esprit d\'équipe', 'Apprentissage rapide', 'Organisation & rigueur', 'Sens de l\'écoute'],
            ]
        );

        // ── Créer les projets initiaux ──
        $projects = [
            [
                'title'       => 'Circuit court alimentaire',
                'description' => 'Plateforme de mise en relation entre producteurs locaux et consommateurs. Gestion des produits, commandes, livraisons et profils utilisateurs.',
                'emoji'       => '🌿', 'bg_color' => '#f0fdf4',
                'tags'        => ['Angular', 'Laravel', 'PostgreSQL', 'REST API'],
                'type'        => 'Solo', 'order' => 1,
            ],
            [
                'title'       => 'Gestion de boulangerie',
                'description' => 'Application collaborative de gestion des produits, commandes et utilisateurs. Réalisée en équipe avec méthodologie agile et suivi sur Jira.',
                'emoji'       => '🥖', 'bg_color' => '#fffbeb',
                'tags'        => ['Laravel', 'Angular', 'PostgreSQL', 'Jira'],
                'type'        => 'Collaboratif', 'order' => 2,
            ],
            [
                'title'       => 'Gestion des ressources humaines',
                'description' => 'Gestion des employés, tâches, départements et responsables avec tableau de bord administrateur complet.',
                'emoji'       => '👥', 'bg_color' => '#eff6ff',
                'tags'        => ['ASP.NET MVC', 'Angular', 'SQL Server'],
                'type'        => 'Solo', 'order' => 3,
            ],
            [
                'title'       => 'P3J Sénégal — Bourses d\'études',
                'description' => 'Site web centralisant les offres de bourses d\'études pour les jeunes sénégalais. Opportunités locales et internationales.',
                'emoji'       => '🎓', 'bg_color' => '#fdf4ff',
                'tags'        => ['Web', 'Bourses', 'Éducation'],
                'live_url'    => 'https://p3jsenegal.com',
                'type'        => 'Collaboratif', 'order' => 4,
            ],
            [
                'title'       => 'GestiCom — Gestion commerciale',
                'description' => 'Application SaaS pour petits commerçants au Sénégal. Suivi des stocks, ventes et finances. Abonnement à 10 000 FCFA/mois.',
                'emoji'       => '🛍️', 'bg_color' => '#fff7ed',
                'tags'        => ['Laravel', 'Angular', 'PostgreSQL', 'SaaS'],
                'type'        => 'Solo', 'order' => 5,
            ],
        ];

        foreach ($projects as $p) {
            Project::create($p);
        }
    }
}
