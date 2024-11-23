import React, { useEffect, useState } from 'react'
import { FaSearch } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IoIosArrowRoundBack } from "react-icons/io";
import { TypeAnimation } from 'react-type-animation';
import useMobile from '../hooks/useMobile';
const Search = () => {

    const navigate = useNavigate()
    const location = useLocation()
    const [isMobile] = useMobile()
    const [isSearchPage, setSearchPage] = useState(false)
    useEffect(() => {
        const isSearch = location.pathname === "/search"
        setSearchPage(isSearch)
    }, [location])

    const redirectToSearchPage = () => {
        navigate('/search')
    }

    return (
        <div className='w-full min-w-[300px] 
    lg:min-w-[420px] h-10 lg:h-12 rounded-lg border overflow-hidden flex items-center text-neutral-500  bg-slate-100 group focus-within:border-primary-200 '>
            <div>


                {
                    (isMobile && isSearchPage) ? (
                        <Link to={"/"} className='flex justify-center items-center w-fill h-full p-2 cursor-pointer group-focus-within:text-primary-200 '>
                            <IoIosArrowRoundBack size={25} />
                        </Link>

                    ) : (
                        <button className='flex justify-center items-center h-full p-4 cursor-pointer group-focus-within:text-primary-200 '>
                            <FaSearch size={20} />
                        </button>
                    )
                }


            </div>
            <div>
                {
                    !isSearchPage ? (
                        <div onClick={redirectToSearchPage} className='w-full h-full flex items-center '>
                            <TypeAnimation
                                sequence={[
                                    'Search "milk"',
                                    1000,
                                    'Search "roti"',
                                    1000,
                                    'Search "sabji"',
                                    1000,
                                    'Search "paani"',
                                ]}
                                wrapper="span"
                                speed={50}
                                style={{ fontSize: '1em', display: 'inline-block' }}
                                repeat={Infinity}
                            />
                        </div>

                    ) : (
                        <div className='w-fill h-full'>
                            <input
                                type='text'
                                placeholder='Search for anything . . . . .'

                                autoFocus
                                className='w-full h-full text-neutral-500 bg-slate-50 outline-none '
                            />
                        </div>

                    )
                }
            </div>

        </div>
    )
}

export default Search