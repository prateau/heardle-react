import * as React from 'react'
import './HeaderButton.css'

type Props = {
	onClick: () => void,
	Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
}

const HeaderButton = ({ onClick, Icon }: Props) => {

	return (
		<button className='header-icon-container' onClick={onClick}>
            <Icon className='header-icon' />
		</button>
	)
}

export default HeaderButton
