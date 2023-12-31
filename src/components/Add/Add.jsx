import React, { useState } from 'react'
import { api } from '../../services/axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark, faXmark } from '@fortawesome/free-solid-svg-icons'
import '../Add/Add.css'

const Add = ({ setAddOpen }) => {
    const [fileUrl, setUrl] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [pdata, setData] = useState()

    const closeModal = () => {

        setAddOpen(false);
    };

    function modalClose() {
        setAddOpen(false);
        window.location.reload();
    }

    const handleFileChange = ((e) => {
        const file = e.target.files?.[0]

        if (file) {
            generateUrl(file)
        } else {
            console.log("nulll");

        }
    })

    const addRest = ((e) => {
        setData({ ...pdata, [e.target.name]: e.target.value })
    })


    const generateUrl = async (img) => {
        setIsLoading(true)
        const datas = new FormData()
        datas.append('file', img)
        datas.append('upload_preset', 'user_doc')
        datas.append('cloud_name', "dn6cqglmo")

        const { data } = await api.post("https://api.cloudinary.com/v1_1/dn6cqglmo/image/upload", datas)
        console.log("urls:", data);


        setUrl(data.url)
        setIsLoading(false)
        return data.url

    }


    const handleAdd = async (e) => {
        e.preventDefault()
        try {
            const { data } = await api.post('/add', { ...pdata, image: fileUrl });
            // setData((prevData) => [...prevData, data]);
            modalClose()

        } catch (error) {

            console.error('Error occurred while adding data:', error);
        }
    }

    return (
        <div>
            <div className="fixed inset-0 flex items-center justify-center z-50">

                <div className="bg-white p-5 rounded-lg shadow-lg w-1/3">
                    <div>
                        <div className='flex justify-end'>
                            <button onClick={() => closeModal()}><FontAwesomeIcon icon={faXmark}></FontAwesomeIcon></button>
                        </div>
                        <div className='text-center'>
                            <h1 className='font-bold text-2xl'>Add a Restaurant</h1>

                        </div>

                    </div>


                    <form className='' onSubmit={handleAdd}>
                        <div className='w-full mt-5'>


                            <div>
                                <input type='text' className='shadow appearance-none border rounded w-full py-2 px-3 h-9' name='name' onChange={addRest} placeholder='Enter name' required></input>
                            </div>
                        </div>

                        <div className='w-full mt-5'>

                            <div className='w-full'>
                                <textarea name='address' className='shadow appearance-none border rounded w-full py-2 px-3 h-24' onChange={addRest} placeholder='Add Address' required></textarea>
                            </div>
                        </div>
                        <div className='w-full mt-5'>

                            <div className='w-full mt-5'>


                                <div>
                                    <input type='text' className='shadow appearance-none border rounded w-full py-2 px-3 h-9' name='contact' onChange={addRest} placeholder='Enter Phone' required></input>
                                </div>
                            </div>
                            <div className='w-full mt-5'>

                                <div className='w-full'>
                                    <textarea name='description' className='shadow appearance-none border rounded w-full py-2 px-3 h-24' onChange={addRest} placeholder='Add Description' required></textarea>
                                </div>
                            </div>
                        </div>


                        <div className="max-w-xl mt-9">

                            {
                                fileUrl ?
                                    <div className='relative w-full overflow-x-scroll flex scrollbar gap-2  py-2 px-1'>
                                        <FontAwesomeIcon onClick={() => setUrl(null)} className='fixed text-xl' icon={faCircleXmark} />
                                        <img src={fileUrl} className='pt-6 h-24' />

                                    </div>
                                    :
                                    <label
                                        className="flex justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
                                        <span className="flex items-center space-x-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24"
                                                stroke="currentColor" stroke-width="2">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                            </svg>
                                            <span className="font-medium text-gray-600">

                                                <span className="text-blue-600 underline">browse</span>
                                            </span>
                                        </span>
                                        <input type="file" accept="image/*" name="file_upload" className="hidden" onChange={handleFileChange} required />
                                    </label>
                            }


                            <div className='flex justify-center mt-8'>
                                {isLoading ?
                                    <div className="loader">
                                        <div className="loader__circle"></div>
                                        <div className="loader__circle"></div>
                                        <div className="loader__circle"></div>
                                        <div className="loader__circle"></div>
                                    </div>
                                    :
                                    <button className='bg-sky-950 text-white py-2 px-6 text-sm rounded-md' >Add</button>

                                }

                            </div>

                        </div></form>
                </div>
            </div>

        </div>
    )
}

export default Add
