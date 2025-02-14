import { useState } from 'react'
import {FaRegEye,FaRegEyeSlash} from "react-icons/fa6"

function PasswordInput({value,onChange,placeHolder="Password"}) {
    const [show,setShow]=useState(false)
    const togglePass=()=>{
        setShow(!show);
    }
  return (
    <div className='flex items-center bg-transparent border-[1.5px] px-5 rounded mb-3'>
        <input
        value={value}
        onChange={onChange}
        type={show?"text":"password"}
        placeholder={placeHolder}
        className='w-full text-sm bg-transparent py-3 mr-3 rounded outline-none'
        />
        {show?
        <FaRegEye
            size={22}
            className="text-primary cursor-pointer "
            onClick={()=>togglePass()}
        />:
        <FaRegEyeSlash
            size={22}
            className="text-gray-600 cursor-pointer "
            onClick={()=>togglePass()}
        />}
    </div>
  )
}

export default PasswordInput