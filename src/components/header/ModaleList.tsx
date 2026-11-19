import * as React from 'react'
import { useTranslation } from 'react-i18next'
import './ModaleList.css'
import Modale from '../commons/Modale.tsx'
import ListIcon from '../../img/list.svg?react'
import { ALL_CATEGORIES, ALL_MUSICS } from '../../config/consts.ts'

type Props = {
	closeModale: () => void
}

const ModaleList = ({ closeModale }: Props) => {
	const { i18n : { language }, t } = useTranslation()

	return (
		<Modale
			title={t('header.list.title')}
			onClose={closeModale}
		>
			{ALL_CATEGORIES.map((category) => (
				<>
					<h3 className='header-list-category'>{category.name[language]}</h3>
					<ul className='header-list-container'>
						{ALL_MUSICS
							.filter((music) => music.categoryId === category.id)
							.map(m => (
								<li className='header-list-item'>
									<a target="_blank" href={m.url}>{m.name[language]}</a>
								</li>
							))
						}
					</ul>
				</>
			))}
		</Modale>
	)
}

const ModaleListWrapper = () => {
	const [isOpen, setIsOpen] = React.useState(false)

	return (<>
		<button className='header-icon-container' onClick={() => setIsOpen(true)}>
            <ListIcon className='header-icon' />
		</button>
		{isOpen && <ModaleList closeModale={() => setIsOpen(false)} />}
	</>)
}

export default ModaleListWrapper
