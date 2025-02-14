import React, { useState } from 'react'
import TagInput from '../../components/Input/TagInput'
import { MdClass, MdClose } from 'react-icons/md';
import axiosInstance from '../../utils/axiosInstance';

function AddEditNotes({noteData,type,getAllNotes,onClose, showToastMessage}) {
    const [title,setTitle]=useState(noteData?.title || "");
    const [content, setContent]=useState(noteData?.content || "");
    const [tags,setTags]=useState(noteData?.tags || []);
    const [error,setError]=useState(null);

    // adding new note 
    const addNewNote=async ()=>{
        try {
            const response=await axiosInstance.post("/add-note",{
                title,
                content,
                tags,

            });
            if (response.data && response.data.note){
                showToastMessage("Note added successfully")
                getAllNotes()
                onClose()
            }
        } catch (error) {
            if(error.response && error.response.data && error.response.data.messagae){
                setError(error.response.data.message)
            }
            
        }
    };


    // editing new note 
    const editNote=async ()=>{
        const noteId=noteData._id
        try {
            const response=await axiosInstance.put("/edit-note/"+noteId,{
                title,
                content,
                tags,

            });
            if (response.data && response.data.note){
                showToastMessage("Note updated successfully")
                getAllNotes()
                onClose()
            }
        } catch (error) {
            if(error.response && error.response.data && error.response.data.messagae){
                setError(error.response.data.message)
            }
            
        }
    };


    // handling error in note 
    const handleAddNote=()=>{
        if(!title) {setError("Please enter the title!"); return;}
        if(!content) {setError("Please add content first."); return;}
        setError("");
        if(type==="edit"){
            editNote()
        }else{
            addNewNote()
        }

    }
  return (
    <div className='relative bg-teal-50 dark:bg-indigo-200'>
        <button className='w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-200' onClick={onClose}> 
            <MdClose className='text-xl text-slate-400'/>
        </button>
        <div className='flex flex-col gap-2'>
            <label className='input-label text-2xl text-slate-800'>Title</label>
            <input type="text" 
            className='text-xl  text-slate-950 outline-none border-2 px-2 rounded-lg bg-slate-50'
            placeholder='Add Title to the note'
            value={title}
            onChange={({target})=>setTitle(target.value)}
            />
        </div>
        <div className='flex flex-col gap-2 mt-4'>
            <label className='input-label text-2xl text-slate-800'>Content</label>
            <textarea type="text" className='text-sm text-slate-950 outline-none bg-slate-50 p-2 border-2 px-2 rounded-lg' placeholder='Content' rows={10}
            value={content}
            onChange={({target})=>setContent(target.value)}>
            </textarea>
        </div>
        <div className='mt-3'>
            <label className='input-label text-lg text-slate-800 '>Tags</label>
            <TagInput tags={tags} setTags={setTags}/>
        </div>
        {error && <p className='text-red-400 text-xs pt-4'>{error}</p>}
        <div className="flex justify-end mt-4">
            <button className='right-0 btn-primary font-medium mt-0 p-3 rounded-full w-40 ' onClick={handleAddNote}>{type==='edit'?"UPDATE":'Add'}</button>
        </div>
    </div>
  )
}

export default AddEditNotes