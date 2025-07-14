import { useHeardleContext } from '../../context/HeardleContext.tsx'

type Props = {
	musicId?: number
}

const Attempt = ({ musicId } : Props) => {
	const { allMusics } = useHeardleContext()

	const selectedMusic = allMusics.find(music => music.id === musicId)

	// TODO i18n
	if (selectedMusic) {
		return <div>
			{selectedMusic.name['fr']}
		</div>
	}

	return (
		<div>
			TODO attempt skip
		</div>
	)
}

export default Attempt
