import Answer from './Answer.tsx'
import Share from './Share.tsx'
import TimerToNext from './TimerToNext.tsx'
import AudioPlayer from './AudioPlayer.tsx'
import Attempts from './Attempts.tsx'
import Search from './Search.tsx'
import { useHeardleContext } from '../context/HeardleContext.tsx'

const Content = () => {
    const { gameState } = useHeardleContext()

    if (gameState.isFinished) {
        return (
            <>
                <Answer />
                <Share />
                <TimerToNext />
                <AudioPlayer isFinished/>
            </>
        )
    }

    return (
        <>
            <Attempts />
            <AudioPlayer />
            <Search />
        </>
    )
}

export default Content
