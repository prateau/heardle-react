import * as React from 'react'
import Answer from './Answer.tsx'
import Share from './Share.tsx'
import TimerToNext from './TimerToNext.tsx'
import AudioPlayer from './AudioPlayer.tsx'
import Attempts from './Attempts.tsx'
import Help from './Help.tsx'
import Search from './Search.tsx'

const Content = () => {
    const [isFinished, setIsFinished] = React.useState<boolean>(false)

    if (isFinished) {
        return (
            <>
                <Answer />
                <Share />
                <TimerToNext />
                <AudioPlayer />
            </>
        )
    }

    return (
        <>
            <Attempts />
            <Help />
            <AudioPlayer />
            <Search />
        </>
    )
}

export default Content
