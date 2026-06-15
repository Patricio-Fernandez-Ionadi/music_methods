import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider } from '../context/app-context'

import { MainLayout } from '../layout/main-layout'
import * as v from '../../views'

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
							<Route index element={<v.BibliotecaView />} />
							<Route path='nueva' element={<v.SongFormView />} />
							<Route path=':songId' element={<v.SongDetail />} />
						</Route>
					</Route>
				</Routes>
			</AppProvider>
		</BrowserRouter>
	)
}
