import { useState, useEffect, ReactElement } from "react";
import { ListEntry } from "@/types/movie";
import MovieCard from "@/components/my-components/moviecard";

interface MovieListProps {
	seen?: boolean;
}

export default function MovieList({ seen }: MovieListProps) {
	const [list, setList] = useState<ListEntry[]>([]);
	const [pickedMovie, setPickedMovie] = useState<ListEntry | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		fetch(`/api/list?seen=${seen ? "true" : "false"}`)
			.then((res) => res.json())
			.then(setList)
			.finally(() => setLoading(false))
			.catch(console.error);
	}, []);

	return (
		<div className="p-6 max-w-4xl mx-auto">
			<div className="flex mb-6 justify-between items-center">
				<h1 className="text-2xl font-bold">
					{seen ? "Seen Movies" : "Watch List"}
				</h1>
				{!seen ? (
					<button
						className="ml-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 px-4 py-2"
						onClick={() => {
							if (list.length === 0) {
								alert("Your list is empty. Add some movies first!");
								return;
							}
							const randomIndex = Math.floor(Math.random() * list.length);
							setPickedMovie(list[randomIndex]);
						}}
					>
						pick a movie to watch
					</button>
				) : null}
			</div>
			{/* Saved List */}
			{loading && <p>Loading...</p>}
			{!loading &&
				list.length === 0 &&
				(seen ? (
					<p>No seen movies yet. Better get started</p>
				) : (
					<p>No movies in your list yet. Go and find some</p>
				))}
			<ul className="grid gap-2">
				{list
					.filter(
						(item) =>
							(pickedMovie && item.id == pickedMovie?.id) || !pickedMovie,
					)
					.map((item) => (
						<li key={item.id}>
							<MovieListEntry
								movie={item}
								id={item.id}
								seen={seen}
								list={list}
								setList={setList}
							/>
						</li>
					))}
			</ul>
		</div>
	);
}

function MovieListEntry({
	movie,
	id,
	seen,
	list,
	setList,
}: {
	movie: ListEntry;
	id: number;
	seen: boolean | undefined;
	list: ListEntry[];
	setList: (list: ListEntry[]) => void;
}) {
	const btn_function = async () => {
		try {
			const token = document.cookie
				.split("; ")
				.find((row) => row.startsWith("XSRF-TOKEN="))
				?.split("=")[1];
			const res = await fetch(`/api/movies/${id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					"X-XSRF-TOKEN": decodeURIComponent(token || ""),
				},
				body: JSON.stringify({ seen: !seen }),
			});
			if (res.ok) {
				setList(list.filter((i) => i.id !== id));
			} else {
				const errorData = await res.json();
				alert(`Error: ${errorData.message || "Failed to mark as seen"}`);
			}
		} catch (e) {
			console.error(e);
			alert("Error marking as seen");
		}
	};

	const button: ReactElement = (
		<button
			className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
			onClick={btn_function}
		>
			{seen ? "Mark as unseen" : "Mark as Seen"}
		</button>
	);
	return <MovieCard movie={movie} button={button} />;
}
