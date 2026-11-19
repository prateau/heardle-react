import * as React from 'react'
import { useTranslation } from 'react-i18next'
import './ModaleHistory.css'
import Modale from '../../commons/Modale.tsx'
import type { GameState } from '../../../config/types.ts'
import { getDateFromId, getGameStateWithoutCurrent } from '../../../config/utils.ts'
import { useHeardleContext } from '../../../context/HeardleContext.tsx'
import { getTodaySong } from '../../../context/seededRng.ts'
import { ALL_MUSICS } from '../../../config/consts.ts'
import AttemptSummary from '../../commons/AttemptSummary.tsx'
import classNames from 'classnames'

const HISTORY_SHOWN = 30 // Arbitrary number of lines shown in history

const getFilledHistory = (gameHistory: GameState[], gameState: GameState): GameState[] => {
	const todayId = gameState.dateId
	const filledHistory: GameState[] = []
	for (let dateId = todayId - HISTORY_SHOWN; dateId < todayId; dateId++) {
		const history = gameHistory.find(state => state.dateId === dateId)
		if (history) {
			filledHistory.push(history)
		} else {
			const music = getTodaySong(ALL_MUSICS, dateId)
			filledHistory.push({ dateId: dateId, response: music.id, attempts: [] })
		}
	}
	return filledHistory

}

type Props = {
	setIsOpen: (isOpen: boolean) => void
}

const ModaleHistory = ({ setIsOpen }: Props) => {
	const { i18n : { language }, t } = useTranslation()
	const { gameState, isInfinite } = useHeardleContext()

	const [gameHistory, setGameHistory] = React.useState<GameState[]>([])

	React.useEffect(() => {
		const history = getGameStateWithoutCurrent(isInfinite, gameState)
		setGameHistory(isInfinite ? history.slice(-HISTORY_SHOWN) : getFilledHistory(history, gameState))
	}, [isInfinite, gameState])

	const buildHistoryLine = (history: GameState) => {
		const date = getDateFromId(history.dateId)
		const music = getTodaySong(ALL_MUSICS, history.dateId)
		return (<>
			{!isInfinite && <span className='history-date'>{date.getFullYear()}-{date.getMonth() + 1}-{date.getDate()}</span>}
			<a className='history-music' target="_blank" href={music.url}>{music.name[language]}</a>
			<AttemptSummary gameState={history} />
		</>)
	}

	return (
		<Modale
			title={t('header.stats.history')}
			onClose={() => setIsOpen(false)}
		>
			<div className={classNames('history', { 'history--infinite': isInfinite })}>
				{gameHistory.toReversed().map(buildHistoryLine)}
			</div>
		</Modale>
	)
}

export default ModaleHistory
