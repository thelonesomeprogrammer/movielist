# MovieList

A web application for keeping a common watchlist for movies.

## Overview

MovieList is a self-hosted web application that allows users to maintain a shared watchlist for movies. Built with React, TypeScript, and Laravel, it provides a collaborative space for groups to track movies they want to watch together.

## Features

- **Shared Movie Watchlist**: Create and maintain a common list of movies to watch
- **Movie Management**: Add, remove, and mark movies as watched
- **Web-Based Interface**: Access your watchlist from any browser

## Tech Stack

- **Frontend**: React.js with TypeScript
- **Backend**: PHP/Laravel
- **SSR**: Server-side rendering for improved performance

## Requirements

- PHP 8.0+
- Node.js 16+
- MySQL
- Composer

## Installation

1. Clone the repository
```bash
git clone https://github.com/thelonesomeprogrammer/movielist.git
cd movielist
```

2. Install PHP dependencies
```bash
composer install
```

3. Install JavaScript dependencies
```bash
npm install
```

4. Copy the environment file and configure your database
```bash
cp .env.example .env
```

5. Generate application key
```bash
php artisan key:generate
```

6. Run database migrations
```bash
php artisan migrate
```

7. Start the development server
```bash
php artisan serve
```

## Usage

1. Register a new account or log in
2. Add movies to your shared watchlist
3. Mark movies as watched when completed

## Future Plans

- Improve user interface
- movie avalability (where can you steam it)

## Contributing

Contributions are welcome. Please feel free to submit a Pull Request.

## License

This project is licensed under the GNU General Public License v3.0 (GPL-3.0).
