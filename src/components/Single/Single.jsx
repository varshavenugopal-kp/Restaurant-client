import React, { useEffect, useState } from 'react'
import { api } from '../../services/axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const Single = ({ selectOpen, restId }) => {
    const [data, setData] = useState()
    const closeModal = () => {
        selectOpen(false);
    };




    useEffect(() => {
        fetchData()
    }, [])
    const fetchData = (async () => {

        const response = await api.get(`/single/${restId}`)

        setData(response.data.data[0])
    })

    return (
        <div>
            <div>
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    {data && (
                        <div className="bg-white p-5 rounded-lg shadow-lg w-1/4">
                            <div>
                                <div className="flex justify-end">
                                    <button onClick={() => closeModal()}>
                                        <FontAwesomeIcon icon={faXmark} />
                                    </button>
                                </div>
                            </div>
                            <div>
                                <p className="text-lg font-semibold">{data.name}</p>
                            </div>
                            <div>
                                <img className=" w-full object-cover mt-2" src={data.image} alt="Task Image" />
                            </div>

                            <div>
                                <h1 className='font-semibold'>CONTACT</h1>
                            </div>

                            {data.address && (
                                <div>
                                    {data.address.split(',').map((line, index) => (
                                        <p key={index} className="text-sm">{line.trim()}</p>
                                    ))}
                                </div>
                            )}
                            <div>
                                <p className="text-sm font-semibold">PH:{data.contact}</p>
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </div>
    )
}

export default Single
