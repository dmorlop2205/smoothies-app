<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')->group(function () {
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);

    Route::middleware('auth:sanctum')->post('logout', [AuthController::class, 'logout']);
});

Route::prefix('users')->group(function () {
    Route::get('suggested', [UserController::class, 'suggested']);
    Route::get('{user}', [UserController::class, 'show']);
    Route::get('{user}/followers', [UserController::class, 'followers']);
    Route::get('{user}/following', [UserController::class, 'following']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::put('{user}', [UserController::class, 'update']);
        Route::post('{user}/follow', [UserController::class, 'follow']);
        Route::delete('{user}/follow', [UserController::class, 'unfollow']);
    });
});

Route::prefix('posts')->group(function () {
    Route::get('/', [PostController::class, 'index']);
    Route::get('{post}', [PostController::class, 'show']);

    Route::prefix('{post}/comments')->group(function () {
        Route::get('/', [CommentController::class, 'index']);

        Route::middleware('auth:sanctum')->group(function () {
            Route::post('/', [CommentController::class, 'store']);
            Route::delete('{comment}', [CommentController::class, 'destroy']);
        });
    });

    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/', [PostController::class, 'store']);
        Route::put('{post}', [PostController::class, 'update']);
        Route::delete('{post}', [PostController::class, 'destroy']);
    });
});

Route::get('tags', [TagController::class, 'index']);
Route::get('tags/{tag}/posts', [PostController::class, 'byTag']);

Route::middleware('auth:sanctum')->post('likes', [LikeController::class, 'toggle']);
