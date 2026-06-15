import { Outlet } from 'react-router-dom'

export const BibliotecaLayout = () => {
	return (
		<section id='cancionero' className='section biblioteca'>
			<Outlet />
		</section>
	)
}
