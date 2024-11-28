import React, { useEffect, useState } from 'react'
import UploadCategory from '../components/UploadCategory'
import Axios from '../utils/Axios'
import AxiosToastError from '../utils/AxiosToastError'
import Loading from '../components/Loading'

const CategoryPage = () => {
  const [openUploadCategory,setOpenUploadCategory]=useState(false)
  const [loading,setLoading]=useState(false)

  const fetchCategory =async ()=>{
    try{
      setLoading(true)

    }catch(error){
      AxiosToastError(error)
    }finally{
      setLoading(false)

    }
  }
  useEffect(()=>{
    fetchCategory()
  },[])
  return (
   <section>
    <div className='p-2  bg-white shadow-md flex items-center justify-between '>
      <h2 className='font-semibold'>Category</h2>
      <button onClick={()=>setOpenUploadCategory(true)}  className='text-sm border border-gray-500 hover:bg-gray-500 hover:text-white px-3 py-1 rounded-lg font-normal'>Add Category</button>
    </div>
{
openUploadCategory &&(

  <UploadCategory close={()=>setOpenUploadCategory(false)}/>
)

}

{
  loading && <Loading/>


}

  
   </section>
  )
}

export default CategoryPage

