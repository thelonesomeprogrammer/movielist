import { useState, useEffect, ReactElement } from "react";
import { Button } from "@/components/ui/button";
import { Movie } from "@/types/movie";
import MovieCard from "@/components/my-components/moviecard";

export default function MovieSearch() {
	const [query, setQuery] = useState<string>("");
	const [results, setResults] = useState<Movie[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [loadingAdd, setLoadingAdd] = useState<boolean>(false);

	const searchMovies = () => {
		fetch(`/api/search?q=${query}`)
			.then((res) => res.json())
			.then((res) => setResults(res || []))
			.catch((err) => console.error(err));

		setLoading(false);
	};

	const setWaiting = (state: boolean) => {
		setLoadingAdd(state);
	};

	return (
		<div className="p-6 max-w-4xl mx-auto">
			<div className="flex gap-2 mb-6">
				<input
					type="text"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					className="flex-grow p-2 border rounded-xl"
					placeholder="Search TMDb..."
				/>
				<Button onClick={searchMovies} disabled={loading}>
					{loading ? "Searching..." : "Search"}
				</Button>
			</div>

			<div className="grid gap-4 mb-10">
				{results.map((movie) => (
					<MovieCardAdd
						key={movie.id}
						movie={movie}
						waiting={loadingAdd}
						setWaiting={setWaiting}
					/>
				))}
			</div>
		</div>
	);
}

enum loadingState {
	Idle,
	Waiting,
	Adding,
	Added,
	Error,
}

function MovieCardAdd({
	movie,
	waiting,
	setWaiting,
}: {
	movie: Movie;
	waiting: Boolean;
	setWaiting: (state: boolean) => void;
}) {
	const [loadingAdd, setLoadingAdd] = useState<loadingState>(loadingState.Idle);
	useEffect(() => {
		if (loadingAdd === loadingState.Added) {
			setTimeout(() => {
				setLoadingAdd(loadingState.Idle);
			}, 2000);
		}
	}, [loadingAdd]);
	useEffect(() => {
		if (waiting) {
			setLoadingAdd(loadingState.Waiting);
		} else if (loadingAdd === loadingState.Waiting) {
			setLoadingAdd(loadingState.Idle);
		}
	}, [waiting]);

	const addToList = async (movie: Movie) => {
		setLoadingAdd(loadingState.Adding);
		setWaiting(true);
		try {
			const entry = {
				tmdb_id: movie.id.toString(),
				title: movie.title,
				overview: movie.overview,
				release_date: movie.release_date,
				popularity: movie.popularity,
				poster_path: movie.poster_path,
			};

			const token = document.cookie
				.split("; ")
				.find((row) => row.startsWith("XSRF-TOKEN="))
				?.split("=")[1];

			const [res, _] = await Promise.all([
				fetch(`/api/movies`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Accept: "application/json",
						"X-XSRF-TOKEN": decodeURIComponent(token || ""),
					},
					body: JSON.stringify(entry),
				}),
				new Promise((resolve) => setTimeout(resolve, 1000)),
			]);
			if (!res.ok) {
				const errorData = await res.json();
				alert(`Error: ${errorData.message || "Failed to add movie"}`);
				setLoadingAdd(loadingState.Error);
			} else {
				setLoadingAdd(loadingState.Added);
			}
			setWaiting(false);
		} catch (e) {
			console.error(e);
			alert("Error saving to list");
		}
	};

	const btnStyle = "w-full md:w-auto mt-2 md:mt-0";

	const renderButton: Record<loadingState, ReactElement> = {
		[loadingState.Idle]: (
			<Button className={btnStyle} onClick={() => addToList(movie)}>
				Add to List
			</Button>
		),
		[loadingState.Waiting]: (
			<Button className={btnStyle} disabled>
				⏳ Waiting...
			</Button>
		),
		[loadingState.Adding]: (
			<Button className={btnStyle} disabled>
				➕ Adding...
			</Button>
		),
		[loadingState.Added]: (
			<Button className={btnStyle} disabled>
				✅ Added!
			</Button>
		),
		[loadingState.Error]: (
			<Button className={btnStyle} onClick={() => addToList(movie)}>
				Retry
			</Button>
		),
	};

	return <MovieCard movie={movie} button={renderButton[loadingAdd]} />;
}
