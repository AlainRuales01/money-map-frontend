import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import './App.css'
import { AlertProvider } from './components/context/AlertProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import GlobalSyncIndicator from './components/ui/GlobalSyncIndicator'
import GlobalLoadingIndicator from './components/ui/GlobalLoadingIndicator'


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,  
      retry: 1,          

      staleTime: 0, 
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AlertProvider>
          <GlobalLoadingIndicator />
          <GlobalSyncIndicator />
          <AppRoutes />
        </AlertProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
    
  )
}

export default App
