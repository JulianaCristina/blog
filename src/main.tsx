import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router'
import { AppRouter } from './app/router/router'
import { Provider } from 'react-redux'
import { store } from './app/store/store'
import { TooltipProvider } from '@/components/ui/tooltip'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <TooltipProvider>
      <BrowserRouter>
        <StrictMode>
          <AppRouter />
        </StrictMode>
      </BrowserRouter>
    </TooltipProvider>
  </Provider>,
)
