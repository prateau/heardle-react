import { LocalStorageKeys } from './consts'
import type { GameState, MusicElement } from './types'

export const sortMusicById = (music1: MusicElement, music2: MusicElement): number => music2.id - music1.id

export const getToday = (): string => {
	const today = new Date()
    return `${today.getFullYear()}-${today.getMonth()}-${today.getDay()}`
}

const getGameState = (): GameState[] => {
    return JSON.parse(window.localStorage.getItem(LocalStorageKeys.GAME_STATE) || '[]')
}

export const getGameStateDay = (day: string): GameState | undefined => {
    return getGameState().find(state => state.date === day)
}

export const saveGameState = (gameState: GameState) => {
    const oldState = getGameState().filter(state => state.date !== gameState.date)
    window.localStorage.setItem(LocalStorageKeys.GAME_STATE, JSON.stringify([...oldState, gameState]))
}
