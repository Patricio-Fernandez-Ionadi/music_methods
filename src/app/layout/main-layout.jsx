import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Header } from '../../components/header/header'

export const MainLayout = () => {
	const location = useLocation()

	useEffect(() => {
		if (location.hash) {
			const el = document.querySelector(location.hash)
			if (el) {
				el.scrollIntoView({ behavior: 'smooth' })
			}
		}
	}, [location])

	return (
		<>
			<Header />
			<main className='main-content'>
				<Outlet />
			</main>
		</>
	)
}
