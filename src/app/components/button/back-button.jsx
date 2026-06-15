import { useNavigate } from 'react-router-dom'

export const BackButton = ({ route }) => {
	const navigate = useNavigate()
	return (
		<button className='back-btn' onClick={() => navigate(`/${route}`)}>
			← Volver
		</button>
	)
}
