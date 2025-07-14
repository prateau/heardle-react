import { useHeardleContext } from '../../context/HeardleContext.tsx'
import Attempt from './Attempt.tsx'
import { HEARDLE_SPLITS } from '../../config/consts.ts'
import EmptyAttempt from './EmptyAttempt.tsx'

const AttemptList = () => {
	const { gameState } = useHeardleContext()

	const nbEmptyAttemps = HEARDLE_SPLITS.length - gameState.attempts.length

	return (
		<div>
			{gameState.attempts.map(id => (
				<Attempt musicId={id} />
			))}
			{[...Array(nbEmptyAttemps)].map(() => <EmptyAttempt />)}
		</div>
	)
}

export default AttemptList
