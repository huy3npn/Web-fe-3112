import React, {useState, useEffect} from 'react'
import ImageUploader from "react-images-upload";
import Header from "../components/Header"
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


const ChangeImgCover: React.FC = () => {
    const [avatar, setAvatar] = useState<any>(undefined)
    const [cover, setCover] = useState<any>(undefined)
    const navigate = useNavigate();

    const handleSubmit = () => {
        // const data = {
        //     title : '1233212131321',
        //     images1: avatar,
        // }

        const token = localStorage.getItem('token')
        const config = {
            headers: { 
                'Authorization': `Bearer ${token}`,
                'Content-type': 'multipart/form-data'
            }
        }

        if (avatar) {
            let formData = new FormData();
            formData.append("images2", avatar);
            formData.append("title", "cover");
    
            axios.post('http://localhost:8000/chat-app/imageupload2/', formData, config,)
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
                    console.log(err.message)
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
        }

        if (cover) {
            
        }
    }

    const onChange = (imageList: any, addUpdateIndex: any) => {
        // data for submit
        console.log(imageList[0], addUpdateIndex);
        setAvatar(imageList[0]);
    };

    const onChangeCover = (e: any) => {
        setAvatar(e.target.files)
        console.log(cover)
    }

    return (
        <>
            <Header/>
            <ToastContainer/>
            <div className='relative  w-4/5 top-20  left-20 bg-[#96b6c8] rounded-lg z-50' >
                <div className="md:grid md:grid-cols-3 md:gap-6">
                    <div className="md:col-span-1 flex flex-col justify-between items-center h-full"
                        style={{
                            backgroundImage: 'url("/image/logo2.png")',
                            backgroundSize: '60%',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center',
                        }}
                    >
                        
                    </div>
                    <div className="mt-5 md:col-span-2 md:mt-0">
                    <form action="#" method="POST">
                        <div className="shadow sm:overflow-hidden sm:rounded-md">
                        <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                            <div className="grid grid-cols-3 gap-6">
                            
                            </div>

                            <div>
                            
                            
                            </div>

                            <div>
                            <label className="block text-sm font-medium text-gray-700">Cover</label>
                            <div className="mt-1 flex items-center">
                                
                                <ImageUploader
                                    withIcon={false}
                                    withLabel={false}
                                    withPreview={true}
                                    buttonText={"Add photos"}
                                    fileSizeError={"File size is too big!"}
                                    fileTypeError={"This extension is not supported!"}
                                    onChange={onChange}
                                />
                            </div>
                            </div>

                            <div>
                                
                            </div>
                        </div>
                            <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                                <div
                                    onClick={handleSubmit}
                                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    Save
                                </div>

                            </div>
                        </div>
                    </form>
                    </div>
                </div>

                
            </div>

            
        </>
    )
}

export default ChangeImgCover
