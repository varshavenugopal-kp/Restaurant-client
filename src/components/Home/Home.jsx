import React, { useEffect, useState } from 'react'
import { api } from '../../services/axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import Add from '../Add/Add'
import Single from '../Single/Single'
import Edit from '../Edit/Edit'
import '../Home/Home.css'

const Home = () => {
    const [addOpen, setAddOpen] = useState(false)

    const [editOpen, setEditOpen] = useState(false)

    const [select, selectOpen] = useState()

    const [restId, setrestId] = useState()

    const [data, setData] = useState()

    // const [prio,setPrio]=useState()

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await api.get('/');

            if (response.data && response.data.data) {
                setData(response.data.data);
            }
        } catch (error) {
            console.error('Error occurred while fetching data:', error);

        }
    };

    const modalOpen = () => {
        setAddOpen(true)
    }
    const editModal = () => {
        setEditOpen(true)
    }
    const handleSelect = (restId) => {

        selectOpen(restId)
        setrestId(restId)
    }
    const handleClick = (restId) => {

        setEditOpen(true)
        setrestId(restId)
    }


    const handledelete = async (restId) => {
        try {

            await api.delete('/delete', { id: restId });
            const updatedData = data.filter((rest) => rest.id !== restId);
            setData(updatedData);
        } catch (error) {
            console.error('Error occurred while deleting data:', error);

        }
    }
    console.log(restId);
    return (
        <div>

            <nav className='shadow-md bg-sky-950 h-20'>

            </nav>
            <div>
                <h1 className='text-2xl font-bold text-red-950 items-center pt-3'>RESTAURANTS IN INDIA</h1>
            </div>
            <div>
                <p className='text-justify p-5 mx-auto'>
                    India is also famous for its distinctive cuisine, which is uniquely different from other parts of Indian cooking. India cuisine truly reflects the rich diversity of its agricultural products. Religious and cultural factors also play a significant role in the variety of cuisine in India. Coconut, an integral part of their lives, is used in various forms in cuisine. A second essential ingredient is seafood, which is used in Kerala's traditional cuisine. Curry leaves, tamarind, chilies, mustard seeds, and asafetida are the vital ingredients of spicy Kerala dishes. Rice is the staple food of Keralites and is eaten in different forms in the main course, snacks, and breakfast.
                </p>
            </div>

            <div className='flex justify-between p-4'>
                <div className='w-32 h-10 bg-sky-900 mt-7 cursor-pointer' onClick={() => modalOpen()}><h1 className='text-white pt-2 px-2'>Add Restaurant</h1></div>
                <div>

                    <div className='w-full mt-5'>


                    </div>
                </div>
            </div>

            <div>

                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4 '>
                    {
                        data?.map((rest) => (

                            <div className="relative group duration-500 cursor-pointer group overflow-hidden text-gray-50 bg-[rgba(255,255,255,0.25)] h-80 w-56 rounded-2xl hover:duration-700 duration-700">



                                <img className='h-full w-full ' src={rest?.image} key={rest?.id} onClick={() => handleSelect(rest?.id)}></img>




                                <div className="absolute bg-gray-50 -bottom-24 w-56 p-3 flex flex-col gap-1 group-hover:-bottom-0 group-hover:duration-600 duration-500">
                                    <span className="text-slate-900 font-bold text-sm">{rest?.name}</span>


                                    <p className="text-neutral-800">{rest?.description}</p>
                                    <div className='px-2 flex justify-between'>
                                        <div className=''><FontAwesomeIcon icon={faPenToSquare} className='text-sm text-left text-black' key={rest?.id} onClick={() => handleClick(rest?.id)} /></div>
                                        <div className=''><FontAwesomeIcon icon={faTrashCan} className='text-sm text-left text-black' key={rest?.id} onClick={() => handledelete(rest?.id)} /></div>

                                    </div>

                                </div>


                            </div>
                        ))
                    }
                </div>



                {
                    addOpen && <Add setAddOpen={setAddOpen} />
                }
            </div>
            <div>
                {
                    editOpen && <Edit setEditOpen={setEditOpen} restId={restId} />
                }
            </div>
            <div>
                {
                    select && <Single selectOpen={selectOpen} restId={restId} />
                }
            </div>
        </div>
    )
}

export default Home
