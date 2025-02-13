import Navbar from "../../components/Navbar/Navbar"
import NoteCard from '../../components/Cards/NoteCard'
import {MdAdd } from 'react-icons/md'
import AddEditNotes from './AddEditNotes'
import { useState } from 'react'
import Modal from "react-modal"
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance'
import moment from "moment";
import Toast from '../../components/ToastMessage/Toast.jsx'
import { useEffect } from "react"
import EmptyCard from "../../components/EmptyCard/EmptyCard.jsx"

function Home() {

  const [openModal,setOpenModal]=useState({
    isShown:false,
    type:"add",
    data:null,
  });

  const [showToastMsg,setShowToastMsg]=useState({
    isShown:false,
    message:"",
    type:"add"
  });

  const [allNotes,setAllNotes]=useState([])
  const [userInfo, setUserInfo]=useState(null);

  const [isSearch,setIsSearch]=useState(false);

  const navigate=useNavigate();


  const handleEdit=(noteDetails)=>{
    setOpenModal({isShown:true,data:noteDetails,type:'edit'})
  };

  const showToastMessage=(message,type)=>{
    setShowToastMsg({
      isShown:true,
      message,
      type,
    });
  };

  const handleCloseToast=()=>{
    setShowToastMsg({
      isShown:false,
      message:"",

    });
  };


  // getting user info 
  const getUserInfo=async()=>{
    try{
      const response=await axiosInstance.get("get-user");
      if(response.data && response.data.user){
        setUserInfo(response.data.user);
      }
    }catch(error){
      if (error.response.status===401){
        localStorage.clear();
        navigate("/login");
      }
    }
  };

// get all note info 
const getAllNotes=async()=>{
  try{
    const response=await axiosInstance.get("/get-all-notes")
    if (response.data && response.data.notes){
      setAllNotes(response.data.notes);
    }
  }catch(error){
    console.log("An unexpected error occured. Try again later!")
  }
};


// delete note 
const deleteNote=async(data)=>{
  const noteId=data._id
  try {
    // const noteId=noteData._id
    const response=await axiosInstance.delete("/delete-note/"+noteId);
    if (response.data && !response.data.error){
        showToastMessage("Note deleted successfully",'delete')
        getAllNotes();
    }
} catch (error) {
    if(error.response && error.response.data && error.response.data.messagae){
      console.log("An unexpected error occured. Try again later!")
    }
    
}
}


// search for a not 
const onSearchNote=async (query) =>{
  try {
    const response=await axiosInstance.get("/search-notes",{
      params:{query},
    });
    if(response.data && response.data.notes){
      setIsSearch(true);
      setAllNotes(response.data.notes);
    }
  } catch (error) {
    console.log(error);
    
  }
}

const handleClearSearch=()=>{
  setIsSearch(false);
  getAllNotes();
};


const updateIsPinned=async(noteData)=>{
  const noteId=noteData._id
  try {
    const response=await axiosInstance.put("/update-note-pinned/"+noteId,{
      "isPinned":!noteData.isPinned

    });
    if (response.data && response.data.note){
      showToastMessage("Note updated successfully")
      getAllNotes()
    }
  } catch (error) {
    console.log(error)
  }
}


useEffect(() => {
  getAllNotes()
  getUserInfo();

  return () => {}
}, [])



  return (
    <>
      <Navbar userInfo={userInfo} onSearchNote={onSearchNote} handleClearSearch={handleClearSearch}/>
      <div className='container mx-auto'>
        {allNotes.length>0 ? (<div className='grid grid-cols-3 gap-4 mt-8'>
          {allNotes.map((item,index)=>(
            // console.log(item)
            <NoteCard
              key={item._id}
              title={item.title} 
              date={moment(item.createdOn).format('DD-MM-YYYY')} 
              content={item.content} 
              tags={item.tags} 
              isPinned={item.isPinned} 
              onEdit={()=>handleEdit(item)}
              onDelete={()=>deleteNote(item)}
              onPinNote={()=>updateIsPinned(item)}
            />
          ))}
        </div>):<EmptyCard/>}
      </div>

      <button className='w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-500 absolute bottom-3 left-[93.5%] z-10' onClick={()=>{
        setOpenModal({isShown:true,type:"add",data:null});
      }}>
        <MdAdd className="text-[32px] text-white"/>
      </button>

      <Modal 
        isOpen={openModal.isShown}
        onRequestClose={()=>{}}
        style={{
          overlay:{ 
            backgroundColor: "rgba(0,0,0,0.2)",
          },
        }}
        contentLabel=""
        className=" w-[35%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll"
      >
        <AddEditNotes
        type={openModal.type}
        noteData={openModal.data }
        onClose={()=>{
          setOpenModal({isShown:false,type:"add",data:null});
        }}
        getAllNotes={getAllNotes}
        showToastMessage={showToastMessage}
        />
      </Modal>

      <Toast
      isShown={showToastMsg.isShown}
      message={showToastMsg.message}
      type={showToastMsg.type}
      onClose={handleCloseToast}
      />

    </>
  )
}

export default Home