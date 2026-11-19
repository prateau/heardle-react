import * as React from 'react'
import { useTranslation } from 'react-i18next'
import './ModaleHelp.css'
import Modale from '../../commons/Modale.tsx'
import QuestionIcon from '../../../img/question.svg?react'
import MusicIcon from '../../../img/music.svg?react'
import SoundIcon from '../../../img/sound.svg?react'
import ThumbIcon from '../../../img/thumb.svg?react'
import ListIcon from '../../../img/list.svg?react'
import Button, { Variant } from '../../commons/Button.tsx'
import { getShowHelp, setShowHelp } from '../../../config/utils.ts'
import HeaderButton from '../HeaderButton.tsx'

type Props = {
	closeModale: () => void
}

const ModaleHelp = ({ closeModale }: Props) => {
	const { t } = useTranslation()

	return (
		<Modale
			title={t('header.help.title')}
			onClose={closeModale}
		>
			<div className='header-help-container'>
				<div className='header-help-item'>
					<MusicIcon className='header-help-item-icon' />
					<p>{t('header.help.listen')}</p>
				</div>
				<div className='header-help-item'>
					<SoundIcon className='header-help-item-icon' />
					<p>{t('header.help.progress')}</p>
				</div>
				<div className='header-help-item'>
					<ThumbIcon className='header-help-item-icon' />
					<p>{t('header.help.win')}</p>
				</div>
				<div className='header-help-item'>
					<ListIcon className='header-help-item-icon' />
					<p>{t('header.help.list')}</p>
				</div>
				<div className='header-help-button'>
					<Button label={t('header.help.play')} variant={Variant.Primary} onClick={closeModale} />
				</div>
			</div>
		</Modale>
	)
}

const ModaleHelpWrapper = () => {
	const [isOpen, setIsOpen] = React.useState(false)

	React.useEffect(() => {
		const showHelp = getShowHelp()
		setIsOpen(showHelp)
	}, [])

	const closeModale = () => {
		setIsOpen(false)
		setShowHelp(false)
	}

	return (<>
		<HeaderButton onClick={() => setIsOpen(true)} Icon={QuestionIcon} />
		{isOpen && <ModaleHelp closeModale={closeModale} />}
	</>)
}

export default ModaleHelpWrapper
