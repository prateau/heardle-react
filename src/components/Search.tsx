import React from 'react'
import Fuse from 'fuse.js'
import { useHeardleContext } from '../context/HeardleContext'
import { useTranslation } from 'react-i18next'

const FUSE_BASE_OPTIONS = { // TODO choisir les paramètres
	// isCaseSensitive: false,
	// includeScore: false,
	// ignoreDiacritics: false,
	// shouldSort: true,
	// includeMatches: false,
	// findAllMatches: false,
	// minMatchCharLength: 1,
	// location: 0,
	// threshold: 0.6,
	// distance: 100,
	// useExtendedSearch: false,
	// ignoreLocation: false,
	// ignoreFieldNorm: false,
	// fieldNormWeight: 1,
}

const Search = () => {
	const { allMusics } = useHeardleContext()
	const { i18n } = useTranslation()

	const [search, setSearch] = React.useState<string>()
	
	const fuse = new Fuse(allMusics, {
		...FUSE_BASE_OPTIONS,
		keys: [
			`name.${i18n.language}`,
			`category.${i18n.language}`
		]
	})

	return (
		<div>
			TODO rendre l'input autocomplete
			<input onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}/>
			{search && fuse.search(search).map(e => <div>{e.item.name[i18n.language]}</div>)}
		</div>
	)
}

export default Search
