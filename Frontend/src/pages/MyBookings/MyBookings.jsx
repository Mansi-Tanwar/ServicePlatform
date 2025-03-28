import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../../Context/StoreContext.jsx';
import axios from 'axios';
import { assets } from '../../assets/assets';
import './MyBookings.css'



const MyBookings = () => {
    const [data,setData] = useState([]);
    const {url,token} = useContext(StoreContext);
    
    
    const fetchBookings = async () => {
        try{
            const response = await axios.post(url+"/api/booking/userbookings",{},{headers:{token}});
            setData(response.data.data);
            console.log(response.data.data);
        }
        catch(error){
            console.error("Error fetching bookings:",error)
        }
        
    }

    useEffect(()=>{
        if (token) {
            fetchBookings();
        }
    },[token])

    return (
        <div className='my-bookings'>
        <h2 >My Bookings</h2>
        <div className="container">
            {data.map((booking,index)=>{
                return (
                    <div key={index} className='my-bookings-order'>
                        <img src={assets.parcel_icon} alt="" />
                        <p>{booking.services.map((services,index)=>{
                            if (index === booking.services.length-1) {
                                return service.name+" x "+service.quantity
                            }
                            else{
                                return service.name+" x "+service.quantity+","
                            }
                        })}</p>
                        <p>${booking.amount}.00</p>
                        <p>Services: {booking.services.length}</p>
                        <p><span>&#x25cf;</span> <b>{booking.status}</b></p>
                        <button onClick={fetchBooking}>Track Booking</button>
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default MyBookings