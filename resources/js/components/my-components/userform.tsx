// resources/js/Components/UserForm.tsx

import React from "react";
import { useForm } from "@inertiajs/react";
import { User } from "@/types/index";

interface UserFormProps {
	user: User | undefined;
	onSuccess: () => void;
}

export default function UserForm({ user, onSuccess }: UserFormProps) {
	const { data, setData, post, put, processing, errors, reset } = useForm({
		name: user?.name || "",
		password: "",
		password_confirmation: "",
		role: user?.role || "user",
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (user) {
			put(`/dashboard/users/${user.id}`, {
				onSuccess: () => {
					reset("password", "password_confirmation");
					onSuccess();
				},
			});
		} else {
			post("/dashboard/users", {
				onSuccess: () => {
					reset();
					onSuccess();
				},
			});
		}
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<h2 className="text-xl font-semibold mb-4">
				{user ? "Edit User" : "Create New User"}
			</h2>

			<div>
				<label
					htmlFor="name"
					className="block text-sm font-medium text-gray-700 mb-1"
				>
					Name
				</label>
				<input
					type="text"
					id="name"
					value={data.name}
					onChange={(e) => setData("name", e.target.value)}
					className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
					required
				/>
				{errors.name && (
					<p className="mt-1 text-sm text-red-600">{errors.name}</p>
				)}
			</div>

			<div>
				<label
					htmlFor="password"
					className="block text-sm font-medium text-gray-700 mb-1"
				>
					Password {user && "(leave blank to keep current)"}
				</label>
				<input
					type="password"
					id="password"
					value={data.password}
					onChange={(e) => setData("password", e.target.value)}
					className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
					required={!user}
				/>
				{errors.password && (
					<p className="mt-1 text-sm text-red-600">{errors.password}</p>
				)}
			</div>

			<div>
				<label
					htmlFor="password_confirmation"
					className="block text-sm font-medium text-gray-700 mb-1"
				>
					Confirm Password
				</label>
				<input
					type="password"
					id="password_confirmation"
					value={data.password_confirmation}
					onChange={(e) => setData("password_confirmation", e.target.value)}
					className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
					required={!user}
				/>
			</div>

			<div>
				<label
					htmlFor="role"
					className="block text-sm font-medium text-gray-700 mb-1"
				>
					Role
				</label>
				<select
					id="role"
					value={data.role}
					onChange={(e) => setData("role", e.target.value as "admin" | "user")}
					className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
				>
					<option value="user">User</option>
					<option value="admin">Admin</option>
				</select>
				{errors.role && (
					<p className="mt-1 text-sm text-red-600">{errors.role}</p>
				)}
			</div>

			<div className="flex justify-end pt-4">
				<button
					type="submit"
					disabled={processing}
					className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50"
				>
					{processing ? "Saving..." : user ? "Update User" : "Create User"}
				</button>
			</div>
		</form>
	);
}
