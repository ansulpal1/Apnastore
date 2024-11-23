import React from 'react';
import logo from "../assets/images/logo1.png"
import Search from './Search';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaCircleUser } from "react-icons/fa6";
import useMobile from '../hooks/useMobile';
import { MdOutlineShoppingCart } from "react-icons/md";
const Header = () => {
  const [isMobile] = useMobile()
  const location = useLocation()
  const navigate =useNavigate()
  const isSearchPage = location.pathname === "/search"
  const redirectToLoginPage = ()=>{
    navigate("/login")

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
          <button className='text-neutral-600 lg:hidden'>
            <FaCircleUser size={30} />
          </button>
          <div className='hidden lg:flex items-center gap-8 '>
            <button onClick={redirectToLoginPage} className='text-lg px-2'> Login</button>
            <button className='flex items-center gap-2 bg-secondary-300 hover:bg-green-700 px-3 py-3 rounded-lg text-white'>
              <div className='hover:animate-wiggleCart '>
              <MdOutlineShoppingCart size={30}/>
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
