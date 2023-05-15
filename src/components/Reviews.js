import React, { useContext, useEffect, useState } from 'react'
import ReactStars from 'react-stars'
import { ThreeCircles } from 'react-loader-spinner';
import { reviewsRef, db } from '../firebase/firebase';
import { addDoc, doc, updateDoc, query, where, getDocs } from 'firebase/firestore';
import swal from 'sweetalert';
import { UploadFile } from '@mui/icons-material';
import { AppState } from '../App';
import { useNavigate } from 'react-router-dom';
const Reviews = ({ id, prevRating, userRated }) => {
    const useAppState = useContext(AppState);
    const navigate = useNavigate();
    const [rating, setRating] = useState(0);
    const [loading, setloading] = useState(false);
    const [reviewsLoading, setReviewsLoading] = useState(false);
    const [form, setForm] = useState("");
    const [data, setData] = useState([]);
    const [newAdded,setNewAdded] = useState(0);
    
    const sendReview = async () => {
        
        setloading(true);
        try {
   if(useAppState.login){

   

            await addDoc(reviewsRef, {
                bookid: id,
                name: useAppState.userName,
                rating: rating,
                thought: form,
                timestamp: new Date().getTime()
            })
            const ref = doc(db, "books", id);
            await updateDoc(ref, {
                rating: rating + prevRating,
                rated: userRated + 1
            })
            setRating(0);
            setForm("");
            setNewAdded(newAdded+1);
            swal({
                title: "Review sent!",
                icon: "success",
                button: false,
                timer: 3000
            })
        }
        else{
            navigate("/login")
        }
        } catch (error) {
            swal({
                title: error.message,
                icon: "success",
                button: false,
                timer: 3000
            })
        }
        setloading(false);
    }
    useEffect(() => {
        async function getData() {
            setReviewsLoading(true);
            setData([]);
            let quer = query(reviewsRef, where('bookid', "==", id))
            const querySnapshot = await getDocs(quer);
            querySnapshot.forEach((doc) => {
                setData((prev) => [...prev, doc.data()])
            })
            setReviewsLoading(false);
        }
        getData();
    }, [newAdded])
    return (
        <div className='mt-4 border-t-2 border-gray-700 w-full'>
            <ReactStars
                size={30}
                half={true}
                onChange={(rate) => setRating(rate)}
            />
            <input
                value={form}
                onChange={(e) => setForm(e.target.value)}
                placeholder='Share your thoughts..'
                className='w-full p-2 outline-none bg-black'
            />
            <button onClick={sendReview} className='bg-green-600 w-full p-1'>
                {loading ? <div className='h-5 flex w-full justify-center items-center'>
                    <ThreeCircles height={15} color="white" /></div> : "Share"}
            </button>
            {
                reviewsLoading ?
                    <div className='mt-6 flex justify-center'> <ThreeCircles color='white' height={15} /></div>
                    :
                    <div className='mt-4'>
                        {
                            data.map((e, i) => {
                                return (
                                    <div className='border-b border-gray-600 p-2 w-full mt-2' ey={i}>

                                        <div className='flex items-center'>
                                            <p className='text-blue-500'>{e.name}</p>
                                            <p className='ml-4 text-xs'>({new Date(e.timestamp).toLocaleString()})</p>
                                        </div>
                                        <ReactStars
                                            size={15}
                                            half={true}
                                            value={e.rating}
                                            edit={false}
                                        />
                                        <p>{e.thought}</p>
                                    </div>


                                )
                            })
                        }
                    </div>
            }
        </div>
    )
}

export default Reviews