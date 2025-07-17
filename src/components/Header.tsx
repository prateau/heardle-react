import { useTranslation } from 'react-i18next'
import { Locales } from '../config/i18n/i18n.ts'

const Header = () => {
	const { i18n, t } = useTranslation()

	// TODO c'est vraiment utile ça ?
	const changeLanguage = (lang: Locales) => {
		i18n.changeLanguage(lang)
	}

	return (
		<header>
			TODO header
			<h1>{t('title')}</h1>
		</header>
	)
}

export default Header
