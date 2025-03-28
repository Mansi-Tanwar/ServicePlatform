import React, { useState } from 'react'
import './Home.css'
import Header from '../../components/Header/Header';
import ExploreServices from '../../components/ExploreServices/ExploreServices';
import ServiceDisplay from '../../components/ServiceDisplay/ServiceDisplay';
import AppDownload from '../../components/AppDownload/AppDownload';

const Home = () => {

  const [category,setCategory]=useState("All");
  return (
    <div>
      <Header/>
      <ExploreServices category={category} setCategory={setCategory}/>
      <ServiceDisplay category={category}/>
      <AppDownload/>
    </div>
  )
}

export default Home;