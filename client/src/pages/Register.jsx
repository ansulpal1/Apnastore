import React, { useState } from 'react'
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import toast from 'react-hot-toast';

import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { Link, useNavigate } from 'react-router-dom';
const Register = () => {
const [data,setData]=useState({
  name:"",
  email:"",
  password:"",
  confirmPassword:""
})
const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);
const navigate= useNavigate();
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
if(data.password !== data.confirmPassword){
  toast.error("Password and Confirm Password should be same")
  return
}

try{
  const response = await Axios({
    ...SummaryApi.register,
    data : data
  })
  if(response.data.error){
    toast.error(response.data.message)
  }
  if(response.data.success){
    toast.success(response.data.message)

    setData({
      name:"",
      email:"",
      password:"",
      confirmPassword:""
    })
    navigate("/login")
  }
}catch(error){
  AxiosToastError(error)
}


}

  return (
    <section className='w-full container mx-auto px-4'>
     <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-7'>
<p>Welcome to ApanStore</p>
<form className='grid gap-3 mt-6' onSubmit={handleSubmit}>
  <div className='grid gap-1'>
    <label For='name'>Name:</label>
    <input 
    type='text'
    autoFocus
    placeholder='Enter your name'
    className='bg-blue-50 p-2 border rounded focus:border-primary-200 outline-none'
    name='name'
    id='name'
    value={data.name}
    onChange={handleChange}
    />

  </div>
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
  <div className='grid gap-1'>
    <label For='confirmPassword'>Confirm Password:</label>
   <div className='bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-200'>
   <input 
    type={ 
      showConfirmPassword ? 'text' : 'password'
    }
    autoFocus
    placeholder='Enter your confirm Password'
    className='w-full outline-none bg-blue-50'
    name='confirmPassword'
    id='confirmPassword'
    value={data.confirmPassword}
    onChange={handleChange}
    />
    <div onClick={()=>setShowConfirmPassword(preve=>!preve)} className='cursor-pointer'>
      {
        showConfirmPassword?(<IoMdEye size={25} />):(<IoMdEyeOff size={25} />)
      }
    </div>
   </div>

  </div>

  <button disabled={!valideValue} className={` ${valideValue ? "bg-secondary-300 hover:bg-green-700" : "bg-gray-500" }    text-white py-2 rounded-lg font-semibold my-3 tracking-wide`}> Register</button>
 
  
</form>
<p>
  Already have account ? <Link to={"/login"} className='font-semibold text-secondary-300 hover:text-green-800'>Login</Link>
</p>
     </div>
    </section>
  )
}

export default Register