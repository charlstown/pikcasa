import { Toaster } from 'react-hot-toast'
import { Analytics } from '@vercel/analytics/react'

import AppTopBar from './components/layout/AppTopBar'
import AppFooter from './components/layout/AppFooter'
import MainContent from './components/layout/MainContent'

function App() {

  return (
    <div className='min-h-screen flex flex-col'>
      <AppTopBar />
      <MainContent />
      <AppFooter />
      <Toaster position="top-center" toastOptions={{ duration: 3500 }} />
      <Analytics />
    </div>
  )
}

export default App
