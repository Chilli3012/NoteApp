import ProfileInfo from "../Cards/ProfileInfo"
import {useNavigate} from "react-router-dom"
import SearchBar from "../SearchBar/SearchBar";
import { useState } from "react";
import { BsMoonFill, BsSunFill } from "react-icons/bs"

function Navbar({userInfo, onSearchNote, handleClearSearch}) {
  const [searchQ,setSearchQ]=useState("");
  const [darkMode, setDarkMode] = useState(
    document.documentElement.classList.contains("dark")
  );
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

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
    document.documentElement.classList.toggle("dark");
  };
  const handleClick=()=>{
    navigate("/dashboard");
  }


  return (
    <div className='bg-gray-50 flex items-center justify-between px-6 py-2 drop-shadow dark:bg-slate-400'>
      {/* <img src="https://cdn-icons-png.flaticon.com/512/9409/9409674.png" alt="logo" className="ml-8 w-20 h-20 mr-10"/> */}
      <img src="https://cdn-icons-png.flaticon.com/512/17113/17113805.png" alt="logo" className="rounded-full cursor-pointer ml-0 w-20 h-20 hover:shadow-xl" onClick={handleClick}/>
      <SearchBar value={searchQ} onChange={(e)=>setSearchQ(e.target.value)} handleSearch={handleSearch} onClearSearch={onClearSearch} />
      <div className="flex">
      <button onClick={toggleDarkMode} className="ml-0 p-2 text-gray-900 dark:text-yellow-300 hover:text-gray-500 dark:hover:text-yellow-500">
          {darkMode ? <BsSunFill size={20} /> : <BsMoonFill size={20} />}
      </button>
      <ProfileInfo userInfo={userInfo} onLogout={onLogout}/>
      </div>
    </div>
  )
}

export default Navbar