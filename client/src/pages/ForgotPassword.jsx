import React, { useState } from 'react'

import toast from 'react-hot-toast';

import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { Link, useNavigate } from 'react-router-dom';
const ForgotPassword = () => {
    const [data, setData] = useState({

        email: "",


    })

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target


        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })

    }

    const valideValue = Object.values(data).every(el => el)

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await Axios({
                ...SummaryApi.forgot_password,
                data: data
            })
            if (response.data.error) {
                toast.error(response.data.message)
            }
            if (response.data.success) {
                toast.success(response.data.message)
                navigate("/otp-verfication", {
                    state: data
                })
                setData({

                    email: ""

                })

            }
        } catch (error) {
            AxiosToastError(error)
        }


    }

    return (
        <section className='w-full container mx-auto px-4'>
            <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-7'>

                <form className='grid gap-3 ' onSubmit={handleSubmit}>
                    <p className='font-semibold text-lg text-center '>Forgot Password</p>
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




                    <button disabled={!valideValue} className={` ${valideValue ? "bg-secondary-300 hover:bg-green-700" : "bg-gray-500"}    text-white py-2 rounded-lg font-semibold my-3 tracking-wide`}> Send Otp</button>


                </form>
                <p>
                    Already have account ? <Link to={"/login"} className='font-semibold text-secondary-300 hover:text-green-800'>Login</Link>
                </p>
            </div>
        </section>
    )
}

export default ForgotPassword