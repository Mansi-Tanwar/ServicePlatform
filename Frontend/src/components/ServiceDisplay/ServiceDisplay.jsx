import React, { useContext } from 'react'
import './ServiceDisplay.css'
import { StoreContext } from '../../Context/StoreContext'
import ServiceItem from '../ServiceItem/ServiceItem'

const ServiceDisplay = ({category}) => {

    const {service_list}=useContext(StoreContext)
  return (

    <div className='service-display' id='service-display'>
        <h2>Services Available</h2>
        <div className="service-display-list">
            {service_list.map((item,index)=>{
                if(category==="All" || category===item.category){

                  return <ServiceItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image}/>
                }
            })}
        </div>
    </div>
  )
}

export default ServiceDisplay;