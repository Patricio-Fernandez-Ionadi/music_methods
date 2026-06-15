import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'

export const Header = () => {
	const [navOpen, setNavOpen] = useState(false)

	const navItems = [
		{
			title: 'Funcional',
			path: '/funcional',
			links: [
				{ label: 'Jónico', anchor: '#jonico' },
				{ label: 'Eólico', anchor: '#eolico' },
			],
		},
		{
			title: 'Modos',
			path: '/modos',
			links: [
				{ label: 'Dórico', anchor: '#dorico' },
				{ label: 'Frigio', anchor: '#frigio' },
				{ label: 'Lidio', anchor: '#lidio' },
				{ label: 'Mixolidio', anchor: '#mixolidio' },
				{ label: 'Locrio', anchor: '#locrio' },
			],
		},
		{
			title: 'Guitarra',
			path: '/guitarra',
			links: [{ label: 'Diapasón', anchor: '#fretboard' }],
		},
		{
			title: 'Biblioteca',
			path: '/biblioteca',
			links: [{ label: 'Cancionero', anchor: '#cancionero' }],
		},
	]

	const closeNav = () => setNavOpen(false)

	return (
		<header className='header'>
			<button
				className='nav-toggle'
				onClick={() => setNavOpen(!navOpen)}
				aria-label='Toggle navigation'
			>
				<span className='nav-toggle-icon'>{navOpen ? '✕' : '☰'}</span>
			</button>

			<nav className={`header-nav ${navOpen ? 'open' : ''}`}>
				{navItems.map((section) => (
					<div key={section.title} className='nav-group'>
						<NavLink
							to={section.path}
							className={({ isActive }) =>
								`nav-group-title${isActive ? ' active' : ''}`
							}
							onClick={closeNav}
						>
							{section.title}
						</NavLink>
						<ul className='nav-group-links'>
							{section.links.map((link) => (
								<li key={link.anchor}>
									<Link to={`${section.path}${link.anchor}`} onClick={closeNav}>
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</div>
				))}
			</nav>
		</header>
	)
}
