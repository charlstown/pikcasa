import { useState } from 'react'
import { Toaster } from 'react-hot-toast'

import AppTopBar from './components/layout/AppTopBar'
import AppFooter from './components/layout/AppFooter'
import Content from './components/layout/Content'

function App() {

  return (
    <div className='min-h-screen flex flex-col'>
      <AppTopBar />
      <Content />
      <AppFooter />
      <Toaster position="top-center" toastOptions={{ duration: 3500 }} />
    </div>
  )
}

export default App
