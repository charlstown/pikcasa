import { useState } from 'react'

import AppTopBar from './components/layout/AppTopBar'
import AppFooter from './components/layout/AppFooter'
import Content from './components/layout/Content'

function App() {


  return (
    <div className='min-h-screen flex flex-col'>
      <AppTopBar />
      <Content />
      <AppFooter />
    </div>
  )
}

export default App
