import * as React from 'react'
import { useTranslation } from 'react-i18next'
import './ModaleLanguage.css'
import { Locales } from '../../config/i18n/i18n.ts'
import Modale from '../commons/Modale.tsx'
import FlagFrIcon from '../../img/flagFr.svg?react'
import FlagGbIcon from '../../img/flagGb.svg?react'

const getLocaleFlag = (locale: Locales): React.FunctionComponent<React.SVGProps<SVGSVGElement>> => {
	switch (locale) {
		case Locales.EN:
			return FlagGbIcon
		case Locales.FR:
			return FlagFrIcon
		default:
			return locale satisfies never // assert unreachable
	}
}

type Props = {
	closeModale: () => void
}

const ModaleLanguage = ({ closeModale }: Props) => {
	const { i18n : { changeLanguage }, t } = useTranslation()

	return (<>
		<Modale
			title={t('header.language.title')}
			onClose={closeModale}
		>
            <div className='header-language-container'>
				{Object.values(Locales).map((locale) => {
					const LocaleFlag = getLocaleFlag(locale)
					return (
						<div className='header-language-icon-container' onClick={() => changeLanguage(locale)}>
							<LocaleFlag className='header-language-icon' />
						</div>
					)
				})}
            </div>
		</Modale>
	</>)
}

const ModaleLanguageWrapper = () => {
	const { i18n : { language } } = useTranslation()

	const [isOpen, setIsOpen] = React.useState(false)

	const Flag = getLocaleFlag(language as Locales)

	return (<>
		<button className='header-icon-container' onClick={() => setIsOpen(true)}>
			<Flag className='header-icon' />
		</button>
		{isOpen && <ModaleLanguage closeModale={() => setIsOpen(false)} />}
	</>)
}

export default ModaleLanguageWrapper
