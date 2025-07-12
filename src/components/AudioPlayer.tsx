import * as React from 'react'
import type { MusicElement } from '../config/types.ts'

type Props = {
	music: MusicElement
}

const AudioPlayer = ({ music }: Props) => {
	const [isScReady, setIsScReady] = React.useState<boolean>(false)
	const [isPlaying, setIsPlaying] = React.useState<boolean>(false)

	const scIframe = React.useRef<HTMLIFrameElement>(null)

	const onReady = () => {
		// TODO autre chose ?
		setIsScReady(true)
	}

	const onPlayProgress = () => {
		// TODO mettre à jour l'avancement de la barre
	}

	const onFinish = () => {
		setIsPlaying(false)
	}

	React.useEffect(() => {
		const scWidget = window.SC.Widget(scIframe.current)

		// clean
		scWidget.unbind(window.SC.Widget.Events.READY)
		scWidget.unbind(window.SC.Widget.Events.PLAY_PROGRESS)
		scWidget.unbind(window.SC.Widget.Events.FINISH)

		// bind events
		scWidget.bind(window.SC.Widget.Events.READY, onReady)
		scWidget.bind(window.SC.Widget.Events.PLAY_PROGRESS, onPlayProgress)
		scWidget.bind(window.SC.Widget.Events.FINISH, onFinish)
	}, [])

	const togglePlay = () => {
		const scWidget = window.SC.Widget(scIframe.current)

		if (isPlaying) {
			setIsPlaying(false)
			scWidget.pause()
			scWidget.seekTo(0)
		} else {
			setIsPlaying(true)
			scWidget.play()
		}
	}

	return (
		<div>
			TODO control audio player
			<button onClick={togglePlay}>play</button>
			<iframe // TODO hide
				name={`${music.id}`}
				ref={scIframe}
				allow="autoplay"
				src={`https://w.soundcloud.com/player/?url=${music.url}&cache=${music.id}`}
			/>
		</div>
	)
}

export default AudioPlayer
