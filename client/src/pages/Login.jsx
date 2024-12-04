import React, { useEffect, useState } from 'react'
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import toast from 'react-hot-toast';

import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { Link, useNavigate } from 'react-router-dom';
import fetchUserDetails from '../utils/fetchUserDetails';
import { useDispatch, useSelector } from 'react-redux';
import { setUserDetails } from '../store/userSlice';
const Login = () => {
  const user = useSelector((state) => state.user)
  const navigate= useNavigate();
 
 
  
const [data,setData]=useState({
 
  email:"",
  password:"",
 
})
const [showPassword, setShowPassword] = useState(false);


const dispatch = useDispatch()
const handleChange=(e)=>{
  const {name, value }= e.target
  

  setData((preve)=>{
    return{
      ...preve,
      [name]:value
    }
  })

}

const valideValue = Object.values(data).every(el => el)

const handleSubmit=async(e)=>{
e.preventDefault()

try{
  const response = await Axios({
    ...SummaryApi.login,
    data : data
  })
  if(response.data.error){
    toast.error(response.data.message)
   
  }
  if(response.data.success){
    toast.success(response.data.message)
    localStorage.setItem('accessToken',response.data.data.accessToken)
    localStorage.setItem('refreshToken',response.data.data.refreshToken)
    const userDetails = await fetchUserDetails()
    dispatch(setUserDetails(userDetails.data))
    setData({
      
      email:"",
      password:""
     
    })
    navigate("/")
  }
}catch(error){
  AxiosToastError(error)
 
}


}


useEffect(()=>{
  if(user?.email ){
    navigate("/")

  }
 
  

},[user?.email])

  return (
    <section className='w-full container mx-auto px-4'>
     <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-7'>

<form className='grid gap-3 ' onSubmit={handleSubmit}>
  
  <div className='grid gap-1'>
    <label For='email'>Email:</label>
    <input 
    type="email"
    autoFocus
    placeholder='Enter your email. .'
    className='bg-blue-50 p-2 border rounded focus:border-primary-200 outline-none'
    name='email'
    id='email'
    
    value={data.email}
    onChange={handleChange}
    />

  </div>
  <div className='grid gap-1'>
    <label For='password'>Password:</label>
   <div className='bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-200'>
   <input 
    type={ 
      showPassword ? 'text' : 'password'
    }
    autoFocus
    placeholder='Enter your password'
    className='w-full outline-none bg-blue-50'
    name='password'
    id='password'
    value={data.password}
    onChange={handleChange}
    />
    <div onClick={()=>setShowPassword(preve=>!preve)} className='cursor-pointer'>
      {
        showPassword?(<IoMdEye size={25} />):(<IoMdEyeOff size={25} />)
      }
    </div>
   </div>

  </div>
  <Link to={"/forgot-password"} className='block ml-auto'> Forgot Password</Link>
  

  <button disabled={!valideValue} className={` ${valideValue ? "bg-secondary-300 hover:bg-green-700" : "bg-gray-500" }    text-white py-2 rounded-lg font-semibold my-3 tracking-wide`}> Login</button>
 
  
</form>
<p>
  Don't have account ? <Link to={"/register"} className='font-semibold text-secondary-300 hover:text-green-800'>Register</Link>
</p>
     </div>
    </section>
  )
}

export default Login