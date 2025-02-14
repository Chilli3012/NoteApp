import React from 'react'
import {FaMagnifyingGlass} from "react-icons/fa6"
import {IoMdClose} from "react-icons/io"

const SearchBar=({value,onChange,handleSearch,onClearSearch})=> {
  return (
    <div className='ml-0 mr-0 w-80 flex items-center px-4 bg-slate-200 rounded-3xl'>
      <input type="text" 
        placeholder='Search in notes'
        className='w-full text-xs bg-transparent py-[11px] outline-none'
        value={value} 
        onChange={onChange} 
      />
      {value && (<IoMdClose className='text-xl cursor-pointer text-slate-400 hover:text-black mr-4 ' onClick={onClearSearch}/>)}
      <FaMagnifyingGlass className='text-slate-700 cursor-pointer hover:text-black' onClick={handleSearch}/>
    </div>
  )
}

export default SearchBar