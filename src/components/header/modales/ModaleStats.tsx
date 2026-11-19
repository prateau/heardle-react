import * as React from 'react'
import { useTranslation } from 'react-i18next'
import './ModaleStats.css'
import Modale from '../../commons/Modale.tsx'
import StatsIcon from '../../../img/stats.svg?react'
import type { GameState } from '../../../config/types.ts'
import { getGameStateWithoutCurrent, isGameFinished } from '../../../config/utils.ts'
import { useHeardleContext } from '../../../context/HeardleContext.tsx'
import { HEARDLE_SPLITS } from '../../../config/consts.ts'
import { Bar } from 'react-chartjs-2'
import Button, { Variant } from '../../commons/Button.tsx'
import ModaleHistory from './ModaleHistory.tsx'
import HeaderButton from '../HeaderButton.tsx'

type Streak = {
	lastId: number,
	length: number
}

const getStreaks = (history: GameState[]): Streak[] => (
	history
		.filter(state => state.attempts.includes(state.response))
		.sort((a, b) => a.dateId - b.dateId)
		.reduce((allStreaks, state) => {
			const currentStreak = allStreaks.find(streak => streak.lastId + 1 === state.dateId)
			if (currentStreak) {
				return [
					...allStreaks.filter(streak => streak !== currentStreak),
					{ lastId: state.dateId, length: currentStreak.length + 1 }
				]
			} else {
				return [
					...allStreaks,
					{ lastId: state.dateId, length: 1 }
				]
			}
		}, [] as Streak[])
)

const getDataFromHistory = (history: GameState[]): number[] => (
	history.reduce((result, state) => {
		if (state.attempts.includes(state.response)) {
			result[state.attempts.length - 1] += 1
		} else {
			result[HEARDLE_SPLITS.length] += 1
		}
		return result
	}, Array(HEARDLE_SPLITS.length + 1).fill(0))
)

type Props = {
	closeModale: () => void
}

const ModaleStats = ({ closeModale }: Props) => {
	const { t } = useTranslation()
	const { gameState, isInfinite } = useHeardleContext()

	const [isHistoryOpen, setIsHistoryOpen] = React.useState(false)
	const [gameHistory, setGameHistory] = React.useState<GameState[]>([])

	React.useEffect(() => {
		setGameHistory(getGameStateWithoutCurrent(isInfinite, gameState))
	}, [isInfinite, gameState])

	const isTodayFinished = isGameFinished(gameState)

	const gamePlayed = gameHistory.length
	const gameWon = gameHistory.filter(state => state.attempts.includes(state.response)).length
	const winRate = gameHistory.length > 0 ? Math.round((gameWon / gamePlayed) * 100) : 0

	const allStreaks = getStreaks(gameHistory)
	const currentStreak = allStreaks.find(streak => streak.lastId === (isTodayFinished ? gameState.dateId : gameState.dateId - 1))?.length || 0
	const maxStreak = Math.max(0, ...allStreaks.map(streak => streak.length))

	const data = {
		labels: [...Array.from({ length: HEARDLE_SPLITS.length }, (_, i) => i + 1), 'X'],
		datasets: [{
			data: getDataFromHistory(gameHistory),
			backgroundColor: [...Array(HEARDLE_SPLITS.length).fill('#1d7e05'), '#ff0000']
		}]
	}

	return (
		<Modale
			title={t('header.stats.title')}
			onClose={closeModale}
		>
			<div className='header-stats-container'>
				<Bar
					data={data}
					options={{
						plugins: {
							legend: {
								display: false
							}
						},
						scales: {
							y: {
								ticks: {
									precision: 0
								}
							}
						}
					}}
				/>
				<div className='header-stats-item-container'>
					<div className='header-stats-item'>
						<div className='header-stats-item-value'>{gamePlayed}</div>
						{t('header.stats.played')}
					</div>
					<div className='header-stats-item'>
						<div className='header-stats-item-value'>{gameWon}</div>
						{t('header.stats.won')}
					</div>
					<div className='header-stats-item'>
						<div className='header-stats-item-value'>{winRate}%</div>
						{t('header.stats.winRate')}
					</div>
				</div>
				<div className='header-stats-item-container'>
					<div className='header-stats-item'>
						<div className='header-stats-item-value'>{currentStreak}</div>
						{t('header.stats.currentStreak')}
					</div>
					<div className='header-stats-item'>
						<div className='header-stats-item-value'>{maxStreak}</div>
						{t('header.stats.maxStreak')}
					</div>
				</div>
				<Button
					label={t(isInfinite ? 'header.stats.historyButtonInfinite' : 'header.stats.historyButton')}
					variant={Variant.Primary}
					onClick={() => setIsHistoryOpen(true)}
				/>
				{isHistoryOpen && <ModaleHistory setIsOpen={setIsHistoryOpen} />}
			</div>
		</Modale>
	)
}

const ModaleStatsWrapper = () => {
	const [isOpen, setIsOpen] = React.useState(false)

	return (<>
		<HeaderButton onClick={() => setIsOpen(true)} Icon={StatsIcon} />
		{isOpen && <ModaleStats closeModale={() => setIsOpen(false)} />}
	</>)
}

export default ModaleStatsWrapper
