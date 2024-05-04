import React, { useState } from 'react';

import './HomePage.css';

import Countdown from '../../components/Countdown/Countdown';
import CurrentDate from '../../components/CurrentDate/CurrentDate';
import Modal from '../../components/Modal/Modal';


function HomePage () {
//   const [showModal, setShowModal] = useState(false)
  return (
    <div className="Home">
      <div className="title-container">
        <h1 className="title">
            daily-integral
        </h1>
      </div>
      <CurrentDate />
      <Countdown />
      <Modal 
        buttonText="Show today's integral" 
        modalTitle="Ready?" 
        modalContent={<>
          <p>The goal is to find the solution the fastest, and in the least number of attempts. The timer will begin once you press start.</p>
          <p>Good luck!</p>
        </>} 
        backText="Back" 
        startText="Start timer" 
      />
    </div>
  );
}
       
export default HomePage;
