import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider } from '../../context/AppContext'
import { MainLayout } from '../layout/main-layout'
import { FuncionalPage } from '../../views/FuncionalPage'
import { ModosPage } from '../../views/ModosPage'
import { GuitarraPage } from '../../views/GuitarraPage'
import { BibliotecaPage } from '../../views/BibliotecaPage'
import { BibliotecaView } from '../../modules/biblioteca/BibliotecaView'
import { SongDetail } from '../../modules/biblioteca/SongDetail'
import { SongFormView } from '../../modules/biblioteca/SongFormView'

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
