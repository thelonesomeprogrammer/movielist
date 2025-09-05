// resources/js/Components/Modal.tsx
import React, { Fragment, ReactNode } from "react";
import { Transition } from "@headlessui/react";

interface ModalProps {
	show: boolean;
	onClose: () => void;
	children: ReactNode;
	maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl";
}

export default function Modal({
	show,
	onClose,
	children,
	maxWidth = "md",
}: ModalProps) {
	const maxWidthClass = {
		sm: "sm:max-w-sm",
		md: "sm:max-w-md",
		lg: "sm:max-w-lg",
		xl: "sm:max-w-xl",
		"2xl": "sm:max-w-2xl",
	}[maxWidth];

	return (
		<Transition show={show} as={Fragment}>
			<div className="fixed inset-0 z-50 overflow-y-auto">
				<div className="flex min-h-full items-center justify-center p-4 text-center">
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div
							className="fixed inset-0 bg-black bg-opacity-25"
							onClick={onClose}
						/>
					</Transition.Child>

					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0 scale-95"
						enterTo="opacity-100 scale-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100 scale-100"
						leaveTo="opacity-0 scale-95"
					>
						<div
							className={`relative transform overflow-hidden rounded-lg bg-white p-6 text-left shadow-xl transition-all w-full ${maxWidthClass}`}
						>
							<div className="absolute right-4 top-4">
								<button
									onClick={onClose}
									className="text-gray-400 hover:text-gray-500"
								>
									<svg
										className="h-6 w-6"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M6 18L18 6M6 6l12 12"
										/>
									</svg>
								</button>
							</div>
							{children}
						</div>
					</Transition.Child>
				</div>
			</div>
		</Transition>
	);
}
