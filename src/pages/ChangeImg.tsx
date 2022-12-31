import React from 'react'
import ImageUploader from "react-images-upload";
import Header from "../components/Header"




const ChangeImg: React.FC = () => {
    const cover = document.getElementsByClassName('file-upload')[0]
   

    return (
        <>
            <Header/>
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
                            <label className="block text-sm font-medium text-gray-700">Photo</label>
                            <div className="mt-1 flex items-center">
                                
                                <ImageUploader
                                    withIcon={false}
                                    withLabel={false}
                                    withPreview={true}
                                    buttonText={"Add photos"}
                                    fileSizeError={"File size is too big!"}
                                    fileTypeError={"This extension is not supported!"}
                                    onChange={(e) => {
                                        console.log(e)
                                    }}
                                />
                            </div>
                            </div>

                            <div>
                                
                            </div>
                        </div>
                        <div className='bg-white pl-3 pr-3 '>
                            <label className="block text-sm font-medium text-gray-700">
                                Cover photo
                            </label>
                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                <div className="space-y-1 text-center">
                                {/* <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="True">
                                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg> */}
                                <div className="flex text-sm text-gray-600">
                                    <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                    <span>Upload a file</span>
                                    <input id="file-upload" name="file-upload" type="file" className="sr-only file-upload"
                                        onChange={(e) => {
                                            console.log(typeof e.target.files)
                                        }}
                                    />
                                    </label>
                                    <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs text-gray-500">
                                    PNG, JPG, GIF up to 10MB
                                </p>
                                </div>
                            </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                                <button
                                type="submit"
                                className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                Save
                                </button>

                            </div>
                        </div>
                    </form>
                    </div>
                </div>

                
            </div>

            
        </>
    )
}

export default ChangeImg
