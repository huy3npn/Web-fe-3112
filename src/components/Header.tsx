import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const Header: React.FC = () => {
  const navigate = useNavigate()
  const [toggle, setToggle] = useState<boolean>(false);
  const [toggle1, setToggle1] = useState<boolean>(false);
  const [myself, setMyself] = useState<any>(null)


  const handleToggle = () => {
    setToggle(!toggle)
  }
  const handleToggle1 = () => {
    setToggle1(!toggle1)
  }

  useEffect(() => {
    setMyself(JSON.parse(localStorage.getItem('user') || ''))
    // // console.log(myself)
  },[])

  const handleUsers = () => {
    navigate('/users')
  }

  const handleLogout = () => {
      const token = localStorage.getItem('token')
        const helo = {
            headers: { 'Authorization': `Bearer ${token}` }
        };
        axios.post("https://project-ltw-final.onrender.com/chat-app/logout/?format=json",{}, helo)
        .then((res) => {
          // // console.log(res);
          if (res.data.message === 'logout') {
            localStorage.setItem('token', '')
            localStorage.setItem('user', '')
            navigate("/signup")
          } else {
          }
        })

      
    
  }

  return (
    <>     
      <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900 fixed w-full top-0 nav_bar" >
        <div className="container flex flex-wrap items-center justify-between mx-auto">
        <a href="/" className="flex items-center">
            <img src="/image/logo2.png" className="h-6 mr-3 sm:h-9" alt="" />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Live Chat</span>
        </a>
        <div className="flex items-center md:order-2">
            <button type="button" className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom" onClick={handleToggle}>
              <span className="sr-only">Open user menu</span>
              <img 
                className="w-8 h-8 rounded-full" 
                src="/image/logo2.png" 
                alt="user photo"
              />
            </button>
            <div 
              className={toggle ? 
                (`z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded  dark:bg-gray-700 dark:divide-gray-600  `) : 
                (`z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded  dark:bg-gray-700 dark:divide-gray-600 hidden`)}
              id="user-dropdown"
              style={{
                backgroundColor: '#fff',
                width: "208px",
                float: "right",
                position: "fixed",
                zIndex: "999",
                inset: "0px auto auto 0px",
                marginLeft: 'auto',
                marginRight: '0',
                top: '62px',
                right: '20px',
                // transform: "translate(calc(1483px), 60px)"
              }}
              data-popper-placement="bottom"
            >
              <div className="px-4 py-3">
                  {myself ? (<span className="block text-sm font-medium text-gray-500 truncate dark:text-gray-400">{myself.name}</span>): 
                    (<span className="block text-sm font-medium text-gray-500 truncate dark:text-gray-400">name@flowbite.com</span>)
                  }
                  
                  
              </div>
              <ul className="py-1" aria-labelledby="user-menu-button">
                <li>
                  <a href="/ChangeImgAvt" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Set avatar</a>
                </li>
                <li>
                  <a href="/ChangeImgCover" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Set Cover</a>
                </li>
                <li>
                  <a href="/changepass" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Change password</a>
                </li>
                <li>
                  <a 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white cursor-pointer"
                    onClick={handleLogout}
                  >
                    Sign out
                  </a>
                </li>
              </ul>
            </div>

            <button data-collapse-toggle="mobile-menu-2" type="button" className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded="true" onClick={handleToggle1}>
              <span className="sr-only">Open main menu</span>
              <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
          </button>
        </div>
        <div 
          className={toggle1 ? ("items-center justify-between block w-full md:flex md:w-auto md:order-1 z-50"): ("items-center justify-between hidden w-full md:flex md:w-auto md:order-1 z-50")} 
          id="mobile-menu-2"
        >
          <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <a href="/" className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white" aria-current="page">Home</a>
            </li>
            <li>
              <a href="/users" className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">See all friend</a>
            </li>
            <li>
              <a href="/changeinfor" className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">About</a>
            </li>
          </ul>
        </div>
        </div>
      </nav>


    </>
  )
};

export default Header;
