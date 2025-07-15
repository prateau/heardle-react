import React from 'react'
import musics from '../config/musics.json'
import type { GameState, MusicElement } from '../config/types.ts'
import { getTodaySong } from './seededRng.ts'
import { HEARDLE_SPLITS } from '../config/consts.ts'
import { sortMusicById } from '../config/utils.ts'

export interface HeardleContextProps {
	currentMusic: MusicElement,
	allMusics: MusicElement[],
	gameState: GameState,
	guessMusic: (musicId?: number) => void
}

const Context = React.createContext<HeardleContextProps>({} as HeardleContextProps)

export const useHeardleContext = () => React.useContext(Context)

const BASE_GAME_STATE = {
	isFinished: false,
	attempts: []
}

const HeardleContext = ({ children }: React.PropsWithChildren) => {
	const [gameState, setGameState] = React.useState<GameState>(BASE_GAME_STATE)

	const allMusics = (musics as MusicElement[]).sort(sortMusicById)
	const currentMusic = getTodaySong(allMusics)

	const guessMusic = (musicId?: number) => {
		setGameState(old => ({
			attempts: [...old.attempts, musicId],
			isFinished: (musicId === currentMusic.id || old.attempts.length + 1 >= HEARDLE_SPLITS.length)
		}))
	}

	return (
		<Context.Provider
			value={{
				currentMusic,
				allMusics,
				gameState,
				guessMusic
			}}
		>
			{children}
		</Context.Provider>
	)
}

export default HeardleContext
