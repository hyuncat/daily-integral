import React from 'react';
import './CurrentDate.css';

function CurrentDate() {
    // State returns a pair: The current state value and a function that lets you update it.
    const [date, setDate] = React.useState(new Date());
  
    React.useEffect(() => {
      const timer = setInterval(() => {
        setDate(new Date());
      }, 1000);
  
      return () => {
        clearInterval(timer);
      };
    }, []);
  
    return (
        <div className="current-date-container">
            <p className="current-date">
                {date.toDateString().toLowerCase()}
            </p>
        </div>
    );
  }
  
  export default CurrentDate;