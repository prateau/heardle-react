import * as React from 'react'
import { Trans, useTranslation } from 'react-i18next'
import './ModaleSupport.css'
import Modale from '../commons/Modale.tsx'
import HeartIcon from '../../img/heart.svg?react'

type Props = {
	closeModale: () => void
}

const ModaleSupport = ({ closeModale }: Props) => {
	const { t } = useTranslation()

	return (
		<Modale
			title={t('header.about.title')}
			onClose={closeModale}
		>
			<div className='header-about-text'>
				<Trans
					i18nKey="header.about.text"
					components={{ a: <a /> }}
				/>
			</div>
		</Modale>
	)
}

const ModaleSupportWrapper = () => {
	const [isOpen, setIsOpen] = React.useState(false)

	return (<>
		<button className='header-icon-container' onClick={() => setIsOpen(true)}>
			<HeartIcon className='header-icon' />
		</button>
		{isOpen && <ModaleSupport closeModale={() => setIsOpen(false)} />}
	</>)
}

export default ModaleSupportWrapper
