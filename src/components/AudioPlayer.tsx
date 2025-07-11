type MusicElement = {
	id: number,
	url: string
}

type Props = {
	music: MusicElement
}

const AudioPlayer = ({ music }: Props) => {
	// TODO dans le heardle de base, il a une iframe embedded vers souncloud et visiblement il la cache et la contrôle de l'extérieur

	return (
		<div>
			TODO control audio player
			<iframe
				name={`${music.id}`}
				id={`soundcloud${music.id}`}
				allow="autoplay"
				height="0"
				src={`https://w.soundcloud.com/player/?url=${music.url}&amp;cache=${music.id}`}
			/>
		</div>
	)
}

export default AudioPlayer
