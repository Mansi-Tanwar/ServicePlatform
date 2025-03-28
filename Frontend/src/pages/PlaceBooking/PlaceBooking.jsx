import React, { useState, useEffect,useContext } from 'react'
import './PlaceBooking.css'
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const PlaceBooking = () => {
  const {getTotalCartAmount,token,service_list,cartItems,url} =useContext(StoreContext);
  const [data,setData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:""
  })
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}))
  }
  const placeBooking = async (event) => {
    event.preventDefault();
    let selectedServices = [];
    service_list.map((service)=>{
      if (cartItems[service._id]>0) {
        let serviceInfo = service;
        itemInfo["quantity"] = cartItems[service._id];
        selectedServices.push(serviceInfo)
      }
    })
    let bookingData = {
      customerDetails:data,
      services:selectedServices,
      amount:getTotalCartAmount()+5,
    }
    try{
      let response = await axios.post(url+"/api/booking/place",bookingData,{headers:{token}})
    

      if (response.data.success){
        const {session_url} = response.data;
        window.location.replace(session_url);
     }
     else{
      alert("Error while booking");
      }
    }
    catch(error){
      console.error("Booking failed:", error)
      alert("Something went wrong.")
    }
    
  }

  const navigate = useNavigate();

  useEffect(()=>{
    if (!token || getTotalCartAmount()===0 ){
      navigate('/cart')
    }
  },[token, getTotalCartAmount, navigate])


  return (


    <form onSubmit={placeBooking} className='place-booking'>
      <div className="place-booking-left">
        <p className="title">Booking Information</p>
        <div className="multi-fields">
          <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First Name'/>
          <input required name='lastName'onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last Name'/>
        </div>
        <input required name='email' onChange={onChangeHandler} value={data.email}  type="email" placeholder='Email Address'/>
        <input  required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' />
        <div className="multi-fields">
          <input  required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City'/>
          <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State'/>
        </div>
        <div className="multi-fields">
          <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip code'/>
          <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country'/>
        </div>
        <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone'/>
      </div>
      <div className="place-booking-right">
      <div className="cart-total">
          <h2>Booking Summary</h2>
          <div>
            <div className='cart-total-details'>
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr/>
            <div className='cart-total-details'>
              <p>Service Fee</p>
              <p>${getTotalCartAmount()===0?0:2}</p>
            </div>
            <hr/>
            <div className='cart-total-details'>
              <b>Total</b>
              <b>${getTotalCartAmount()===0?0:getTotalCartAmount()+5}</b>
            </div>
          </div>
            <button type='submit'>PROCEED TO PAYMENT</button>
        </div>
      </div>

    </form>
  )
}

export default PlaceBooking;