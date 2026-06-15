import { Outlet } from 'react-router-dom'

export const BibliotecaView = () => {
	return (
		<section id='cancionero' className='section biblioteca'>
			<Outlet />
		</section>
	)
}
