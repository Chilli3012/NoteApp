import { useState } from 'react';
import PasswordInput from "../../components/Input/PasswordInput"
import { Link } from "react-router-dom"
import Navbar from "../../components/Navbar/Navbar"
import {validateEmail} from "../../utils/helper.js"
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance.js';


function Signup() {
  const [name,setName]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("");
  const [errormsg,setErrorMSG]=useState(null);
  const navigate=useNavigate();


  const submitHandler=async(e)=>{
    e.preventDefault();

    if(!name){setErrorMSG("Please enter your name");return;}
    else if(email.length<5 || !validateEmail(email)) {setErrorMSG("Please enter a valid email address."); return;}
    else if(password.length<8) {setErrorMSG("Password should be at least 8 characters long."); return;}
    else setErrorMSG("");

    // api will be called here 

    try{
      const response=await axiosInstance.post("/create-account",{
        fullName:name,
        email:email,
        password:password,
      })
      if(response.data && response.data.error){
        setErrorMSG(response.data.message)
        return
      }
      if(response.data && response.data.accessToken){
        localStorage.setItem("token",response.data.accessToken)
        navigate('/dashboard')
      }
    }catch(error){
      console.log(error)
      if (error.response && error.response.data && error.response.data.message){
        setErrorMSG(error.response.data.message);
      }
      else{
        setErrorMSG("Something went wrong. Please try again later.");
        console.log(error)
      }
    }
  }


  return (
    <> 
    <Navbar/>
    <div className='flex items-center justify-center mt-28'>
        <div className='w-96 border rounded-3xl bg-white px-7 py-10 hover:shadow-2xl transition-all ease-in-out'>

          <form  onSubmit={submitHandler}>

            <h4 className='text-2xl mb-7'>Signup</h4>

            <input type="text" placeholder='Name' className='input-box'
              value={name}
              onChange={(e)=>setName(e.target.value)}
            />

            <input type="text" placeholder='Email' className='input-box'
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />

            <PasswordInput value={password} onChange={(e)=>setPassword(e.target.value)}/>

            {errormsg && <p className="text-red-400 text-xs pb-1">{errormsg}</p>}

            {/* <input type="text" placeholder='Password' className='input-box'/> */}
            <button type='submit' className='btn-primary'>Create new user</button>

            <p className='text-sm text-center mt-4 '> Already registered?{" "} <Link to="/login" className='font-medium text-primary underline'>Login</Link></p>
          </form>

        </div>
      </div>
    </>
  )
}

export default Signup