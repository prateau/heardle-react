import './AttemptList.css'
import { useHeardleContext } from '../../context/HeardleContext.tsx'
import Attempt from './Attempt.tsx'
import { HEARDLE_SPLITS } from '../../config/consts.ts'
import EmptyAttempt from './EmptyAttempt.tsx'

const AttemptList = () => {
	const { gameState } = useHeardleContext()

	const nbEmptyAttemps = HEARDLE_SPLITS.length - gameState.attempts.length

	return (
		<div className='attempt-list'>
			{gameState.attempts.map(id => (
				<Attempt musicId={id} />
			))}
			{[...Array(nbEmptyAttemps)].map((_, index) => <EmptyAttempt current={index === 0} />)}
		</div>
	)
}

export default AttemptList
