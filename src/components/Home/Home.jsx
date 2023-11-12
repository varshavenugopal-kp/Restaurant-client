import React from 'react'
import { api } from '../../services/axios'

const Home = () => {
    const  [addOpen,setAddOpen]=useState(false)

    const [editOpen,setEditOpen]=useState(false)

    const [select,selectOpen]=useState()

    const [restId,setrestId]=useState()

    const [data,setData]=useState()

    // const [prio,setPrio]=useState()

    useEffect(() => {
        fetchData();
      }, []);

      const fetchData = async () => {
        try {
          const response = await api.get('/');
          console.log('Response from data fetch:', response);
          if (response.data && response.data.data) {
              setData(response.data.data);
          }
      } catch (error) {
          console.error('Error occurred while fetching data:', error);
         
      }
      };
      console.log("there??",data);
      const modalOpen=()=>{
          setAddOpen(true)
      }
      const editModal=()=>{
        setEditOpen(true)
      }
      const handleSelect=(restId)=>{
          selectOpen(restId)
          setrestId(restId)
      }
      const handleClick=(restId)=>{
        console.log("jjjjj");
        setEditOpen(true)
        setrestId(restId)
     }
  
    //  const addPrio=((e)=>{
    //   setPrio({ ...prio, [e.target.name]: e.target.value })
    //  })
    //  console.log("kooi",prio);
  
     const handledelete=async(restId)=>{
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
        <div className='flex justify-between p-4'>
        <div className='w-32 h-10 bg-sky-900 mt-7 cursor-pointer' onClick={()=>modalOpen()}><h1 className='text-white pt-2 px-2'>Add Restaurant</h1></div>
        <div>
        <div className='w-full mt-5'>
                            {/* <div>
                                <label className=''>Priority</label>
                            </div> */}

{/* <select name="priority" className="w-48 h-10 border-2" onChange={addPrio}>
    <option value="" disabled selected hidden>
        Select Priority
    </option>
    <option value="Low">Low</option>
    <option value="Medium">Medium</option>
    <option value="High">High</option>
    <option value="All">All</option>
</select> */}
                        </div>
        </div>
        </div>

        <div>

<div className='grid grid-cols-5 gap-4  p-10'>
  {
    data?.map((rest) => (
      <div className='h-72 w-56 border border-black'>
        <img className='h-2/3 w-full ' src={rest?.image} key={rest?.id} onClick={()=>handleSelect(rest?.id)}></img>
        <p className='p-3 text-lg font-semibold'>{rest?.heading}</p>
       
       <div className='px-2 flex justify-between'>
       <div className=''><FontAwesomeIcon icon={faPenToSquare} className='text-sm text-left' key={rest?.id} onClick={()=>handleClick(rest?.id)}/></div>
       <div className=''><FontAwesomeIcon icon={faTrashCan} className='text-sm text-left'key={rest?.id} onClick={()=>handledelete(rest?.id)} /></div>
    
        </div>
        

      
      </div>
   ))
  }
</div>



{
    addOpen && <Add setAddOpen={setAddOpen}/>
}
</div>
<div>
{
  editOpen && <Edit setEditOpen={setEditOpen} restId={restId}/>
}
</div>
<div>
  {
    select && <Single selectOpen={selectOpen} restId={restId}/>
  }
</div>
    </div>
  )
}

export default Home
