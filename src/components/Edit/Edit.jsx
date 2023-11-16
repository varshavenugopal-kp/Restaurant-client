import React, { useEffect, useState } from 'react'
import { api } from '../../services/axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark, faPenToSquare, faXmark } from '@fortawesome/free-solid-svg-icons'

const Edit = ({ setEditOpen, restId }) => {
    const [data, setData] = useState({})
    const [fileUrl, setUrl] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const handleFileChange = ((e) => {
        const file = e.target.files?.[0]

        if (file) {
            generateUrl(file)
        } else {
            console.log("nulll");

        }
    })

    const generateUrl = async (img) => {
        setIsLoading(true)
        const datas = new FormData()
        datas.append('file', img)
        datas.append('upload_preset', 'user_doc')
        datas.append('cloud_name', "dn6cqglmo")

        const { data } = await api.post("https://api.cloudinary.com/v1_1/dn6cqglmo/image/upload", datas)


        setUrl(data.url)
        setIsLoading(false)
        return data.url

    }

    const closeModal = () => {
        setEditOpen(false);

    };

    const modalClose = () => {
        setEditOpen(false);
        window.location.reload();
    }

    useEffect(() => {
        fetchData()
    }, [])
    const fetchData = (async () => {
        const response = await api.get(`/single/${restId}`)
        console.log("ooooooooooooooooooooooooooooooooooooooo",response);
        setData(response.data.data)
    })
   console.log("uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu",data);
    const handleEdit = async (e) => {
        e.preventDefault();
        try {


            let updatedData
            if (fileUrl) {
                updatedData = { ...data, image: fileUrl };
            } else {
                updatedData = { ...data };
            }


            const { data: responseData } = await api.patch('/editData', { ...updatedData, id: restId });


            console.log(responseData);
            modalClose()

        } catch (error) {

            console.error("Error occurred:", error);
        }
    }

    const addDetails = ((e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    })


    return (
        <div>
            <div className="fixed inset-0 flex items-center justify-center z-50">

                <div className="bg-white p-5 rounded-lg shadow-lg w-1/3">
                    <div>
                        <div className='flex justify-end'>
                            <button onClick={() => closeModal()}><FontAwesomeIcon icon={faXmark}></FontAwesomeIcon></button>
                        </div>
                        <div className='text-center'>
                            <h1 className='font-bold text-2xl'>Edit Restaurant</h1>

                        </div>

                    </div>


                    <form className='' onSubmit={handleEdit}>
                        <div className='w-full mt-5'>


                            <div>
                                <input type='text' className='shadow appearance-none border rounded w-full py-2 px-3 h-9' name='name' value={data?.name} onChange={addDetails} ></input>
                            </div>
                        </div>

                        <div className='w-full mt-5'>

                            <div className='w-full'>
                                <textarea name='address' className='shadow appearance-none border rounded w-full py-2 px-3 h-24' value={data?.address} onChange={addDetails}></textarea>
                            </div>
                        </div>
                        <div className='w-full mt-5'>

                            <div>
                                <input type='text' className='shadow appearance-none border rounded w-full py-2 px-3 h-9' name='contact' value={data?.contact} onChange={addDetails}></input>
                            </div>
                        </div>
                        <div className='w-full mt-5'>
                            <div className='w-full mt-5'>

                                <div className='w-full'>
                                    <textarea name='description' className='shadow appearance-none border rounded w-full py-2 px-3 h-24' value={data?.description} onChange={addDetails}></textarea>
                                </div>
                            </div>


                        </div>



                        {
                            fileUrl ?
                                <div className='relative w-full overflow-x-scroll flex scrollbar gap-2  py-2 px-1'>
                                    <FontAwesomeIcon onClick={() => setUrl(null)} className='fixed text-xl' icon={faCircleXmark} />
                                    <img src={fileUrl} className='pt-6 h-24' />

                                </div> :
                                <div className='relative w-full overflow-x-scroll flex scrollbar gap-2  py-2 px-1'>
                                    <label htmlFor="file_upload" className="cursor-pointer">
                                        <FontAwesomeIcon className='fixed text-sm' icon={faPenToSquare} />
                                    </label>
                                    <input id="file_upload" type="file" accept="image/*" name="file_upload" className="hidden" onChange={handleFileChange} />
                                    <img src={data?.image} className='pt-6 h-24  bg-gray-300' />
                                </div>
                        }
                        <button className='bg-sky-950 text-white py-2 px-6 text-sm rounded-md' >Edit</button>


                    </form>
                </div>
            </div>
        </div>
    )
}

export default Edit
