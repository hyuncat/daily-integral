import React from 'react';
import './Countdown.css';

function Countdown() {
    const [timeLeft, setTimeLeft] = React.useState(calculateTimeLeft());
  
    function calculateTimeLeft() {
      let now = new Date();
      let tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
      let timeLeft = tomorrow - now;
      return timeLeft;
    }
  
    React.useEffect(() => {
      const timer = setInterval(() => {
        setTimeLeft(calculateTimeLeft());
      }, 1000);
  
      return () => {
        clearInterval(timer);
      };
    }, []);
      const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
  
    return (
      <div className="countdown">
        <p>
          next integral in: {hours}:{minutes}:{seconds}
        </p>
      </div>
    );
  }

  export default Countdown;