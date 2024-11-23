
import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import toast, { Toaster } from 'react-hot-toast';
const App = () => {
  return (
    <>
    <Header/>
   <main className='min-h-[89vh]'>
     <Outlet/>
   </main>
   <Footer/>
   <Toaster position="top-right" />
    </>
  )
}

export default App