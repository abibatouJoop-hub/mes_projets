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
        Schema::create('projects', function (Blueprint $t) {
            $t->id();
            $t->string('title');
            $t->text('description');
            $t->string('emoji')->default('🚀');
            $t->string('bg_color')->default('#f0fdf4');
            $t->json('tags')->nullable();
            $t->string('github_url')->nullable();
            $t->string('live_url')->nullable();
            $t->enum('type', ['Solo', 'Collaboratif'])->default('Solo');
            $t->boolean('is_visible')->default(true);
            $t->integer('order')->default(0);
            $t->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
