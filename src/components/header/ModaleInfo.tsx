import * as React from 'react'
import { Trans, useTranslation } from 'react-i18next'
import './ModaleInfo.css'
import Modale from '../commons/Modale.tsx'
import InfoIcon from '../../img/info.svg?react'

type Props = {
	closeModale: () => void
}

const ModaleInfos = ({ closeModale }: Props) => {
	const { t } = useTranslation()

	return (
		<Modale
			title={t('header.infos.title')}
			onClose={closeModale}
		>
			<div className='header-infos-text'>
				<Trans
					i18nKey="header.infos.text"
					components={{ a: <a /> }}
				/>
			</div>
			<p className='header-infos-subText'>
				<Trans
					i18nKey="header.infos.subText"
					components={{ a: <a /> }}
				/>
			</p>
		</Modale>
	)
}

const ModaleInfosWrapper = () => {
	const [isOpen, setIsOpen] = React.useState(false)

	return (<>
		<button className='header-icon-container' onClick={() => setIsOpen(true)}>
			<InfoIcon className='header-icon' />
		</button>
		{isOpen && <ModaleInfos closeModale={() => setIsOpen(false)} />}
	</>)
}

export default ModaleInfosWrapper
