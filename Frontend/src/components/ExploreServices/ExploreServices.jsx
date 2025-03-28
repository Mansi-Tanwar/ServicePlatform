import React from 'react'
import './ExploreServices.css'
import { service_list } from '../../assets/assets'

const ExploreServices = ({ category, setCategory }) => {
  return (
    <div className='explore-services' id='explore-services'>
      <h1>Explore The Services</h1>
      <p className='explore-services-text'>Choose from a diverse services. Our mission is to provide the help at your ease.</p>
      

      <div className='explore-services-list'>
        {service_list.map((item, index) => {
          return (
            <div onClick={() => setCategory(prev => prev === item.service_name ? "All" : item.service_name)} key={index} className='explore-services-list-item'>
              <img className={category === item.service_name ? "active" : ""} src={item.service_image} alt='' />
              <p>{item.service_name}</p>
            </div>
          )
        })}
      </div>

      <hr></hr>
    </div>
  )
}

export default ExploreServices;
