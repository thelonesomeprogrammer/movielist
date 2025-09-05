import { login, register, home, search, logout, seen } from "@/routes";
import { type SharedData } from "@/types";
import { Head, Link, usePage } from "@inertiajs/react";
import { useState } from "react";

export default function Nav() {
	const { auth } = usePage<SharedData>().props;
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<Head title="Welcome">
				<link rel="preconnect" href="https://fonts.bunny.net" />
				<link
					href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
					rel="stylesheet"
				/>
			</Head>
			<header className="mb-6 w-full max-w-[335px] text-sm not-has-[nav]:hidden lg:max-w-4xl">
				<nav className="w-full px-2 py-3 bg-white shadow-sm border-b border-gray-100 fixed top-0 z-50">
					<div className="mx-auto flex justify-between items-center">
						<Link
							href={home()}
							className="text-2xl font-semibold text-gray-800 tracking-tight"
						>
							Movie List
						</Link>
						{/* desktop nav */}
						<div className="hidden md:flex flex gap-6 text-sm font-medium px-5">
							<Link
								href={home()}
								className="pb-1 transition-all duration-300 ease-in-out text-gray-500 hover:text-indigo-500 hover:border-b-2 hover:border-indigo-300"
							>
								movie list
							</Link>
							<Link
								href={seen()}
								className="pb-1 transition-all duration-300 ease-in-out text-gray-500 hover:text-indigo-500 hover:border-b-2 hover:border-indigo-300"
							>
								seen movies
							</Link>
							{auth.user ? (
								<>
									<Link
										href={search()}
										className="pb-1 transition-all duration-300 ease-in-out text-gray-500 hover:text-indigo-500 hover:border-b-2 hover:border-indigo-300"
									>
										add movies
									</Link>
									<Link
										href={logout()}
										className="pb-1 transition-all duration-300 ease-in-out text-gray-500 hover:text-indigo-500 hover:border-b-2 hover:border-indigo-300"
									>
										Log out
									</Link>
								</>
							) : (
								<>
									<Link
										href={login()}
										className="pb-1 transition-all duration-300 ease-in-out text-gray-500 hover:text-indigo-500 hover:border-b-2 hover:border-indigo-300"
									>
										Log in
									</Link>
									<Link
										href={register()}
										className="pb-1 transition-all duration-300 ease-in-out text-gray-500 hover:text-indigo-500 hover:border-b-2 hover:border-indigo-300"
									>
										Register
									</Link>
								</>
							)}
						</div>
						{/* mobile nav */}
						<div className="md:hidden flex items-center">
							<button
								onClick={() => setIsOpen(!isOpen)}
								className="text-gray-500 hover:text-indigo-500 focus:outline-none focus:text-indigo-500"
							>
								<svg
									className="h-6 w-6"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									{isOpen ? (
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M6 18L18 6M6 6l12 12"
										/>
									) : (
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M4 6h16M4 12h16M4 18h16"
										/>
									)}
								</svg>
							</button>
							{isOpen && (
								<div className="absolute top-16 left-0 w-full bg-white border-t border-gray-200 shadow-md">
									<div className="flex flex-col px-5 py-3 gap-3">
										<Link
											href={home()}
											className="pb-1 transition-all duration-300 ease-in-out text-gray-500 hover:text-indigo-500 hover:border-b-2 hover:border-indigo-300"
											onClick={() => setIsOpen(false)}
										>
											movie list
										</Link>
										<Link
											href={seen()}
											className="pb-1 transition-all duration-300 ease-in-out text-gray-500 hover:text-indigo-500 hover:border-b-2 hover:border-indigo-300"
											onClick={() => setIsOpen(false)}
										>
											seen movies
										</Link>
										{auth.user ? (
											<>
												<Link
													href={search()}
													className="pb-1 transition-all duration-300 ease-in-out text-gray-500 hover:text-indigo-500 hover:border-b-2 hover:border-indigo-300"
													onClick={() => setIsOpen(false)}
												>
													add movies
												</Link>
												<Link
													href={logout()}
													className="pb-1 transition-all duration-300 ease-in-out text-gray-500 hover:text-indigo-500 hover:border-b-2 hover:border-indigo-300"
													onClick={() => setIsOpen(false)}
												>
													Log out
												</Link>
											</>
										) : (
											<>
												<Link
													href={login()}
													className="pb-1 transition-all duration-300 ease-in-out text-gray-500 hover:text-indigo-500 hover:border-b-2 hover:border-indigo-300"
													onClick={() => setIsOpen(false)}
												>
													Log in
												</Link>
												<Link
													href={register()}
													className="pb-1 transition-all duration-300 ease-in-out text-gray-500 hover:text-indigo-500 hover:border-b-2 hover:border-indigo-300"
													onClick={() => setIsOpen(false)}
												>
													Register
												</Link>
											</>
										)}
									</div>
								</div>
							)}
						</div>
					</div>
				</nav>
			</header>
			<div className="h-16"></div>
		</>
	);
}
