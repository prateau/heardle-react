import type { MusicElement } from './types'

export const sortMusicById = (music1: MusicElement, music2: MusicElement): number => music2.id - music1.id
