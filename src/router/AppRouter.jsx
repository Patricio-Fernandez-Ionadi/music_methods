import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider } from '../context/AppContext'
import { MainLayout } from '../layouts/MainLayout'
import { FuncionalPage } from '../pages/FuncionalPage'
import { ModosPage } from '../pages/ModosPage'
import { GuitarraPage } from '../pages/GuitarraPage'
import { BibliotecaPage } from '../pages/BibliotecaPage'
import { BibliotecaView } from '../features/biblioteca/BibliotecaView'
import { SongDetail } from '../features/biblioteca/SongDetail'
import { SongFormView } from '../features/biblioteca/SongFormView'

export const AppRouter = () => {
	return (
		<BrowserRouter>
			<AppProvider>
				<Routes>
					<Route element={<MainLayout />}>
						<Route path='/' element={<Navigate to='/funcional' replace />} />
						<Route path='/funcional' element={<FuncionalPage />} />
						<Route path='/modos' element={<ModosPage />} />
						<Route path='/guitarra' element={<GuitarraPage />} />
						<Route path='/biblioteca' element={<BibliotecaPage />}>
							<Route index element={<BibliotecaView />} />
							<Route path='nueva' element={<SongFormView />} />
							<Route path=':songId' element={<SongDetail />} />
						</Route>
					</Route>
				</Routes>
			</AppProvider>
		</BrowserRouter>
	)
}
