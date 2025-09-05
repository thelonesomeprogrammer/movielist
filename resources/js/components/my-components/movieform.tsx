// resources/js/Components/MovieForm.tsx

import React from "react";
import { useForm } from "@inertiajs/react";
import { Movie } from "@/types/movie";

interface MovieFormProps {
	movie: Movie | undefined;
	onSuccess: () => void;
}

export default function MovieForm({ movie, onSuccess }: MovieFormProps) {
	const { data, setData, post, put, processing, errors } = useForm({
		title: movie?.title || "",
		description: movie?.overview ? movie.overview : "",
		release_date: movie?.release_date ? movie.release_date : "",
		popularity: movie?.popularity ? movie.popularity : "",
		poster_path: movie?.poster_path ? movie.poster_path : "",
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (movie) {
			put(`/dashboard/movies/${movie.id}`, { onSuccess });
		} else {
			post("/dashboard/movies", { onSuccess });
		}
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<h2 className="text-xl font-semibold mb-4">
				{movie ? "Edit Movie" : "Create New Movie"}
			</h2>

			<div>
				<label
					htmlFor="title"
					className="block text-sm font-medium text-gray-700 mb-1"
				>
					Title
				</label>
				<input
					type="text"
					id="title"
					value={data.title}
					onChange={(e) => setData("title", e.target.value)}
					className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
					required
				/>
				{errors.title && (
					<p className="mt-1 text-sm text-red-600">{errors.title}</p>
				)}
			</div>

			<div>
				<label
					htmlFor="description"
					className="block text-sm font-medium text-gray-700 mb-1"
				>
					Description
				</label>
				<textarea
					id="description"
					value={data.description}
					onChange={(e) => setData("description", e.target.value)}
					rows={3}
					className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
					required
				/>
				{errors.description && (
					<p className="mt-1 text-sm text-red-600">{errors.description}</p>
				)}
			</div>

			<div className="grid grid-cols-2 gap-4">
				<div>
					<label
						htmlFor="release_date"
						className="block text-sm font-medium text-gray-700 mb-1"
					>
						Release Year
					</label>
					<input
						type="text"
						id="release_date"
						value={data.release_date}
						onChange={(e) => setData("release_date", e.target.value)}
						className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
						required
					/>
					{errors.release_date && (
						<p className="mt-1 text-sm text-red-600">{errors.release_date}</p>
					)}
				</div>
			</div>
			<div className="flex justify-end pt-4">
				<button
					type="submit"
					disabled={processing}
					className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50"
				>
					{processing ? "Saving..." : movie ? "Update Movie" : "Create Movie"}
				</button>
			</div>
		</form>
	);
}
