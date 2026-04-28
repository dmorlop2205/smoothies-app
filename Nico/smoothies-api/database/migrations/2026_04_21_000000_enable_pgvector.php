<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        try {
            DB::statement('CREATE EXTENSION IF NOT EXISTS vector');
        } catch (\Exception $e) {
            // pgvector not installed on this system — skip silently
        }
    }

    public function down(): void
    {
        try {
            DB::statement('DROP EXTENSION IF EXISTS vector');
        } catch (\Exception $e) {
            //
        }
    }
};
