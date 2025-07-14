import { useTranslation } from 'react-i18next'
import { Locales } from '../config/i18n/i18n.ts'

const Header = () => {
	const { i18n } = useTranslation()

	// TODO c'est vraiment utile ça ?
	const changeLanguage = (lang: Locales) => {
		i18n.changeLanguage(lang)
	}

	return (
		<header>TODO header</header>
	)
}

export default Header
