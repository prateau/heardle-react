import { useTranslation } from 'react-i18next'
import './Header.css'
import ModaleInfos from './modales/ModaleInfo.tsx'
import ModaleSupport from './modales/ModaleSupport.tsx'
import ModaleHelp from './modales/ModaleHelp.tsx'
import ModaleLanguage from './modales/ModaleLanguage.tsx'
import ModaleList from './modales/ModaleList.tsx'
import ModaleStats from './modales/ModaleStats.tsx'
import { useHeardleContext } from '../../context/HeardleContext.tsx'

const Header = () => {
	const { t } = useTranslation()
	const { isInfinite } = useHeardleContext()

	return (
		<header className='header'>
			<div className='header-content'>
				<ModaleInfos />
				<ModaleSupport />
				<ModaleHelp />
				<h1 className='header-title'>{isInfinite ? t('infiniteTitle') : t('title')}</h1>
				<ModaleStats />
				<ModaleList />
				<ModaleLanguage />
			</div>
		</header>
	)
}

export default Header
