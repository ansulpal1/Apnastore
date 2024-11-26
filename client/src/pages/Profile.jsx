import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaUserEdit } from "react-icons/fa";
import UserProfilePicEdit from '../components/UserProfilePicEdit';
import Axios from '../utils/Axios';
import AxiosToastError from '../utils/AxiosToastError';
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast';
import { setUserDetails } from '../store/userSlice';
import fetchUserDetails from '../utils/fetchUserDetails';

const Profile = () => {
  const user = useSelector((state) => state.user)
  const [openProfilePic, setOpenProfilePic] = useState(false)
const [userData,setUserData]=useState({
  name:user.name,
  email:user.email,
  mobile:user.mobile,
})

useEffect(()=>{
  setUserData({
    name:user.name,
  email:user.email,
  mobile:user.mobile,
  })

},[user])
const dispatch=useDispatch()
const handleOnChange=(e)=>{
  const {name,value}=e.target
  setUserData((preve)=>{
    return{
      ...preve,
      [name]:value
    }
  })
}
const [loading,setLoading]=useState(false)

const handleSubmit=async(e)=>{
  e.preventDefault()
  try{
    setLoading(true)
    const response=await Axios({
      ...SummaryApi.updateUser,
      data:userData
    })
const {data:responseData}=response
if(responseData.success){
  toast.success(response.data.message)
  const userData =await fetchUserDetails()
  dispatch(setUserDetails(userData.data))
}

   

  }catch(error){
    AxiosToastError(error)
  }finally{
    setLoading(false)
  }


}


  return (
    <div >
      
     <div className='flex items-center flex-col'>
     <div className='w-20 h-20 rounded-full overflow-hidden drop-shadow-lg'>
        {
          user?.avatar ? (
            
            <img src={user.avatar} alt={user.name} className='w-full h-full object-cover' />
          ) : (
            <FaUserEdit size={60} />
          )
        }
      </div>

      <div>
        {/* Highlighted Change: Ensured consistent button styling */}
        <button 
          onClick={() => setOpenProfilePic(true)} 
          className='text-sm border border-gray-500 hover:bg-gray-500 hover:text-white px-3 py-1 rounded-lg mt-2 font-normal'
        >
          Change
        </button>

        {
          openProfilePic && (
            /* Pass the close prop to the UserProfilePicEdit component */
            <UserProfilePicEdit close={() => setOpenProfilePic(false)} />
          )
        }
      </div>
     </div>
      {/* other field */}
      <form onSubmit={handleSubmit} className='my-4 grid gap-4 font-normal'>
        <div className='grid gap-1'>
          <label className='' htmlFor='name'>Name</label>
          <input type="text" 
          className='p-2 bg-blue-50 outline-none border focus-within:border-primary-200 rounded-lg'
          value={userData.name}
          name="name"
          id='name'
          onChange={handleOnChange}
          placeholder='Enter Your name'
          required

           />
        </div>
        <div className='grid gap-1
        '>
          <label className='' htmlFor='email'>Email</label>
          <input type="email" 
          className='p-2 bg-blue-50 outline-none border focus-within:border-primary-200 rounded-lg'
          value={userData.email}
          name="email"
          id='email'
          onChange={handleOnChange}
          placeholder='Enter Your email'
required
readOnly // Makes the email field non-editable
           />
        </div>
        <div className='grid gap-1'>
          <label className='' htmlFor='mobile'>Mobile No.</label>
          <input type="number" 
          className='p-2 bg-blue-50 outline-none border focus-within:border-primary-200 rounded-lg'
          value={userData.mobile}
          name="mobile"
          id='mobile'
          onChange={handleOnChange}
          placeholder='Enter Your mobile Number'
required
           />
        </div>
        <button className='border px-4 py-2 font-semibold bg-secondary-300 hover:bg-green-900 text-white rounded-lg'>
          {
            loading ?"Loding...":"Submit"
          }
        </button>


      </form>

    </div>
  )
}

export default Profile
