import { getInitails } from '../../utils/helper'
import { useNavigate } from "react-router-dom";

function ProfileInfo({userInfo,onLogout}) {
  const navigate = useNavigate();
  const handleProfile=()=>{
    navigate("/profile");
  }
  return (
    userInfo && (<div className='flex items-center gap-3 ml-1'>
        <div className='w-12 h-12 flex items-center justify-center rounded-full text-slate-700 font-medium bg-slate-200'>
            {getInitails(userInfo.fullName)}
        </div>
        <div>
            <button className='text-md font-medium block text-primary' onClick={handleProfile}>{userInfo.fullName}</button>
            <button className='text-sm text-slate-500 underline' onClick={onLogout}>LogOut</button>
        </div>
    </div>)
  )
}

export default ProfileInfo