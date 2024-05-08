import React from 'react';

import './HomePage.css';

import Countdown from '../../components/Countdown/Countdown';
import CurrentDate from '../../components/CurrentDate/CurrentDate';
import Modal from '../../components/Modal/Modal';


function HomePage () {
//   const [showModal, setShowModal] = useState(false)
  return (
    <div className="Home">
      <div className="title-container">
        <img src="/daily_integral_title.png" alt="daily-integral" className="title-image" style={{width: '50%', paddingTop: '20px'}}/>
      </div>
      <CurrentDate fontSize={'1.5em'}/>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
      <span style={{width: "50%", textAlign: 'center'}}>
        <p>Solve a new integral every day! Find the fastest solution in the fewest attempts and see where you rank on the daily leaderboard.</p>
      </span>
      </div>
      <Modal 
        buttonText="show today's integral" 
        modalTitle="Ready?" 
        modalContent={<>
          <p>The timer will begin once you press start.</p>
          <p>Good luck!</p>
        </>} 
        backText="Back" 
        startText="Start timer" 
      />
      <div className="mt-3">
        <Countdown />
      </div>
    </div>
  );
}
       
export default HomePage;
