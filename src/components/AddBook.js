import React, { useContext, useState } from 'react'
import { TailSpin } from 'react-loader-spinner';
import { addDoc } from 'firebase/firestore';
import { bookRef } from '../firebase/firebase';
import swal from 'sweetalert';
import { AppState } from '../App';
import { useNavigate } from 'react-router-dom';
const AddBook = () => {
    const navigate = useNavigate();
    const useAppState = useContext(AppState);

    const [form, setForm] = useState({
        title: "",
        year: "",
        description: "",
        image: "",
        rated:0,
        rating:0
    });
    const [loading, setLoading] = useState(false);

    const addBook = async () => {

        setLoading(true);

        try {
            if(useAppState.login){
            
            console.log("started")

            await addDoc(bookRef, {
                title:form.title,
                year:form.year,
                description:form.description,
                image:form.image
               
            });
            console.log("Done")     
            swal({
                title: "Successfully added!",
                icon: "success",
                buttons: false,
                timer: 3000
            })
            
        }
        else{
            navigate("/login")
        }
        }
        catch (err) {
            swal({
                title: err,
                icon: "error",
                buttons: false,
                timer: 3000
            })
        }
        setLoading(false);

    }
    return (
        <div className=''>
            <section class="text-gray-600 body-font relative">
                <div class="container px-5 py-8 mx-auto">
                    <div class="flex flex-col text-center w-full mb-4">

                    </div>
                    <div class="lg:w-1/2 md:w-2/3 mx-auto">
                        <div class="flex flex-wrap -m-2">
                            <div class="p-2 w-1/2">
                                <div class="relative">
                                    <label for="name" class="leading-7 text-sm text-gray-300">Title</label>
                                    <input type="text"
                                        id="name"
                                        name="name"
                                        value={form.title}
                                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                                        class="w-full bg-white rounded border border-gray-300
                                      focus:border-indigo-500 focus:bg-white focus:ring-2
                                       focus:ring-indigo-200 text-base outline-none text-gray-700 
                                       py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                </div>
                            </div>
                            <div class="p-2 w-1/2">
                                <div class="relative">
                                    <label for="year" class="leading-7 text-sm text-gray-300">Year</label>
                                    <input type="year"
                                        id="year"
                                        name="year"
                                        value={form.year}
                                        onChange={(e) => setForm({ ...form, year: e.target.value })}
                                        class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500
                                     focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none
                                      text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                </div>
                            </div>
                            <div class="p-2 w-full">
                                <div class="relative">
                                    <label for="message" class="leading-7 text-sm text-gray-300">Image Link</label>
                                    <input
                                        id="message"
                                        name="message"
                                        value={form.image}
                                        onChange={(e) => setForm({ ...form, image: e.target.value })}
                                        class="w-full bg-white rounded border border-gray-300
                                         focus:border-indigo-500 focus:bg-white focus:ring-2
                                          focus:ring-indigo-200 h-20text-base outline-none
                                           text-gray-700 py-1 px-3 resize-none leading-6 transition-colors
                                            duration-200 ease-in-out"/>
                                </div>
                            </div>
                            <div class="p-2 w-full">
                                <div class="relative">
                                    <label for="message" class="leading-7 text-sm text-gray-300">Description</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={form.description}
                                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                                        class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
                                </div>
                            </div>
                            <div class="p-2 w-full">
                                <button onClick={addBook} class="flex mx-auto text-white bg-red-500 border-0 py-2 px-8 focus:outline-none
                                 hover:bg-red-600 rounded text-lg">
                                    {loading ? <TailSpin color='white' height={28} width={57}/> : "Submit"}
                                </button>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default AddBook