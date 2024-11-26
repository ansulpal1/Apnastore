import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Divider from './Divider'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import { logout } from '../store/userSlice'
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError'
import { IoLink } from "react-icons/io5";
const UserMenu = ({close}) => {
    const user = useSelector((state)=>state.user)
    const dispatch = useDispatch()
    const navigate =useNavigate()
    const handleLogout=async()=>{
      try{
        const response= await Axios({

       ...SummaryApi.logout

        })
        if(response.data.success){
          if(close){
            close()
          }
         
          dispatch(logout())
          localStorage.clear()
          toast.success(response.data.message)
         navigate("/")
          

        }

      }catch(error){
        AxiosToastError(error)

      }
      

    }
    const handleClose=()=>{
      if(close){
        close()
      }
    }
  return (
    <div className=''>
        <div className='font-semibold'>My Account</div>
        <div className='text-sm font-medium flex items-center gap-1'>
          <span className='max-w-52 text-ellipsis line-clamp-1'>{user.name || user.mobile} </span>
          <Link onClick={handleClose} to={"/dashboard/profile"} className='hover:text-blue-600'>
          <IoLink size={20} />
          </Link>
        </div>
        <Divider/>
        <div className='text-sm font-normal grid gap-2 '>
            <Link onClick={handleClose} to={"/dashboard/myorders"} className='px-2 hover:bg-gray-100'>My Orders</Link>

            <Link onClick={handleClose} to={"/dashboard/address"} className='px-2 hover:bg-gray-100'>Save Address</Link>

            <button onClick={handleLogout} className='text-left px-2 hover:bg-gray-100'>Log Out </button>
        </div>

        
    </div>
  )
}

export default UserMenu
// bg-red-500 rounded-lg text-center px-2 py-2 text-white font-semibold 