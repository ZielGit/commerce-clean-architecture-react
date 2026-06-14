import './App.css'
import { BrowserRouter } from 'react-router'
import { AuthInitializer } from './presentation/context/AuthInitializer'
import { AppRoutes } from './presentation/routes/AppRoutes'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <BrowserRouter>
      {/* Inicializa el estado de autenticación al cargar la app */}
      <AuthInitializer />

      {/* Rutas */}
      <AppRoutes />

      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 2000,
            style: {
              background: '#22c55e',
            },
          },
          error: {
            duration: 4000,
            style: {
              background: '#ef4444',
            },
          },
        }}
      />
    </BrowserRouter>
  )
}

export default App
