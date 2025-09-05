<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Movie extends Model
{
    protected $fillable = ['title', 'release_date', 'popularity', 'overview', 'poster_path', "tmdb_id", 'seen' ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
