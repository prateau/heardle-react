export type MusicElement = {
	id: number,
	url: string,
	name: {
		[langKey: string]: string
	},
	category: {
		[langKey: string]: string
	}
}

// For soundcloud widget API
declare global {
	interface Window {
		SC?: any;
	}
}
