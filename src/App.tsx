import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import './App.css'
import { AlertProvider } from './components/context/AlertProvider'

function App() {
  return (
    
      <BrowserRouter>
        <AlertProvider>
          <AppRoutes />
        </AlertProvider>
      </BrowserRouter>
    
  )
}

export default App
