const SEED = 514441011
const START_DATE = "2024-02-03"; // Original Start Date, used to know the current heardle

// seeded random algorithm
const mulberry32 = (step: number): number => {
	let t = SEED + step * 0x6d2b79f5
	t = Math.imul(t ^ (t >>> 15), t | 1)
	t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
	return ((t ^ (t >>> 14)) >>> 0) / 4294967296
}

const getDiffFromToday = (): number => {
	const startDate = new Date(START_DATE)
	const today = new Date()

	const diffInMilliseconds = today.getTime() - startDate.getTime()
	return Math.round(diffInMilliseconds / (1000 * 60 * 60 * 24))
}

// array shuffling with Fisher–Yates Shuffle
const shuffleArray = <T> (array: T[]): T[] => {
	const baseRngStep = Math.floor(getDiffFromToday() / array.length)
	let i = array.length, j = 0
	let temp
	while (i--) {
		// get unique rng value
		const actualRngStep = baseRngStep * array.length + i
		// pick a remaining element
		j = Math.floor(mulberry32(actualRngStep) * (i + 1))
		// swap it with the current element
		temp = array[i]
		array[i] = array[j]
		array[j] = temp
	}
	return array
}

export const getTodaySong = <T> (array: T[]): T => (
	shuffleArray(array)[getDiffFromToday() % array.length]
)
