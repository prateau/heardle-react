import classNames from 'classnames'
import './EmptyAttempt.css'

type Props = {
	current: boolean
}

const EmptyAttempt = ({ current }: Props) => {

	return (
		<div className={classNames('empty-attempt', { 'empty-attempt--current': current })} />
	)
}

export default EmptyAttempt
