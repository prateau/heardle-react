import * as React from 'react'
import Answer from './Answer.tsx'
import Share from './Share.tsx'
import TimerToNext from './TimerToNext.tsx'
import AudioPlayer from './AudioPlayer.tsx'
import Attempts from './Attempts.tsx'
import Help from './Help.tsx'
import Search from './Search.tsx'

const TEST_MUSIC = {
    id: 389,
    url: 'https://soundcloud.com/widoyod332/resilience-of-the-expedition-society'
}

const Content = () => {
    const [isFinished, setIsFinished] = React.useState<boolean>(false)

    if (isFinished) {
        return (
            <>
                <Answer />
                <Share />
                <TimerToNext />
                <AudioPlayer music={TEST_MUSIC}/>
            </>
        )
    }

    return (
        <>
            <Attempts />
            <Help />
            <AudioPlayer music={TEST_MUSIC}/>
            <Search />
        </>
    )
}

export default Content
