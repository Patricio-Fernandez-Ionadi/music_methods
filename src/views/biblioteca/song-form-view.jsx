import { useNavigate } from 'react-router-dom'
import { BackButton } from '../../app/components/button/back-button'
import { SongForm } from '../../modules/biblioteca/song/form/song-form'

export const SongFormView = () => {
	const navigate = useNavigate()
	return (
		<>
			<BackButton route='biblioteca' />
			<SongForm
				onSuccess={() => navigate('/biblioteca')}
				onCancel={() => navigate('/biblioteca')}
			/>
		</>
	)
}
