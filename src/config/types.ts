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

export type GameState = {
	date: string,
	response: number,
	attempts: (number | undefined)[]
}

// For soundcloud widget API
declare global {
	interface Window {
		SC?: any;
	}
}
