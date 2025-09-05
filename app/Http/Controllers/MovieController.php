<?php

namespace App\Http\Controllers;

use App\Models\Movie;
use Illuminate\Http\Request;

class MovieController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // see if there is a query parameter 'q' for searching
        if ($request->has('q')) {
            $query = $request->input('q');
            $movies = Movie::where('title', 'like', '%' . $query . '%')->get();
            return response()->json($movies);
        }
        $movies = Movie::all();
        return response()->json($movies);
    }

    public function list(Request $request)
    {
        $seen = $request->input('seen', 'false') === 'true';
        $movies = Movie::where('seen', $seen)->get();
        return response()->json($movies);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = $request->user();
        $movie = new Movie();
        $movie->title = $request->input('title');
        $movie->release_date = $request->input('release_date');
        //$movie->genre = $request->input('genre');
        $movie->popularity = $request->input('popularity');
        $movie->overview = $request->input('overview');
        $movie->poster_path = $request->input('poster_path');
        $movie->tmdb_id = $request->input('tmdb_id');
        $movie->user_id = $user->id;

        // check if a movie with the same TMDB_id already exists
        $existingMovie = Movie::where('tmdb_id', $movie->tmdb_id)->first();
        if ($existingMovie) {
            return response()->json(['message' => 'Movie with this TMDB_id already exists'], 409);
        }

        $movie->save();
    }

    /**
     * Display the specified resource.
     */
    public function show(Movie $movie)
    {
        return response()->json($movie);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Movie $movie)
    {
        $movie->title = $request->input('title', $movie->title);
        $movie->release_date = $request->input('release_date', $movie->release_date);
        $movie->popularity = $request->input('popularity', $movie->popularity);
        $movie->overview = $request->input('overview', $movie->overview);
        $movie->poster_path = $request->input('poster_path', $movie->poster_path);
        $movie->tmdb_id = $request->input('tmdb_id', $movie->tmdb_id);
        $movie->seen = $request->input('seen', $movie->seen);
        $movie->save();
        return response()->json($movie);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Movie $movie)
    {
        $movie->delete();
        return response()->json(null, 204);
    }
}
