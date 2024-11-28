import React, { useState } from 'react'
import { IoClose } from "react-icons/io5";
import UploadImage from '../utils/UploadImage';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast'

import AxiosToastError from '../utils/AxiosToastError';
const UploadCategory = ({close}) => {
    const [data,setData]=useState({
        name: "",
        image:""
    })

    const handleOnChange=(e)=>{
        const {name,value}=e.target
        setData((preve)=>{
            return {...data,
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
                ...SummaryApi.addCategory,
                data:data
            })
            const {data:responseData}=response
            if(responseData.success){
                toast.success(responseData.message)
                close()
                
            }

        }catch(error){
            AxiosToastError(error)

        }finally{
            setLoading(false)
        }

    }
    const handleUploadCategoryImage= async(e)=>{
        const file = e.target.files[0]
        if(!file){
            return
        }
        const response = await UploadImage(file)
        const {data:ImageResponse}=response
setData((preve)=>{
    return {
        ...preve,
        image:ImageResponse.data.url}
})

    }
  return (
    <section className='fixed top-0 left-0 right-0 bottom-0 p-4 bg-neutral-800 bg-opacity-60 flex items-center justify-center '>
<div className='bg-white max-w-4xl w-full p-4 rounded-lg'>
<div className='flex'>
    <h1 className='font-semibold'>Category</h1>
<button onClick={()=>{close()}} className=" w-fit block ml-auto " >
<IoClose size={25}  />
</button>
</div>
<form onSubmit={handleSubmit} className='my-3 grid gap-2'>
   <div className='grid gap-1'>
   <label id='categoryName' for="categoryName">Name</label>
    <input
    type='text'
    id='categoryName'
    placeholder=' Enter Category Name'
    value={data.name}
    name='name'
    onChange={handleOnChange}
    className='bg-blue-50 p-2 border border-blue-100 rounded-md focus-within:border-primary-200 outline-none'

    />
   </div>
   <div>
    <div className='grid gap-2'>
        <p>Image</p>
        <div className='flex gap-4 flex-col lg:flex-row items-center'>
        <div className='border bg-blue-50 h-36 w-full lg:w-36 rounded-md flex items-center justify-center '>

            {
                data.image ?(
                    <img
                    alt='category'
                    src={data.image}
                    className='h-full w-full  object-scale-down'
                    />

                ):(
                <p className='text-sm'>No Image</p>
            )

            }

        </div>
        <label htmlFor='uploadCategoryImage'>
        <div  className={
            `
            ${!data.name ? "bg-gray-500":" bg-green-500" }
            text-sm border border-gray-500 text-white px-4 py-2 rounded-md font-normal cursor-pointer
            `
        }>Upload Image</div>
        <input disabled={!data.name} onChange={ handleUploadCategoryImage } type='file' className='hidden' id='uploadCategoryImage'/>
        </label>
        </div>
    </div>
   </div>
<button disabled={!data.image} className={
    `
    ${data.name && data.image ?" bg-green-500":"bg-gray-500"}
     text-sm border border-gray-500 text-white px-4 py-2 rounded-md font-normal 
    `
}>ADD Category</button>
</form>
</div>
    </section>
  )
}

export default UploadCategory