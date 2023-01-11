import React, { useEffect, useState } from 'react'
// import ImageUploader from "react-images-upload";
import Header from "../components/Header"
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const ChangeInfor: React.FC = () => {
  const [gender, setGender] = useState<any>(undefined)
  const [relationship, setRelationship] = useState<any>(undefined)
  const [description, setDescription] = useState<any>(undefined)
  const [location, setLocation] = useState<any>(undefined)
  const [detaillocation, setDetailocation] = useState<any>(undefined)
  const [phoneNumber, setPhoneNumber] = useState<any>(undefined)
  const [birthday, setBirthday] = useState<any>(undefined)
  const navigate = useNavigate();

  const handle = () => {
    const data = {
      gender: gender,
      relationship: relationship,
      description: description,
      location: location,
      detaillocation: detaillocation,
      phone_number: phoneNumber,
      birth_day: birthday,
    }
    // console.log(data)
    const token = localStorage.getItem('token')
    const config = {
      headers: { 'Authorization': `Bearer ${token}`}
    }

    axios.post('http://localhost:8000/chat-app/userprofile/', data, config,)
      .then((res) => {
        const message = 'Success! You have successfully uploaded'
        toast.success(message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
      });
      setTimeout(() => {
        navigate('/')
      }, 2000)
      })
      .catch((err) => {
        // console.log(err.message)
                    const message = err.message
                    toast.error(message, {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                })
  };

  return (
    <>
    <Header/>
    <div>

      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>

      <div className="mt-10 sm:mt-0 relative  w-4/5 top-20  left-20 bg-[#96b6c8] rounded-lg z-30">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1 flex flex-col justify-between items-center h-full"
            style={{
              backgroundImage: 'url("/image/logo2.png")',
              backgroundSize: '100%',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
            }}
          >

          </div>
          <div className="mt-5 md:col-span-2 md:mt-0">
            <form action="#" method="POST">
              <div className="overflow-hidden shadow sm:rounded-md">
                <div className="bg-white px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <div className="relative z-0 w-full mb-6 group">
                        <input
                          type="text"
                          name="last_name"
                          id="floating_password"
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                        
                          required
                        />
                        <label
                          htmlFor="last_name"
                          className="peer-focus:font-medium absolute md:text-sm text-xs text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          First name
                        </label>
                    </div>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <div className="relative z-0 w-full mb-6 group">
                          <input
                            type="text"
                            name="last_name"
                            id="floating_password"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                          
                            required
                          />
                          <label
                            htmlFor="last_name"
                            className="peer-focus:font-medium absolute md:text-sm text-xs text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                          >
                            Last name
                          </label>
                      </div>
                    </div>

                    <div className="col-span-6 sm:col-span-6">
                      <div className="relative z-0 w-full mb-6 group">
                          <input
                            type="text"
                            name="last_name"
                            id="floating_password"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "

                            required
                          />
                          <label
                            htmlFor="last_name"
                            className="peer-focus:font-medium absolute md:text-sm text-xs text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                          >
                            Email
                          </label>
                      </div>
                    </div>

                    <div className="col-span-6 sm:col-span-6">
                      <div className="relative z-0 w-full mb-6 group">
                          <input
                            type="text"
                            name="last_name"
                            id="floating_password"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            onChange={(e) => {setLocation(e.target.value)}}
                            required
                          />
                          <label
                            htmlFor="last_name"
                            className="peer-focus:font-medium absolute md:text-sm text-xs text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                          >
                            Location
                          </label>
                      </div>
                    </div>
                    <div className="col-span-6 sm:col-span-6">
                      <div className="relative z-0 w-full mb-6 group">
                          <input
                            type="text"
                            name="last_name"
                            id="floating_password"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            onChange={(e) => {setDetailocation(e.target.value)}}
                            required
                          />
                          <label
                            htmlFor="last_name"
                            className="peer-focus:font-medium absolute md:text-sm text-xs text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                          >
                            Detail Location
                          </label>
                      </div>
                    </div>
                    <div className="col-span-6 sm:col-span-6">
                      <div className="relative z-0 w-full mb-6 group">
                          <input
                            type="text"
                            name="last_name"
                            id="floating_password"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            onChange={(e) => {setPhoneNumber(e.target.value)}}
                            required
                          />
                          <label
                            htmlFor="last_name"
                            className="peer-focus:font-medium absolute md:text-sm text-xs text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                          >
                            Phone Number
                          </label>
                      </div>
                    </div>
                    <div className="col-span-6 sm:col-span-6">
                      <div className="relative z-0 w-full mb-6 group">
                          <input
                            type="text"
                            name="last_name"
                            id="floating_password"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            onChange={(e) => {setDescription(e.target.value)}}
                            required
                          />
                          <label
                            htmlFor="last_name"
                            className="peer-focus:font-medium absolute md:text-sm text-xs text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                          >
                            Description
                          </label>
                      </div>
                    </div>

                    <div className="col-span-6 sm:col-span-6">
                      <div className="relative z-0 w-full mb-6 group">
                          <input
                            type="text"
                            name="last_name"
                            id="floating_password"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            onChange={(e) => {setBirthday(e.target.value)}}
                            required
                          />
                          <label
                            htmlFor="last_name"
                            className="peer-focus:font-medium absolute md:text-sm text-xs text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                          >
                            Birthday
                          </label>
                      </div>
                    </div>

                    <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                        Gender
                      </label>
                      <select 
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        onChange={(e) => {setGender(e.target.value)}}
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>
                    <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                        Relationship
                      </label>
                      <select 
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        onChange={(e) => {setRelationship(e.target.value)}}
                      >
                        <option value="Single">Single</option>
                        <option value="Date">Date</option>
                        <option value="Married">Married</option>
                      </select>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                  <div
                    onClick={handle}
                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Save
                  </div>
                </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>
    </div>

    
  </>
  )
}

export default ChangeInfor
