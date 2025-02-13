import ProfileInfo from "../Cards/ProfileInfo"
import {useNavigate} from "react-router-dom"
import SearchBar from "../SearchBar/SearchBar";
import { useState } from "react";

function Navbar({userInfo, onSearchNote, handleClearSearch}) {
  const [searchQ,setSearchQ]=useState("");
  const navigate=useNavigate();
  const onLogout=()=>{
    localStorage.clear()
    navigate("/login");
  }

  const handleSearch=()=>{
    if(searchQ){
      onSearchNote(searchQ)
    }
  }
  const onClearSearch=()=>{
    setSearchQ("");
    handleClearSearch();
  }


  return (
    <div className='bg-white flex items-center justify-between px-6 py-2 drop-shadow'>
      <h1 className='text-3xl font-medium text-black py-2 bg-emerald-200 px-3 rounded-2xl hover:shadow-sm'>My Notes</h1>
      <SearchBar value={searchQ} onChange={(e)=>setSearchQ(e.target.value)} handleSearch={handleSearch} onClearSearch={onClearSearch} />
      <ProfileInfo userInfo={userInfo} onLogout={onLogout}/>
    </div>
  )
}

export default Navbar