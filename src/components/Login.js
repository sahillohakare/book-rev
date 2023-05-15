import React, { useContext, useState } from 'react'
import { TailSpin } from 'react-loader-spinner';
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { query, where, getDocs } from 'firebase/firestore';
import { usersRef } from '../firebase/firebase';
import bcrypt from 'bcryptjs'
import App, { AppState } from "../App"

const Login = () => {
  const useAppState = useContext(AppState);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    mobile: "",
    password: ""

  });
  const [loading, setLoading] = useState(false);
  const login = async () => {
    setLoading(true)
    try {
      const quer = query(usersRef, where('mobile', '==', form.mobile))
      const querySnapshot = await getDocs(quer);
      querySnapshot.forEach((doc) => {
        const _data = doc.data();
        const isUser = bcrypt.compareSync(form.password, _data.password);
        if (isUser) {
          useAppState.setLogin(true);
          useAppState.setUserName(_data.name);
          
          swal({
            title: "Logged in",
            icon: "success",
            button: false,
            timer: 3000
          })
          navigate("/")
        }
        else {
          swal({
            title: "Invalid Credentials",
            icon: "error",
            button: false,
            timer: 2000
          })
        }
      })
    }
    catch (error) {
      swal({
        title: error.message,
        icon: "success",
        button: false,
        timer: 3000
      })
    }
    setLoading(false)
  }
  return (
    <div className='w-full flex  flex-col mt-4 justify-center items-center '>
      <h1 className='text-xl font-bold'>Login</h1>
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
        <button onClick={login} class="flex mx-auto text-white bg-red-500 border-0 py-1 px-5 focus:outline-none
                                 hover:bg-red-600 rounded text-lg">
          {loading ? <TailSpin color='white' height={27}  width={45}/> : "Login"}
        </button>

        <p>Do not have account?<Link to={'/signup'}> <span className=' mr-2 text-blue-500'>Sign up</span></Link></p>
      </div>
    </div>
  )
}

export default Login