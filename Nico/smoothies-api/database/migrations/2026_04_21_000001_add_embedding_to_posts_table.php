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
            DB::statement('ALTER TABLE posts ADD COLUMN embedding vector(768)');
        } catch (\Exception $e) {
            // pgvector not available — skip
        }
    }

    public function down(): void
    {
        try {
            Schema::table('posts', function (Blueprint $table) {
                $table->dropColumn('embedding');
            });
        } catch (\Exception $e) {
            //
        }
    }
};
