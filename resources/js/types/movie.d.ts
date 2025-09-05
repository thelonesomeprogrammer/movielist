export interface ListEntry {
	id: number;
	tmdbId: number;
	title: string;
	release_date?: string;
	poster_path?: string;
	popularity?: number;
	overview?: string;
}

export interface Movie {
	id: number;
	title: string;
	release_date?: string;
	poster_path?: string;
	popularity?: number;
	overview?: string;
}
