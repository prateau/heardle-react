import React from 'react'
import Fuse from 'fuse.js'
import { useHeardleContext } from '../context/HeardleContext'
import { useTranslation } from 'react-i18next'
import type { MusicElement } from '../config/types'

const FUSE_BASE_OPTIONS = {
	ignoreDiacritics: true,
	ignoreLocation: true
}

const Search = () => {
	const { i18n : { language }, t } = useTranslation()
	const { allMusics, guessMusic } = useHeardleContext()

	const [search, setSearch] = React.useState<string>()
	const [selectedMusic, setSelectedMusic] = React.useState<MusicElement | undefined>()

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value)
		setSelectedMusic(undefined)
	}
	
	const fuse = new Fuse(allMusics, {
		...FUSE_BASE_OPTIONS,
		keys: [
			`name.${language}`,
			`category.${language}`
		]
	})

	const getSearchResults = (): MusicElement[] => (
		fuse.search(search || '')
			.slice(0, 10)
			.map(e => e.item)
	)

	const buildResultOption = (music: MusicElement) => ( // TODO create element for this
		<div
			key={music.id}
			onClick={() => {
					setSelectedMusic(music)
					setSearch(music.name[language])
				}
			}
		>
			{music.name[language]} - {music.category[language]}
		</div>
	)

	return (
		<div>
			<input
				onChange={handleChange}
				onFocus={console.log}
				value={search}
				placeholder={t('game.search.placeholder')}
			/>
			{search && getSearchResults().map(buildResultOption)}
			<button onClick={() => guessMusic(undefined)}>{t('game.search.skip')}</button>
			<button onClick={() => guessMusic(selectedMusic?.id)} disabled={!selectedMusic}>{t('game.search.submit')}</button>
		</div>
	)
}

export default Search
