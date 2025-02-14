import React, { useState } from 'react'
import { MdAdd,MdClose } from 'react-icons/md'


function TagInput({tags,setTags}) {
    const [inputvalue,setInputValue]=useState("")
    const inputchnage=(e)=>{
        setInputValue(e.target.value)
    }
    const addtag=()=>{
        if (inputvalue.trim()!==""){
            setTags([...tags,inputvalue.trim()])
            setInputValue("");
        }
    };
    const handleKeyDown=(e)=>{
        if(e.key==="Enter") addtag();

    }

    const handleRemoveTag=(tagToRemove)=>{
        setTags(tags.filter((tag)=>tag!==tagToRemove))
    };

  return (
    <div>
        {tags?.length>0 && (<div className='flex items-center gap-2 flex-wrap mt-2'>
            {tags.map((tag,index)=>(
                <span key={index} className='flex items-center gap-2 text-sm text-slate-900 bg-slate-100 px-3 py-1 rounded'>
                    {tag}
                    <button onClick={()=>{handleRemoveTag(tag)}}>
                        <MdClose/>
                    </button>
                </span>
            ))}
        </div>)}
        <div className='flex items-center gap-4 mt-3'>
            <input value={inputvalue} type="text" className='text-sm bg-transparent  px-3 py-2 border-2 outline-none bg-slate-50 rounded-lg p-2' placeholder='Add Tag' onChange={inputchnage} onKeyDown={handleKeyDown}/>
            <button className='w-8 h-8 flex items-center justify-center rounded border border-black hover:bg-black' onClick={()=>{addtag();}}>
                <MdAdd className='text-2xl text-blue-700 hover:text-white'/>
            </button>
        </div>
    </div>
  )
}

export default TagInput