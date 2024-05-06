import React from 'react';
import './CurrentDate.css';

function CurrentDate({ fontSize }) {
    // State returns a pair: The current state value and a function that lets you update it.
    // TODO: only refresh the date when it gets close to midnight
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
        <>
          <div className="current-date-container">
            <p className="current-date" style={{ fontSize: `${fontSize}` }}>
                {date.toDateString().toLowerCase()}
            </p>
          </div>
        </>
    );
  }
  
  export default CurrentDate;