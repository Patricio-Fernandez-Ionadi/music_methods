import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider } from '../context/app-context'

import { MainLayout } from '../layout/main-layout'
import * as v from '../../views'

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
						<Route path='/funcional' element={<v.FuncionalView />} />
						<Route path='/modos' element={<v.ModosView />} />
						<Route path='/guitarra' element={<v.GuitarraView />} />
						<Route path='/biblioteca'>
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
