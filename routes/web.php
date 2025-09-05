<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Request;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('list', ['seen' => false]);
})->name('home');

Route::get('/seen', function () {
    return Inertia::render('list', ['seen' => true]);
})->name('seen');


Route::get('/api/list', [App\Http\Controllers\MovieController::class, 'list']);


Route::middleware(['auth', 'verified'])->group(function () {

    Route::apiResource('api/movies', App\Http\Controllers\MovieController::class);

    Route::get('/search', function () {
        return Inertia::render('search');
    })->name('search');

    Route::get('/api/search', function (Request $request) {
        $query = $request->input('q');

        if (!$query) {
            return response()->json(["results" => "no query provided"], 400);
        }

        $cacheKey = "tmdb_search_v" . md5($query);

        // Cache for 24 hours
        $results = Cache::remember($cacheKey, 60 * 24, function () use ($query) {
            $apiKey = env('TMDB_API_KEY');

            $response = Http::withHeaders([
                'Authorization' => "Bearer {$apiKey}",
                'accept' => 'application/json',
            ])->get("https://api.themoviedb.org/3/search/movie", [
                'query' => $query,
                'include_adult' => 'false',
                'language' => 'en-US',
                'page' => 1,
            ]);

            return $response->json()['results'] ?? ["e" => "no results found"];
        });

        return response()->json($results);
    });
});

Route::middleware(['auth', 'verified', 'role:admin'])->group(function () {
    Route::get('/admin/dashboard', function (Request $request) {
        $tab = $request->query('tab', 'overview');
        return Inertia::render('dashboard', ['tab' => $tab]);
    })->name('admin.dashboard');

    Route::apiResource('api/users', App\Http\Controllers\UserController::class);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
