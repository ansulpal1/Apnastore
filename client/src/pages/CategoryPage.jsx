import React, { useEffect, useState } from 'react'
import UploadCategory from '../components/UploadCategory'
import Axios from '../utils/Axios'
import AxiosToastError from '../utils/AxiosToastError'
import Loading from '../components/Loading'
import NoData from '../components/NoData'
import SummaryApi from '../common/SummaryApi'
import EditCategory from '../components/EditCategory'

const CategoryPage = () => {
  const [openUploadCategory,setOpenUploadCategory]=useState(false)
  const [loading,setLoading]=useState(false)
  const [categorData, setCategoryData] = useState([]) 
const [openEdit,setOpenEdit]=useState(false)
const [editData,setEditData]=useState({
  name:"",
  image:""
})

  const fetchCategory =async ()=>{
    try{
      setLoading(true)
      const response =await Axios({
        ...SummaryApi.getCategory
      })
      const { data : responseData } =response
      if(responseData.success){
        setCategoryData(responseData.data)
      }

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

  <UploadCategory fetchData={fetchCategory} close={()=>setOpenUploadCategory(false)}/>
)

}

{
  !categorData[0] && !loading && (
<NoData/>
  )

}

<div className='p-1 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2   '>
{
  categorData.map((category, index) => {
    return (
     <div key={index}  className='w-32 h-56  overflow-hidden rounded shadow-lg '>
      <img 
      alt={category.image}
      src={category.image}
      className='w-full object-scale-down '
      />
      
      <div className='flex items-center h-9 gap-2 '>
      <button  onClick={()=>{setOpenEdit(true)
         setEditData(category)
      }}
      className="flex-1 bg-green-100 text-green-600 font-medium py-2 rounded-r relative overflow-hidden group">
  <span className="absolute inset-0 bg-green-500 transition-transform transform -translate-x-full group-hover:translate-x-0 duration-700 ease-out"></span>
  <span  className="relative z-10 transition-colors duration-700 ease-out group-hover:text-white">
    Edit
  </span>
</button>

<button className="flex-1 bg-red-100 text-red-600 font-medium py-2 rounded-l relative overflow-hidden group">
  <span className="absolute inset-0 bg-red-500 transition-transform transform translate-x-full group-hover:translate-x-0 duration-700 ease-out"></span>
  <span className="relative z-10 text-red-600 group-hover:text-white transition-colors duration-700 ease-out">
    Delete
  </span>
</button>




        </div>

     </div>
    )
  })
}

</div>


{
  loading && <Loading/>


}
{
  openEdit &&(
    <EditCategory data={editData} close={()=>setOpenEdit(false)} fetchData={fetchCategory} />
  )
}

  
   </section>
  )
}

export default CategoryPage

