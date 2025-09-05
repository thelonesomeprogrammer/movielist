import { ReactElement } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Movie } from "@/types/movie";

export default function MovieCard({
	movie,
	button,
}: {
	movie: Movie;
	button: ReactElement;
}) {
	return (
		<Card key={movie.id} className="flex gap-4 p-4 items-center">
			<CardContent className="flex gap-4 items-center w-full">
				{/* desktop view */}
				<div className="hidden md:flex flex-row justify-start items-center gap-4 w-full h-full">
					{movie.poster_path && (
						<img
							src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
							alt={movie.title}
							className="rounded-xl shadow-md"
						/>
					)}
					<div className="w-full h-full justify-center align-center flex flex-col">
						<div className="flex h-4/5 flex-col">
							<h2 className="text-lg font-semibold">{movie.title}</h2>
							<p className="text-sm text-gray-700 mb-2">
								release_date: {movie.release_date}
							</p>
							<p className="text-sm text-gray-700 mb-2">
								popularity: {movie.popularity}
							</p>
							<p className="text-sm text-gray-700 mb-2">
								overview: {movie.overview}
							</p>
						</div>
						{button}
					</div>
				</div>
				{/* mobile view */}
				<div className="flex flex-col justify-start items-center gap-4 w-full h-full md:hidden">
					{movie.poster_path && (
						<img
							src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
							alt={movie.title}
							className="rounded-xl shadow-md"
						/>
					)}
					<div className="w-full h-full justify-center align-center flex flex-col items-center text-center">
						<div className="flex flex-col">
							<h2 className="text-lg font-semibold">{movie.title}</h2>
							<p className="text-sm text-gray-700 mb-2">
								release_date: {movie.release_date}
							</p>
							<p className="text-sm text-gray-700 mb-2">
								popularity: {movie.popularity}
							</p>
							<p className="text-sm text-gray-700 mb-2">
								overview: {movie.overview}
							</p>
						</div>

						{button}
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
