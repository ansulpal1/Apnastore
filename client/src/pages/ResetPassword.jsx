import React, { useEffect, useState } from 'react'
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';

import { Link, useLocation, useNavigate } from 'react-router-dom'

const ResetPassword = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [data, setData] = useState({

        newPassword: "",
        confirmPassword: ""
    })
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const valideValue = Object.values(data).every(el => el)
    useEffect(() => {
     if(!(location?.state?.data?.success)){
             navigate("/")

        }
        if (location?.state?.email) {
            setData((preve) => {
                return {
                    ...preve,
                    email: location?.state?.email
                }
            })
        }
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target


        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })

    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        if (data.newPassword !== data.confirmPassword) {
            toast.error("New Password and Confirm Password must be same")
            return
        }

        try {
            const response = await Axios({
                ...SummaryApi.resetPassword,
                data: data
            })
            if (response.data.error) {
              
                toast.error(response.data.message)
            }
            if (response.data.success) {
                toast.success(response.data.message)

                setData({

                    email: "",
                    newPassword: "",
                    confirmPassword: ""
                })
                navigate("/login")
            }
        } catch (error) {
            console.log(error)
            AxiosToastError(error)
        }


    }

    return (
        <section className='w-full container mx-auto px-4'>
            <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-7'>
                <p className="font-semibold text-lg text-center">Enter your Password</p>
                <form className='grid gap-3 mt-6' onSubmit={handleSubmit}>


                    <div className='grid gap-1'>
                        <label For=' newPassword'>New Password:</label>
                        <div className='bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-200'>
                            <input
                                type={
                                    showPassword ? 'text' : 'password'
                                }
                                autoFocus
                                placeholder='Enter your new password'
                                className='w-full outline-none bg-blue-50'
                                name='newPassword'
                                id='newPassword'
                                value={data.newPassword}
                                onChange={handleChange}
                            />
                            <div onClick={() => setShowPassword(preve => !preve)} className='cursor-pointer'>
                                {
                                    showPassword ? (<IoMdEye size={25} />) : (<IoMdEyeOff size={25} />)
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
                            <div onClick={() => setShowConfirmPassword(preve => !preve)} className='cursor-pointer'>
                                {
                                    showConfirmPassword ? (<IoMdEye size={25} />) : (<IoMdEyeOff size={25} />)
                                }
                            </div>
                        </div>

                    </div>

                    <button disabled={!valideValue} className={` ${valideValue ? "bg-secondary-300 hover:bg-green-700" : "bg-gray-500"}    text-white py-2 rounded-lg font-semibold my-3 tracking-wide`}>Change Password</button>


                </form>
                <p>
                    Already have account ? <Link to={"/login"} className='font-semibold text-secondary-300 hover:text-green-800'>Login</Link>
                </p>
            </div>
        </section>
    )
}

export default ResetPassword