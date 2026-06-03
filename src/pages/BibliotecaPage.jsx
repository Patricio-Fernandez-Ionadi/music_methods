import { Outlet } from 'react-router-dom'

export const BibliotecaPage = () => {
	return (
		<section id='cancionero' className='section biblioteca'>
			<Outlet />
		</section>
	)
}
