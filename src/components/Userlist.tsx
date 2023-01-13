import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

// import { GiPathDistance } from "react-icons/gi";
// import { CiLocationOn } from "react-icons/ci"
import axios from 'axios';
// import { getDefaultNormalizer } from '@testing-library/react';
import Header from './Header';

import "../css/main.css"
import { positions } from 'react-alert';

const Userlist : React.FC = () => {
    
    const [users, setUsers] = useState([])
    const negative = useNavigate();
    const [data, setData] = useState<any>(undefined)
    
    // ------------------------------------------------------------------------------------------
    const [Users1, setUsers1] = useState<any>(undefined)
    const [local, setLocal] = useState<any>(undefined)
    const [latitude, setLatitude] = useState(undefined)
    const [longitude, setLongitude] = useState(undefined)

    const [searchName, setSearchName] = useState<string>("All")

    const [searchItems, setSearchItems] = useState<any>(undefined)

    const [dataUsers, setDataUsers] = useState<any>(undefined)

    const [avatar, setAvatar] = useState<any>(undefined)

    const showPosition = (position: any) => {
        // console.log(position.coords.latitude,  position.coords.longitude)
        setLatitude(position.coords.latitude.toString())
        setLongitude(position.coords.longitude.toString())
    }

    const alertPermission = () => {
        alert('Bạn phải bật vị trí')
    }

    useEffect(() => {
        const token = localStorage.getItem('token')
        const config = {
            headers: { 
              Authorization: `Bearer ${token}`,                 
            }
        }

        axios.get('https://project-ltw-final.onrender.com/chat-app/users/', config)
          .then((res) => {
              setUsers1(res.data)
              console.log(Users1)
          })
          .catch((err) => {
            console.log(err.message)
          })

        axios.get('https://project-ltw-final.onrender.com/chat-app/userprofile/', config)
            .then((res) => {
                console.log(res.data)
                setDataUsers(res.data)
            })
            .catch((err) => {
                console.log(err.log)
            })
        axios.get('https://project-ltw-final.onrender.com/chat-app/images/')
            .then((res) => {
                setAvatar(res.data)
            }) 
            .catch((err) => {
                console.log(err.message)
            })

    }, [])

    useEffect(() => {
        if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, alertPermission);
        } else {
        // console.log('error')
        }
    }, [])

    useEffect(() => {
        (async () => {
            const res = await axios.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=vi`)
            setLocal(res.data)
        })()
    }, [])

    if (local) {
        // console.log(local.localityInfo.administrative)
        var location = local.localityInfo.administrative
        const diachi = location.map((el: any) => {
        return el.name.toString()
        })

        const uniqueArray = diachi.filter(function(item: any, pos:any) {
        return diachi.indexOf(item) == pos;
        })


        var name = uniqueArray.reverse().join(', ')
        // console.log(name)
    }

    // useEffect(() => {
    //     const token = localStorage.getItem('token')
    //     const config = {
    //         headers: { Authorization: `Bearer ${token}` }
    //     };
    //     axios.get("https://project-ltw-final.onrender.com/chat-app/location/", config)
    //     .then(res => {
    //         setUsers(res.data)
    //         console.log(res.data[0].error)
    //     })
        
    // },[])
    
    const dataUser = [
        {
            photo: 'https://mona.media/wp-content/uploads/2019/09/livechat-la-gi.png',
            name: 'root',
            position: 'Thủ Đức, TP Hồ Chí Minh',
            distance: '10',
        },
        {
            photo: 'https://scontent.fsgn19-1.fna.fbcdn.net/v/t39.30808-6/279407234_2060603907456508_5430739200819562663_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=174925&_nc_ohc=m1WAcWM9vjEAX9vuPAv&_nc_ht=scontent.fsgn19-1.fna&oh=00_AfDIL544i_IjtaBAjYVjB0X-V_BZsfrQHD9qb4CTgAHiGQ&oe=63B560D7',
            name: 'luc',
            position: 'Dĩ An, Bình Dương',
            distance: '20',
        },
        {
            photo: 'https://scontent.fsgn19-1.fna.fbcdn.net/v/t1.6435-1/33987324_2012795835705057_1597192341884502016_n.jpg?stp=dst-jpg_p320x320&_nc_cat=102&ccb=1-7&_nc_sid=7206a8&_nc_ohc=9mQIUXCi1M8AX9sknoC&tn=hers0_I6UPC7Mh1M&_nc_ht=scontent.fsgn19-1.fna&oh=00_AfCDmi3PebpvUXjYbV7IJixYa5PFYyDx3QQTFnQE_veKEA&oe=63D6E82C',
            name: 'huyen',
            position: 'Tân Phú, TP Hồ Chí Minh',
            distance: '30',
        },
    ]


    useEffect(() => {
        if (dataUser) {
          setSearchItems(dataUser)
        }
    }, [])

    const searchFunction = (seachName: string) => {
        if (dataUser) {
          if (searchName === "All" || searchName.length === 1) {
            setSearchItems(dataUser)
          } else {
            const search = dataUser.filter((user:any) => {
                // console.log(user.name)
                return user.name.toLowerCase().includes(searchName.toLowerCase())
            })
            setSearchItems(search)
          }
        }
        // console.log(searchItems)
    }

    const findAvt = (id: any) => {
        if (avatar) {
          const result = avatar.find((x:any) => x.id == id)
          console.log(result)
          return result.images1
        }
        else {
          // console.log("No avt found")
        }
    }

    const findUsername = (id: any) => {
        if (Users1) {
          const result1 = Users1.find((x:any) => x.id == id)
          console.log(result1)
          return result1.username
        }
        else {
          // console.log("No avt found")
        }
    }


    // if (dataUsers) {
    //     setList(dataUsers.map((el: any, index:any) => {
    //         return {
    //             username: findUsername(el.id),
    //             photo: findAvt(el.id),
    //             position: 'Dĩ An, Bình Dương',
    //             distance: '20',
    //         }
    //     }))
    //     console.log(list)
    // }

//   ============================================================

    
    return (
        <>
            <Header/>
            <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5">
                <div className="mb-1 w-full">
                    <div className="mb-4">
                        {/* <nav className="flex mb-5" aria-label="Breadcrumb">
                            <ol className="inline-flex items-center space-x-1 md:space-x-2">
                            <li 
                                className="inline-flex items-center" 
                                onClick={
                                    handleBackHome
                                }
                            >
                                <a href="#" className="text-gray-700 hover:text-gray-900 inline-flex items-center">
                                <svg className="w-5 h-5 mr-2.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
                                Back to messages
                                </a>
                            </li>

                           
                            </ol>
                        </nav> */}
                        <h1 
                            className="text-xl sm:text-2xl font-semibold text-gray-900"
                            style={{
                                marginTop: '80px'
                            }}
                        >
                            All users
                        </h1>
                    </div>
                    <div className="sm:flex">
                        <div className="hidden sm:flex items-center sm:divide-x sm:divide-gray-100 mb-3 sm:mb-0">
                            <form className="lg:pr-3" action="#" method="GET">
                            <label className="sr-only">Search</label>
                            <div className="mt-1 relative lg:w-64 xl:w-96">
                                <input 
                                    type="text" 
                                    name="email" 
                                    id="users-search" 
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" 
                                    placeholder="Search for users"
                                    onChange={(e:any) => {
                                        searchFunction(e.target.value)
                                        // console.log(e.target.value)
                                        setSearchName(e.target.value)
                                    }}
                                />
                            </div>
                            </form>
                            <div className="flex space-x-1 pl-0 sm:pl-2 mt-3 sm:mt-0">
                                <a href="#" className="text-gray-500 hover:text-gray-900 cursor-pointer p-1 hover:bg-gray-100 rounded inline-flex justify-center">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"></path></svg>
                                </a>
                                <a href="#" className="text-gray-500 hover:text-gray-900 cursor-pointer p-1 hover:bg-gray-100 rounded inline-flex justify-center">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                                </a>
                                <a href="#" className="text-gray-500 hover:text-gray-900 cursor-pointer p-1 hover:bg-gray-100 rounded inline-flex justify-center">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                                </a>
                                <a href="#" className="text-gray-500 hover:text-gray-900 cursor-pointer p-1 hover:bg-gray-100 rounded inline-flex justify-center">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path></svg>
                                </a>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2 sm:space-x-3 ml-auto">
                            
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col">
                <div className="overflow-x-auto">
                    <div className="align-middle inline-block min-w-full">
                        <div className="shadow overflow-hidden">
                            <table className="table-fixed min-w-full divide-y divide-gray-200 border-collapse border border-slate-200 ">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase">
                                            Name
                                        </th>
                                        <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase">
                                            
                                            Position
                                        </th>
                                        <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase">
                                            Distance
                                        </th>
                                        <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase">
                                            Status
                                        </th>
                                        <th scope="col" className="p-4">
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {dataUsers && dataUsers.map((el: any, index: any) => (
                                        <tr className="hover:bg-gray-100" key={index}>
                                            <td className="p-4 flex items-center whitespace-nowrap space-x-6 mr-12 lg:mr-0">
                                                {/* <img className="h-10 w-10 rounded-full" src={el.avt} alt={`${el.name} avatar`}/> */}
                                                <img className="h-10 w-10 rounded-full" src={findAvt(el.id)} alt={`${el.name} avatar`}/>
                                                <div className="text-sm font-normal text-gray-500">
                                                    <div className="text-base font-semibold text-gray-900">{`${findUsername(el.id)}`}</div>
                                                    
                                                </div>
                                            </td>
                                            {/* <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">{el.location}</td> */}
                                            <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">{el.location}</td>
                                            <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">{Math.round(el.distance)}km</td>
                                            <td className="p-4 whitespace-nowrap text-base font-normal text-gray-900">
                                                <div className="flex items-center">
                                                    <div className="h-2.5 w-2.5 rounded-full bg-green-400 mr-2 ml-2">  </div>  
                                                    Độc thân
                                                </div>
                                            </td>
                                            <td className="p-4 whitespace-nowrap space-x-2">
                                                <button 
                                                    type="button" 
                                                    data-modal-toggle="user-modal" 
                                                    className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center"
                                                    onClick={() => {
                                                        negative(`/profile/${findUsername(el.id)}/${el.id}`)
                                                    }}
                                                >
                                                    <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd"></path></svg>
                                                    Profile
                                                </button>
                                                
                                            </td>
                                        </tr>
                                    ))}
                                    
                                    
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <div className="hidden overflow-x-hidden overflow-y-auto fixed top-4 left-0 right-0 md:inset-0 z-50 justify-center items-center h-modal sm:h-full" id="user-modal">
                <div className="relative w-full max-w-2xl px-4 h-full md:h-auto">

                    <div className="bg-white rounded-lg shadow relative">
                        
                        
                        
                        
                    </div>
                </div>
            </div>

        </>
    )
}

export default Userlist