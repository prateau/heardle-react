import Answer from './Answer.tsx'
import Share from './Share.tsx'
import TimerToNext from './TimerToNext.tsx'
import AudioPlayer from './AudioPlayer.tsx'
import AttemptList from './attempts/AttemptList.tsx'
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
            <AttemptList />
            <AudioPlayer />
            <Search />
        </>
    )
}

export default Content
