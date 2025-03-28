import React , { useState }from 'react'
import Navbar from './pages/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceBooking from './pages/PlaceBooking/PlaceBooking';
import Footer from './components/Footer/Footer';
import LoginPopup from'./components/LoginPopup/LoginPopup';
import Verify from './pages/Verify/Verify';
import MyBookings from './pages/MyBookings/MyBookings'

const App = () => {

  const [showLogin,setShowLogin]=useState(false)

  return (
    <>
    {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
    <div className='app'>
      <Navbar setShowLogin={setShowLogin}/>  
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/booking' element={<PlaceBooking/>}/>
        <Route path='/verify' element={<Verify />} />
        <Route path='/mybookings' element={<MyBookings />} />

      </Routes>
    </div>
    <Footer/>
    </>
  )
}

export default App;