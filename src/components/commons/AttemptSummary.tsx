import classNames from 'classnames'
import './AttemptSummary.css'
import type { GameState } from '../../config/types'
import { HEARDLE_SPLITS } from '../../config/consts'

type Props = {
    gameState: GameState
}

const AttemptSummary = ({ gameState }: Props) => {
    
	const getRecapClassname = (index: number): string => {
		if (index > gameState.attempts.length - 1) {
			return 'attempt-sumary--empty'
		}
		const guess = gameState.attempts[index]
		if (guess === gameState.response) {
			return 'attempt-sumary--win'
		}
		if (guess == null) {
			return 'attempt-sumary--skip'
		}
		return 'attempt-sumary--fail'
	}

	return (
        <div className='attempt-sumary-container'>
            {HEARDLE_SPLITS.map((_, index) => (
                <div className={classNames('attempt-sumary', getRecapClassname(index))} />
            ))}
        </div>
	)
}

export default AttemptSummary
