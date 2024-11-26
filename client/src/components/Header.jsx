import React, { useState } from 'react';
import logo from "../assets/images/logo1.png"
import Search from './Search';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaCircleUser } from "react-icons/fa6";
import useMobile from '../hooks/useMobile';
import { MdOutlineShoppingCart } from "react-icons/md";
import { useSelector } from 'react-redux'
import { VscTriangleDown } from "react-icons/vsc";
import { VscTriangleUp } from "react-icons/vsc";
import UserMenu from './UserMenu';


const Header = () => {
  const [isMobile] = useMobile()
  const location = useLocation()
  const navigate = useNavigate()
  const user = useSelector((state) => state?.user)
  const [openUserMenu, setOpenUserMenu] = useState(false)

  const isSearchPage = location.pathname === "/search"
  const redirectToLoginPage = () => {
    navigate("/login")

  }
  const handleCloseUserMenu=()=>{
    setOpenUserMenu(false)

  }
  const handleMobileuser=()=>{
    if(!user._id){
      navigate("/login")
      return
    }
    navigate("/account")

  }

  return (
    <header className='h-28 lg:h-20 lg:shadow-md sticky top-0 z-50 bg-gray-50 flex  flex-col justify-center gap-1 '>
      {
        !(isSearchPage && isMobile) && (
          <div className='container mx-auto flex  items-center  px-2 justify-between'>
            <div className='h-full'>
              <Link to={"/"} className='h-full flex justify-center items-center'>
                <img src={logo} alt="Logo" width={100} height={60}
                  className='hidden lg:block'

                />
                <img src={logo} alt="Logo" width={60} height={40}
                  className='lg:hidden'

                />

              </Link>

            </div>

            {/* search */}
            <div className='hidden lg:block  ml-28 '>
              <Search />
            </div>
            {/* login or cart */}
            <div className=''>
              <button onClick={handleMobileuser} className='text-neutral-600 lg:hidden'>
                <FaCircleUser size={30} />
              </button>
              {/* dasktop login */}
              <div className='hidden lg:flex items-center gap-8 '>
                {
                  user?._id? (
                    <div className='relative'>
                      <div  onClick={()=>setOpenUserMenu(preve=>!preve)} className='flex items-center gap-2 cursor-pointer select-none'>
                        <p>Account</p>
                        {
                          openUserMenu?(<VscTriangleUp size={23} />):(
                            <VscTriangleDown size={23} />
                          )
                        }
                        
                      </div>

                      {
                        openUserMenu && (
                          <div className='absolute  top-11 lg:shadow-md right-0'>
                    
                          <div className='bg-white rounded p-4 min-w-52 '>
                            <UserMenu close={handleCloseUserMenu} />

                            </div>
                        </div>
                        )

                      }
                      
                    </div>
                  ) : (
                    <button onClick={redirectToLoginPage} className='text-lg px-2'> Login</button>
                  )
                }


                <button className='flex items-center gap-2 bg-secondary-300 hover:bg-green-700 px-3 py-3 rounded-lg text-white'>
                  <div className='hover:animate-wiggleCart '>
                    <MdOutlineShoppingCart size={30} />
                  </div>
                  <div className='font-semibold'>
                    <p className=''>My Cart</p>


                  </div>
                </button>
              </div>
            </div>

          </div>
        )


      }


      <div className='container mx-auto px-2 lg:hidden'>
        <Search />
      </div>

    </header>

  );
};

export default Header;
