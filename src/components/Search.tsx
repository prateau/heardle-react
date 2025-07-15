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
	const { allMusics, guessMusic } = useHeardleContext()
	const { i18n } = useTranslation()

	const [search, setSearch] = React.useState<string>()
	const [selectedMusic, setSelectedMusic] = React.useState<MusicElement | undefined>()

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value)
		setSelectedMusic(undefined)
	}
	
	const fuse = new Fuse(allMusics, {
		...FUSE_BASE_OPTIONS,
		keys: [
			`name.${i18n.language}`,
			`category.${i18n.language}`
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
					setSearch(music.name[i18n.language])
				}
			}
		>
			{music.name[i18n.language]} - {music.category[i18n.language]}
		</div>
	)

	return (
		<div>
			TODO rendre l'input autocomplete
			<input onChange={handleChange} onFocus={console.log} value={search}/>
			{search && getSearchResults().map(buildResultOption)}
			<button onClick={() => guessMusic(undefined)}>skip</button>
			<button onClick={() => guessMusic(selectedMusic?.id)} disabled={!selectedMusic}>guess</button>
		</div>
	)
}

export default Search
