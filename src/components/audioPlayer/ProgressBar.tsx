import * as React from 'react'
import './ProgressBar.css'
import classNames from 'classnames'

type Bar = {
	start: number,
	end: number,
	duration: number
}

type Props = {
	progress: number,
	splits: number[],
	currentMax: number
}

const ProgressBar = ({ progress, splits, currentMax }: Props) => {

	const bars = React.useMemo((): Bar[] => {
		let min = 0
		const result: Bar[] = []
		splits.forEach(split => {
			result.push({
				start: min,
				duration: split - min,
				end: split
			})
			min = split
		})
		return result
	}, [splits])

	return (
		<div className='progress-bar-line'>
			<div className='progress-bar-container'>
				{bars.map(bar => (
					<progress
						className={classNames('progress-bar', { ['progress-bar--unlocked']: currentMax >= bar.end })}
						key={bar.start}
						max={bar.duration}
						value={progress - bar.start}
						style={{ flexGrow: bar.duration }}
					/>
				))}
			</div>
		</div>
	)
}

export default ProgressBar
