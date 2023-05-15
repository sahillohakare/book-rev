import React, { useState } from 'react'
import { TailSpin } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import {getAuth,RecaptchaVerifier,signInWithPhoneNumber} from 'firebase/auth'
import app from '../firebase/firebase'
import swal from 'sweetalert';
import { addDoc } from 'firebase/firestore';
import { useNavigate } from "react-router-dom";
import bcrypt from 'bcryptjs';
import { usersRef } from '../firebase/firebase';
const auth = getAuth(app);

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    password: ""

  });
  const [loading, setLoading] = useState(false);
  const [otpSend, setOtpSend] = useState(false);
  const [OTP,setOTP] = useState("");
  
  const generateReCaptcha = ()=>{
    window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container',{
        'size':'invisible',
        'callback':(response)=>{

        }
    },auth);
  }
  const requestOTP  = ()=>{
    setLoading(true);
    generateReCaptcha();
    let appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth,`+91${form.mobile}`,appVerifier)
    .then(confirmationResult =>{
        window.confirmationResult = confirmationResult;
        swal({
            text:"OTP sent",
            icon:"success",
            buttons:false,
            timer:2000
        });
        setOtpSend(true);
        setLoading(false);

    }).catch((err)=>{
        console.log(err);
    })
  }
  const verifyOTP = ()=>{
try {
    setLoading(true);
    window.confirmationResult.confirm(OTP).then((result)=>{
        uploadData();
        
        swal({
            text:"Successfully Registered",
            icon:"success",
            buttons:false,
            timer:2000
        })
        navigate("/login")
        setLoading(false);
    })
} catch (error) {
    console.log(error);
}
  }
  const uploadData = async ()=>{
    try {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(form.password,salt);
      await addDoc(usersRef,{
          name:form.name,
          password:hash,
          mobile:form.mobile
      });
    } catch (error) {
     console.log(error); 
    }
   
  }
  
  return (
    <div className='w-full flex  flex-col mt-4 justify-center items-center '>
      {
        otpSend?
        <>
        <div class="p-2 w-full flex flex-col justify-center items-center ">
            <div class="relative" className=' flex flex-col   w-full md:w-1/3'>
              <label for="message" class="leading-7 text-xl text-gray-300 mb-1">Enter OTP</label>
              <input
                id="message"
                name="message"
                value={OTP}
                onChange={(e) => setOTP(e.target.value)}
                class="w-full bg-white rounded border border-gray-300
                                         focus:border-indigo-500 focus:bg-white focus:ring-2
                                          focus:ring-indigo-200 h-20text-base outline-none
                                           text-gray-700 py-1 px-3 resize-none leading-6 transition-colors
                                            duration-200 ease-in-out"/>
            </div>
            <div class="p-2">
        <button onClick={verifyOTP} class="flex mx-auto text-white bg-red-500 border-0 py-1 px-5 focus:outline-none
                                 hover:bg-red-600 rounded text-lg">
          {loading ? <TailSpin color='white' height={25} width={100}/> : "Confirm OTP"}
        </button>
        </div>
          </div>
        </>
        :
        <>

          <h1 className='text-xl font-bold'>Sign-Up</h1>
          <div class="p-2 w-full flex flex-col justify-center items-center ">
            <div class="relative" className=' flex flex-col   w-full md:w-1/3'>
              <label for="message" class="leading-7 text-xl text-gray-300 mb-1">Full Name</label>
              <input
                id="message"
                name="message"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                class="w-full bg-white rounded border border-gray-300
                                         focus:border-indigo-500 focus:bg-white focus:ring-2
                                          focus:ring-indigo-200 h-20text-base outline-none
                                           text-gray-700 py-1 px-3 resize-none leading-6 transition-colors
                                            duration-200 ease-in-out"/>
            </div>
          </div>
          <div class="p-2 w-full flex flex-col justify-center items-center ">
            <div class="relative" className=' flex flex-col   w-full md:w-1/3'>
              <label for="message" class="leading-7 text-xl text-gray-300 mb-1">Mobile No.</label>
              <input
                type={"number"}
                id="message"
                name="message"
                value={form.mobile}
                onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                class="w-full bg-white rounded border border-gray-300
                                         focus:border-indigo-500 focus:bg-white focus:ring-2
                                          focus:ring-indigo-200 h-20text-base outline-none
                                           text-gray-700 py-1 px-3 resize-none leading-6 transition-colors
                                            duration-200 ease-in-out"/>
            </div>
          </div>
          <div class="p-2 w-full flex flex-col justify-center items-center">
            <div class="relative" className=' flex flex-col  w-full md:w-1/3  '>
              <label for="message" class="text-xl leading-7 text-sm text-gray-300 mb-1">Password</label>
              <input
              type='password'
                id="message"
                name="message"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                class="w-full bg-white rounded border border-gray-300
                                         focus:border-indigo-500 focus:bg-white focus:ring-2
                                          focus:ring-indigo-200 h-20text-base outline-none
                                           text-gray-700 py-1 px-3 resize-none leading-6 transition-colors
                                            duration-200 ease-in-out"/>
            </div>
          </div>

          <div class="p-2">
            <button onClick={requestOTP} class="flex mx-auto text-white bg-red-500 border-0 py-1 px-5 focus:outline-none
                                 hover:bg-red-600 rounded text-lg">
              {loading ? <TailSpin color='white' height={28} width={57} /> : "Request OTP"}
            </button>
          </div>

        </>
      }
      
      
      <div>
        <p>Already have an account?<Link to={'/login'}> <span className=' mr-2 text-blue-500'>Sign in</span></Link></p>
      </div>
      <div id='recaptcha-container'>

      </div>
    </div>
  )
}

export default Signup