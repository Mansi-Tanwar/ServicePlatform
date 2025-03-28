import React, { useContext } from 'react'
import './Cart.css'
import {StoreContext} from '../../Context/StoreContext'
import { service_list } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';



const Cart = () => {


  const {serviceRequests,service_list,removeFromRequests,getTotalServiceAmount,url}=useContext(StoreContext);
  const navigate= useNavigate();

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Service</p>
          <p>Description</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br></br>
        <hr></hr>
        {service_list.map((service)=>{
          if(serviceRequests[item._id]>0)
            {
              return(
                <div key={service._id}>
                  <div className="cart-items-title  cart-items-item">
                  {/* <img src={url+"/images/"+item.image} alt=''/> */}
                  <p>{service.name}</p>
                  <p>${service.price}</p>
                  <p>{serviceRequests[servce._id]}</p>
                  <p>${service.price*serviceRequests[service._id]}</p>
                  <p onClick={()=>removeFromCart(service._id)} className='cross'>x</p>
                </div>
                <hr/>
                </div>
              )
            }
            return null;
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Service Request Summary</h2>
          <div>
            <div className='cart-total-details'>
              <p>Subtotal</p>
              <p>${getTotalServiceAmount()}</p>
            </div>
            <hr/>
            <div className='cart-total-details'>
              <p>Total</p>
              <p>${getTotalServiceAmount()}</p>
            </div>
            <hr/>
          </div>
          <button onClick={()=>navigate('/place-service-request')}>Request Service</button>
        </div>
        <div className='cart-promocode'>
          <div>
            <p>If you have a promo code,Enter it here</p>
            <div className='cart-promocode-input'>
              <input type='text' placeholder='Promo-code'/>
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart;