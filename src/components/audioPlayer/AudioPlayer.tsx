import * as React from 'react'
import { useHeardleContext } from '../../context/HeardleContext.tsx'
import ProgressBar from './ProgressBar.tsx'
import { HEARDLE_SPLITS } from '../../config/consts.ts'
import { useTranslation } from 'react-i18next'

type Props = {
	isFinished?: boolean
}

const AudioPlayer = ({ isFinished }: Props) => {
	const { t } = useTranslation()
	const { currentMusic, gameState } = useHeardleContext()

	const [showHelp, setShowHelp] = React.useState<boolean>(true)
	const [isScReady, setIsScReady] = React.useState<boolean>(false)
	const [hasError, setHasError] = React.useState<boolean>(false)
	const [isPlaying, setIsPlaying] = React.useState<boolean>(false)
	const [soundDuration, setSoundDuration] = React.useState<number>(0)
	const [soundPosition, setSoundPosition] = React.useState<number>(0)

	const scIframe = React.useRef<HTMLIFrameElement>(null)

	const onReady = () => {
		setIsScReady(true)
	}

	const onPlayProgress = ({ currentPosition }: { currentPosition: number }) => {
		setSoundPosition(currentPosition)
	}

	const onFinish = () => {
		setIsPlaying(false)
	}

	const onError = () => {
		setHasError(true)
	}

	React.useEffect(() => {
		const scWidget = window.SC.Widget(scIframe.current)

		// clean
		scWidget.unbind(window.SC.Widget.Events.READY)
		scWidget.unbind(window.SC.Widget.Events.PLAY_PROGRESS)
		scWidget.unbind(window.SC.Widget.Events.FINISH)
		scWidget.unbind(window.SC.Widget.Events.ERROR)

		// bind events
		scWidget.bind(window.SC.Widget.Events.READY, onReady)
		scWidget.bind(window.SC.Widget.Events.PLAY_PROGRESS, onPlayProgress)
		scWidget.bind(window.SC.Widget.Events.FINISH, onFinish)
		scWidget.bind(window.SC.Widget.Events.ERROR, onError)

	}, [])

	React.useEffect(() => {
		if (isScReady) {
			const scWidget = window.SC.Widget(scIframe.current)

			// init
			scWidget.getDuration((duration : number) => { setSoundDuration(duration) })
		}
	}, [isScReady])

	const startMusic = () => {
		const scWidget = window.SC.Widget(scIframe.current)

		setShowHelp(false)
		setIsPlaying(true)
		scWidget.play()
	}

	const stopMusic = () => {
		const scWidget = window.SC.Widget(scIframe.current)

		setIsPlaying(false)
		scWidget.pause()
		scWidget.seekTo(0)
	}

	const toggleMusic = () => {
		if (isPlaying) {
			stopMusic()
		} else {
			startMusic()
		}
	}

	const currentMax = isFinished ? soundDuration : HEARDLE_SPLITS[gameState.attempts.length] * 1000

	React.useEffect(() => {
		if (!isFinished && soundPosition > currentMax) {
			stopMusic()
		} 
	}, [soundPosition, currentMax])

	return (
		<>
			<iframe // TODO hide
				name={`${currentMusic.id}`}
				ref={scIframe}
				allow="autoplay"
				src={`https://w.soundcloud.com/player/?url=${currentMusic.url}`}
			/>
			{hasError ? (
				<div>{t('game.player.error')}</div>
			) : (
				isScReady ? (
					<div>
						{!isFinished && showHelp && <div>{t('game.help')}</div>}
						<ProgressBar
							progress={soundPosition}
							splits={isFinished ? [soundDuration] : HEARDLE_SPLITS.map(s => s * 1000)}
							currentMax={currentMax}
						/>
						<button onClick={toggleMusic}>play</button>
					</div>
				) : (
					<div>{t('game.player.loading')}</div>
				)
			)}
		</>
	)
}

export default AudioPlayer
