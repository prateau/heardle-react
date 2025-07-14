import { useHeardleContext } from '../../context/HeardleContext.tsx'
import { useTranslation } from 'react-i18next'

type Props = {
	musicId?: number
}

const Attempt = ({ musicId } : Props) => {
	const { i18n : { language } } = useTranslation()
	const { allMusics } = useHeardleContext()

	const selectedMusic = allMusics.find(music => music.id === musicId)

	if (selectedMusic) {
		return <div>
			{selectedMusic.name[language]}
		</div>
	}

	return (
		<div>
			TODO attempt skip
		</div>
	)
}

export default Attempt
