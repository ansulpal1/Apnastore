import React from 'react'
import UserMenu from '../components/UserMenu'
import { Outlet } from 'react-router-dom'

const Dashboard = () => {
  return (
   <section className='bg-white' >
    <div className='container  mx-auto p-3 grid lg:grid-cols-[250px,1fr] '>
      {/* left-menu */}
      <div className='py-4 sticky top-24 overflow-y-auto hidden lg:block h-screen border-r max-h-[calc(100vh-90px)]'>
<UserMenu/>
      </div>

      {/* right-menu */}
      <div className='bg-white  p-2'>
<Outlet/>
      </div>

    </div>
   </section>
  )
}

export default Dashboard