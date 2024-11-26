import React, { useState } from 'react'
import { FaUserEdit } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import AxiosToastError from '../utils/AxiosToastError'
import { MdClose } from "react-icons/md";
import { updatedAvatar } from '../store/userSlice'
import toast from 'react-hot-toast'

const UserProfilePicEdit = ({ close }) => {
    const user = useSelector((state) => state.user)
    const [loading, setLoading] = useState(false)
    const [uploaded, setUploaded] = useState(false) // New state to track upload status
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    const handleUploadAvatarImage = async (e) => {
        const file = e.target.files[0]
        if (!file) {
            return
        }
        const formData = new FormData()
        formData.append('avatar', file)

        try {
            setLoading(true)
            const response = await Axios({
                ...SummaryApi.uploadAvatar,
                data: formData
            })
            const { data: responseData } = response
            dispatch(updatedAvatar(responseData.data.avatar))
            toast.success(response.data.message)
            setUploaded(true) // Mark as uploaded after success
        } catch (error) {
            AxiosToastError(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <section className='fixed top-0 bottom-0 left-0 right-0 bg-neutral-900 bg-opacity-60 p-4 flex items-center justify-center'>
            <div className='bg-white max-w-sm w-full rounded p-4 flex flex-col items-center justify-center drop-shadow-lg'>
                <button onClick={close} className='text-neutral-800 w-fit block ml-auto'><MdClose size={25} /></button>
                <div className='w-20 h-20 rounded-full overflow-hidden drop-shadow-lg'>
                    {
                        user?.avatar ? (
                            <img
                                src={user.avatar}
                                alt={user.name}
                                className='w-full h-full object-cover'
                            />
                        ) : (
                            <FaUserEdit size={60} />
                        )
                    }
                </div>
                <form onSubmit={handleSubmit}>
                    <label htmlFor='uploadProfile'>
                        <div className={`text-sm border border-gray-500 px-3 py-1 rounded mt-2 font-normal cursor-pointer 
                            ${loading ? 'bg-gray-300' : 'hover:bg-gray-500 hover:text-white'}`}>
                            {loading ? "Loading..." : uploaded ? "Image Uploaded" : "Upload"}
                        </div>
                        <input
                            type="file"
                            className="hidden"
                            id='uploadProfile'
                            onChange={handleUploadAvatarImage}
                        />
                    </label>
                </form>
            </div>
        </section>
    )
}

export default UserProfilePicEdit
