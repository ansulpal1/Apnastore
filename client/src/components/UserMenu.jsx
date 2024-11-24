import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Divider from './Divider'

const UserMenu = () => {
    const user = useSelector((state)=>state.user)
  return (
    <div className=''>
        <div className='font-semibold'>My Account</div>
        <div className='text-sm font-medium'>{user.name || user.mobile}</div>
        <Divider/>
        <div className='text-sm font-normal grid gap-2 '>
            <Link to={""} className='px-2'>My Orders</Link>
            <Link to={""} className='px-2'>Save Address</Link>
            <button className=' bg-red-500 rounded-lg text-center px-2 py-2 text-white font-semibold '>Log Out </button>
        </div>

        
    </div>
  )
}

export default UserMenu