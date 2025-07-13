import React from 'react'
import musics from '../config/musics.json'
import type { MusicElement } from '../config/types.ts'
import { getTodaySong } from '../config/seededRng.ts'

export interface HeardleContextProps {
	currentMusic: MusicElement,
	allMusics: MusicElement[]
}

const Context = React.createContext<HeardleContextProps>({} as HeardleContextProps)

export const useHeardleContext = () => React.useContext(Context)

const HeardleContext = ({ children }: React.PropsWithChildren) => {
	const allMusics = musics as MusicElement[]
	const currentMusic = getTodaySong(allMusics)

	return (
		<Context.Provider
			value={{
				currentMusic,
				allMusics
			}}
		>
			{children}
		</Context.Provider>
	)
}

export default HeardleContext
