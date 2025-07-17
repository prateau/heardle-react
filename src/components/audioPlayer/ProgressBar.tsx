import * as React from 'react'

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
		<div>
			{bars.map(bar => (
				<progress
					key={bar.start}
					max={bar.duration}
					value={progress - bar.start}
					style={{ flex: bar.duration }}
				/>
			))}
		</div>
	)
}

export default ProgressBar
