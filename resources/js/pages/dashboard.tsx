// resources/js/Pages/Dashboard.tsx

import React, { useState, useEffect } from "react";
import { Head, Link, router } from "@inertiajs/react";
import Modal from "@/components/my-components/modal";
import UserForm from "@/components/my-components/userform";
import MovieForm from "@/components/my-components/movieform";
import { User } from "@/types/index";
import { Movie } from "@/types/movie";
import { PageProps } from "@/types";

interface DashboardProps extends PageProps {
	tab?: string;
}

export default function Dashboard({ tab }: DashboardProps) {
	const [activeTab, setActiveTab] = useState<"overview" | "users" | "movies">(
		tab == "users" || tab == "movies" ? tab : "overview",
	);
	const [search, setSearch] = useState("");
	const [users, setUsers] = useState<User[]>([]);
	const [movies, setMovies] = useState<Movie[]>([]);
	const [showUserModal, setShowUserModal] = useState(false);
	const [showMovieModal, setShowMovieModal] = useState(false);
	const [editingUser, setEditingUser] = useState<User | undefined>();
	const [editingMovie, setEditingMovie] = useState<Movie | undefined>();

	useEffect(() => {
		// Fetch users and movies data when the component mounts or activeTab changes
		if (users.length === 0 && movies.length === 0) {
			fetch("/api/users")
				.then((res) => res.json())
				.then((data) => setUsers(data));
			fetch("/api/movies")
				.then((res) => res.json())
				.then((data) => setMovies(data));
		}
		if (activeTab === "users") {
			fetch("/api/users")
				.then((res) => res.json())
				.then((data) => setUsers(data));
		} else if (activeTab === "movies") {
			fetch("/api/movies")
				.then((res) => res.json())
				.then((data) => setMovies(data));
		}
	}, [activeTab]);

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		if (activeTab === "users") {
			fetch(`/api/users?q=${search}`)
				.then((res) => res.json())
				.then((data) => setUsers(data));
		} else if (activeTab === "movies") {
			fetch(`/api/movies?q=${search}`)
				.then((res) => res.json())
				.then((data) => setMovies(data));
		}
	};

	const handleDeleteUser = (id: number) => {
		if (confirm("Are you sure you want to delete this user?")) {
			router.delete(`/dashboard/users/${id}`, {
				preserveState: true,
				preserveScroll: true,
			});
		}
	};

	const handleDeleteMovie = (id: number) => {
		if (confirm("Are you sure you want to delete this movie?")) {
			router.delete(`/dashboard/movies/${id}`, {
				preserveState: true,
				preserveScroll: true,
			});
		}
	};

	const handleEditUser = (user: User) => {
		setEditingUser(user);
		setShowUserModal(true);
	};

	const handleEditMovie = (movie: Movie) => {
		setEditingMovie(movie);
		setShowMovieModal(true);
	};

	const closeUserModal = () => {
		setShowUserModal(false);
		setEditingUser(undefined);
	};

	const closeMovieModal = () => {
		setShowMovieModal(false);
		setEditingMovie(undefined);
	};

	return (
		<>
			<Head title="Dashboard" />
			<div className="min-h-screen bg-gray-100">
				{/* Tab Navigation */}
				<div className="bg-white border-b">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="flex space-x-8">
							{(["overview", "users", "movies"] as const).map((tab) => (
								<button
									key={tab}
									onClick={() => {
										setActiveTab(tab);
										router.get(
											"/admin/dashboard",
											{ tab },
											{ preserveState: true },
										);
									}}
									className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
										activeTab === tab
											? "border-indigo-500 text-indigo-600"
											: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
									}`}
								>
									{tab}
								</button>
							))}
						</div>
					</div>
				</div>

				{/* Main Content */}
				<main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
					{/* Overview Tab */}
					{activeTab == "overview" && (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
							{/* Overview Cards */}
							{/* Users */}
							<div className="bg-white rounded-lg shadow p-6">
								<div className="flex items-center">
									<div className="flex-1">
										<p className="text-sm text-gray-600">Total Users</p>
										<p className="text-2xl font-semibold text-gray-900">
											{users.length}
										</p>
									</div>
									<div className="p-3 bg-blue-100 rounded-full">
										<svg
											className="w-6 h-6 text-blue-600"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
											/>
										</svg>
									</div>
								</div>
							</div>
							{/* Movies */}
							<div className="bg-white rounded-lg shadow p-6">
								<div className="flex items-center">
									<div className="flex-1">
										<p className="text-sm text-gray-600">Total Movies</p>
										<p className="text-2xl font-semibold text-gray-900">
											{movies.length}
										</p>
									</div>
									<div className="p-3 bg-green-100 rounded-full">
										<svg
											className="w-6 h-6 text-green-600"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M7 4v16M17 4v16M3 8h4m10 0h4M3 16h4m10 0h4"
											/>
										</svg>
									</div>
								</div>
							</div>
							{/* Recent Users */}
							<div className="bg-white rounded-lg shadow p-6">
								<div className="flex items-center">
									<div className="flex-1">
										<p className="text-sm text-gray-600">New Users (30d)</p>
										<p className="text-2xl font-semibold text-gray-900">
											{"recent_users"}
										</p>
									</div>
									<div className="p-3 bg-purple-100 rounded-full">
										<svg
											className="w-6 h-6 text-purple-600"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
											/>
										</svg>
									</div>
								</div>
							</div>
							{/* Recent Movies */}
							<div className="bg-white rounded-lg shadow p-6">
								<div className="flex items-center">
									<div className="flex-1">
										<p className="text-sm text-gray-600">New Movies (30d)</p>
										<p className="text-2xl font-semibold text-gray-900">
											{"recent_movies"}
										</p>
									</div>
									<div className="p-3 bg-yellow-100 rounded-full">
										<svg
											className="w-6 h-6 text-yellow-600"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M12 6v6m0 0v6m0-6h6m-6 0H6"
											/>
										</svg>
									</div>
								</div>
							</div>
						</div>
					)}

					{/* Users Tab */}
					{activeTab === "users" && (
						<div className="bg-white rounded-lg shadow">
							<div className="p-6">
								<div className="flex justify-between items-center mb-6">
									<h2 className="text-xl font-semibold text-gray-900">
										Users Management
									</h2>
									<button
										onClick={() => setShowUserModal(true)}
										className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
									>
										Add New User
									</button>
								</div>

								<form onSubmit={handleSearch} className="mb-6">
									<div className="flex gap-4">
										<input
											type="text"
											value={search}
											onChange={(e) => setSearch(e.target.value)}
											placeholder="Search by username or name..."
											className="flex-1 rounded-md border-gray-300 shadow-sm"
										/>
										<button
											type="submit"
											className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
										>
											Search
										</button>
									</div>
								</form>

								<div className="overflow-x-auto">
									<table className="min-w-full divide-y divide-gray-200">
										<thead className="bg-gray-50">
											<tr>
												<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
													ID
												</th>
												<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
													Name
												</th>
												<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
													Email
												</th>
												<th className="px-6 py-3"></th>
											</tr>
										</thead>
										<tbody className="divide-y divide-gray-200">
											{users.map((user: User) => (
												<tr key={user.id}>
													<td className="px-6 py-4">{user.id}</td>
													<td className="px-6 py-4">{user.name}</td>
													<td className="px-6 py-4 space-x-2">
														<button
															onClick={() => handleEditUser(user)}
															className="text-indigo-600 hover:text-indigo-900"
														>
															Edit
														</button>
														<button
															onClick={() => handleDeleteUser(user.id)}
															className="text-red-600 hover:text-red-900"
														>
															Delete
														</button>
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</div>
						</div>
					)}

					{/* Movies Tab */}
					{activeTab === "movies" && (
						<div className="bg-white rounded-lg shadow">
							<div className="p-6">
								<div className="flex justify-between items-center mb-6">
									<h2 className="text-xl font-semibold text-gray-900">
										Movies Management
									</h2>
									<button
										onClick={() => setShowMovieModal(true)}
										className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
									>
										Add New Movie
									</button>
								</div>

								<form onSubmit={handleSearch} className="mb-6">
									<div className="flex gap-4">
										<input
											type="text"
											value={search}
											onChange={(e) => setSearch(e.target.value)}
											placeholder="Search by movie title..."
											className="flex-1 rounded-md border-gray-300 shadow-sm"
										/>
										<button
											type="submit"
											className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
										>
											Search
										</button>
									</div>
								</form>

								<div className="overflow-x-auto">
									<table className="min-w-full divide-y divide-gray-200">
										<thead className="bg-gray-50">
											<tr>
												<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
													ID
												</th>
												<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
													Title
												</th>
												<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
													Genre
												</th>
												<th className="px-6 py-3"></th>
											</tr>
										</thead>
										<tbody className="divide-y divide-gray-200">
											{movies.map((movie: Movie) => (
												<tr key={movie.id}>
													<td className="px-6 py-4">{movie.id}</td>
													<td className="px-6 py-4">{movie.title}</td>
													<td className="px-6 py-4 space-x-2">
														<button
															onClick={() => handleEditMovie(movie)}
															className="text-indigo-600 hover:text-indigo-900"
														>
															Edit
														</button>
														<button
															onClick={() => handleDeleteMovie(movie.id)}
															className="text-red-600 hover:text-red-900"
														>
															Delete
														</button>
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</div>
						</div>
					)}
				</main>
			</div>

			{/* User Modal */}
			<Modal show={showUserModal} onClose={closeUserModal}>
				<UserForm user={editingUser} onSuccess={closeUserModal} />
			</Modal>

			{/* Movie Modal */}
			<Modal show={showMovieModal} onClose={closeMovieModal}>
				<MovieForm movie={editingMovie} onSuccess={closeMovieModal} />
			</Modal>
		</>
	);
}
