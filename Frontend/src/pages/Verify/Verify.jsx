import React from 'react'
import "./Verify.css"
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useContext } from 'react';
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';


const Verify = () => {


    const [searchParams] = useSearchParams();
    const success = searchParams.get("success")
    const bookingId = searchParams.get("bookingId")

    const {url} = useContext(StoreContext);
    const navigate = useNavigate();

    const verifyPayment = async () => {
        const response = await axios.post(url+"/api/booking/verify",{success,bookingId});
        try{
            if (response.data.success){
                navigate("/mybookings");
            }
            else {
                navigate("/")
            }
        }
        catch(error){
            console.error("Payment verification failed:", error);
            navigate("/");
        }
    }
    useEffect(()=>{
        verifyPayment();
    },[])
  return (
    <div className='verify'>
        <div className="spinner"></div>
    </div>
  )
}

export default Verify