import React, { useEffect, useState } from 'react'
import { api } from '../../services/axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const Single = ({selectOpen,restId}) => {
    const [data,setData]=useState()
    const closeModal = () => {
        selectOpen(false);
    };

    useEffect(()=>{
        fetchData()
    },[])
    const fetchData=(async()=>{
       console.log("kkkkkkkkkkkkkkkkkkkkkkk",restId);
        const response = await api.get(`http://localhost:8000/single/${restId}`)
       
        setData(response.data.data[0])
    })
   
  return (
    <div>
      <div>
           {data && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white p-5 rounded-lg shadow-lg w-1/3">
                        <div>
                            <div className="flex justify-end">
                                <button onClick={() => closeModal()}>
                                    <FontAwesomeIcon icon={faXmark} />
                                </button>
                            </div>
                        </div>
                        <div>
                            <img className="h-2/4 w-full" src={data.image} alt="Task Image" />
                        </div>
                        <div>
                            <p className="text-lg font-semibold">{data.name}</p>
                        </div>
                        <div>
                            <p className="text-lg">{data.description}</p>
                        </div>
                        <div>
                            <p className="text-xs">{data.address}</p>
                        </div>
                        <div>
                            <p className="text-xs">{data.contact}</p>
                        </div>
                      
                    </div>
                </div>
            )}
    </div>
    </div>
  )
}

export default Single
