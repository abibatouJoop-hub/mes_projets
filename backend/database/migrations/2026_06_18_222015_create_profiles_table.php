<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('profiles', function (Blueprint $t) {
            $t->id();
            $t->string('name');
            $t->string('tagline');
            $t->text('bio');
            $t->string('email');
            $t->string('phone')->nullable();
            $t->string('location')->nullable();
            $t->string('fiverr_url')->nullable();
            $t->string('github_url')->nullable();
            $t->string('linkedin_url')->nullable();
            $t->json('skills')->nullable();     // [{ category, items[] }]
            $t->json('education')->nullable();  // [{ year, degree, school }]
            $t->json('soft_skills')->nullable();
            $t->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('profiles');
    }
};
