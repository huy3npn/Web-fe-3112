import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'


const Profile : React.FC = () => {
    const [addFriend, setAddFriend] = useState<boolean>(true) 
    const [collor, setCollor] = useState<string>('bg-red-500 active:bg-pink-600')
    let { username } = useParams();
    let { id } = useParams();
    
    const [dataUsers, setDataUsers] = useState<any>(undefined)

    const [avatar, setAvatar] = useState<any>(undefined)

    const [Users1, setUsers1] = useState<any>(undefined)

    const [cover, setCover] = useState<any>(undefined)

    const user1 = {
        name: 'Võ Đắc Lực',
        avt: 'https://scontent.fsgn4-1.fna.fbcdn.net/v/t39.30808-6/314657475_2215137945336436_1796223546990780693_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=zJBtA2agvisAX_wfMfL&_nc_ht=scontent.fsgn4-1.fna&oh=00_AfDf1drS_nTB8hb77HGM84Y4wNPzxNegbXS7ZnpLA0BzNw&oe=637F8502',
        cover: 'https://scontent.fsgn3-1.fna.fbcdn.net/v/t39.30808-6/315093257_2217312918452272_2951054123476202727_n.jpg?stp=dst-jpg_p960x960&_nc_cat=104&ccb=1-7&_nc_sid=e3f864&_nc_ohc=K87oE-wkwIEAX-fvOYP&_nc_ht=scontent.fsgn3-1.fna&oh=00_AfC695nOrqqqaifQjEzu30BhSjsgzxH9quxNJinmXV5exA&oe=63801DFA',
        location: 'Dĩ An, Bình Dương',
        distance: '2 km',
        career: 'Front-end Developer',
        workplace: 'University of Information Technology',
        description: 'Độc thân, vui tính và thích nhảy Hip hop',
        marital: 'Độc thân',
        id: 1,
    }

    const [user, setUser] = useState<any>(undefined)

    useEffect(() => {
        const token = localStorage.getItem('token')
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
    
        axios.get('https://project-ltw-final.onrender.com/chat-app/users/', config)
            .then((res) => {
                setUsers1(res.data)
                console.log(res.data)
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
                console.log(res.data)
            }) 
            .catch((err) => {
                console.log(err.message)
            })

        axios.get('https://project-ltw-final.onrender.com/chat-app/imageupload2/', config)
            .then((res) => {
                console.log(res.data)
                setCover(res.data)
            })
            .catch((err) => {
                console.log(err.log)
            })
    },[])
    
    // console.log(user)
    const findAvt = (id: any) => {
        if (avatar) {
          const result = avatar.find((x:any) => x.id == id)
          console.log(result)
          console.log(username)
          return result.images1
        }
        else {

        }
    }

    const findCover = (id: any) => {
        if (cover) {
          const result = cover.find((x:any) => x.id == id)
          console.log(result)
          return result.images2
        }
        else {

        }
    }

    const findUsername = (id: any) => {
        if (Users1) {
          const result1 = Users1.find((x:any) => x.id == id)
          console.log(result1)
          return result1.username
        }
        else {
     
        }
    }

    const findLocation = (id: any) => {
        if (dataUsers) {
          const result1 = dataUsers.find((x:any) => x.id == id)
          console.log(result1)
          return result1.location
        }
        else {
        
        }
    }

    const findPhoneNumber = (id: any) => {
        if (dataUsers) {
          const result1 = dataUsers.find((x:any) => x.id == id)
          console.log(result1)
          return result1.phone_number
        }
        else {
    
        }
    }

    const findDes = (id: any) => {
        if (dataUsers) {
          const result1 = dataUsers.find((x:any) => x.id == id)
          console.log(result1)
          return result1.phone_number
        }
        else {
 
        }
    }
    
    const handleAddFriend = (event: React.SyntheticEvent) => {
        setAddFriend(false)
        setCollor('bg-blue-600 active:bg-pink-60')
        const message = 'hello'
        if (message) {
            event.preventDefault();
            const datalog = JSON.stringify({
              'text': message,
              'receiver': username
            })
            const token = localStorage.getItem('token')

            const config = {
              headers: { 
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',                  
              }
            };
            axios.post(`  https://project-ltw-final.onrender.com/chat-app/message/`, datalog, config)
              .then((response) => {
                // // console.log('doroi')
              })
          }
    }

    return (
        <div>
            {dataUsers && avatar && Users1 ? (<div className='h-screen overflow-hidden flex items-center justify-center' style={{background: "#f1f5f9"}}>
                <main className="profile-page">
                    <section className="relative block h-500-px">
                        <div 
                            className="absolute top-0 w-full h-full bg-center bg-cover" 
                            style={{backgroundImage: `url(${findCover(id)})`}}     
                        >
                        <span id="blackOverlay" className="w-full h-full absolute opacity-50 bg-black"></span>
                        </div>
                        <div className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px" style={{transform: 'translateZ(0px)'}}>
                        <svg 
                            className="absolute bottom-0 overflow-hidden" 
                            xmlns="http://www.w3.org/2000/svg" 
                            preserveAspectRatio="none" 
                            version="1.1" 
                            viewBox="0 0 2560 100" 
                            x="0" y="0"
                        >
                            <polygon className="text-blueGray-200 fill-current" points="2560 0 2560 100 0 100"></polygon>
                        </svg>
                        </div>
                    </section>
                    <section className="relative py-16 bg-blueGray-200">
                        <div className="container mx-auto px-4">
                        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                            <div className="px-6">
                            <div className="flex flex-wrap justify-center">
                                <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                                <div className="relative">
                                    <img 
                                        alt="..." 
                                        src={findAvt(id)}
                                        className="shadow-xl rounded-full h-158 w-158 align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                                    />
                                </div>
                                </div>
                                <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                                <div className="py-6 px-3 mt-32 sm:mt-0">
                                    <div 
                                        className={`${collor} uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150`} 
                                        style={{
                                            float: 'right',
                                        }}
                                        onClick={handleAddFriend}
                                    >
                                    {addFriend ? 'Thêm bạn bè' : 'Đã gửi lời mời kết bạn'}
                                    </div>
                                </div>
                                </div>
                                <div className="w-full lg:w-4/12 px-4 lg:order-1">
                                <div className="flex justify-center py-4 lg:pt-4 pt-8">
                                    <div className="mr-4 p-3 text-center">
                                    <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600"></span><span className="text-sm text-blueGray-400"></span>
                                    </div>
                                    <div className="mr-4 p-3 text-center">
                                    <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600"></span><span className="text-sm text-blueGray-400"></span>
                                    </div>
                                    <div className="lg:mr-4 p-3 text-center">
                                    <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600"></span><span className="text-sm text-blueGray-400"></span>
                                    </div>
                                </div>
                                </div>
                            </div>
                            <div className="text-center mt-12">
                                <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                                {`${findUsername(id)}`}
                                </h3>
                                <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                                <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                                {`${findLocation(id)}`}
                                </div>
                                <div className="mb-2 text-blueGray-600 mt-10">
                                <i className="fas fa-phone mr-2 text-lg text-blueGray-400"></i>
                                {`${findPhoneNumber(id)}`}
                                </div>
                            </div>
                            <div className="mt-10 py-10 border-t border-blueGray-200 text-center" style={{width: '1450px'}}>
                                <div className="flex flex-wrap justify-center">
                                <div className="w-full lg:w-9/12 px-4">
                                    <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                                    {findDes(id)}
                                    </p>
                                    <a href="#pablo" className="font-normal text-pink-500">Show more</a>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </section>
                </main>
            </div>) : ('')}
        </div>
    )
}

export default Profile