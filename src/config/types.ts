export type MusicElement = {
	id: number,
	url: string
}

// For soundcloud widget API
declare global {
	interface Window {
		SC?: any;
	}
}
