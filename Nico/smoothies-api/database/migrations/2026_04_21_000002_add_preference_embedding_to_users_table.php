<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        try {
            DB::statement('ALTER TABLE users ADD COLUMN preference_embedding vector(768)');
        } catch (\Exception $e) {
            // pgvector not available — skip
        }
    }

    public function down(): void
    {
        try {
            Schema::table('users', function (Blueprint $table) {
                $table->dropColumn('preference_embedding');
            });
        } catch (\Exception $e) {
            //
        }
    }
};
