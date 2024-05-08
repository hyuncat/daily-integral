import React, { useState, useEffect } from 'react';
import { MathJax, MathJaxContext } from "better-react-mathjax";

import Timer from '../../components/Timer/Timer';
import CurrentDate from '../../components/CurrentDate/CurrentDate';
import AnswerInput from '../../components/AnswerInput/AnswerInput';
import Grid from '@mui/material/Grid';

import './DailyIntegralPage.css';

function DailyIntegralPage() {
  const [time, setTime] = useState(0); 
  const [integral, setIntegral] = useState();
  const [hasFetched, setHasFetched] = useState(false); // New state variable

  useEffect(() => {
    if (!hasFetched) {
      const currentDate = new Date();
      const dateString = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;

      fetch(`http://localhost:5001/api/integrals/today`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          setIntegral(data.integral);
          setHasFetched(true); // Set hasFetched to true after successful fetch
        })
        .catch(error => {
          console.error('Fetch error:', error);
          setHasFetched(true); // Also set hasFetched to true if fetch fails
        });
    }
  }, [hasFetched]); // Depend on hasFetched instead of integral

  return (
    <MathJaxContext>
      <div className="daily-integral-page">
        <Grid container spacing={3}>
          <Grid item xs={4} md={3} lg={2}>
            <div className="timer-container" style={{ textAlign: 'left' }}>
              <Timer time={time} setTime={setTime} /> {/* pass time and setTime as props */}
            </div>
          </Grid>
          <Grid item xs={4} md={6} lg={8} style={{marginTop: '20px'}}>
            <CurrentDate fontSize={'1.5em'}/>
            <hr size="2" width="50%" color="grey" style={{margin: '0 auto', marginTop: '-1em', marginBottom: '1em'}}/>
          </Grid>
        </Grid>
        <div className="integral-container">
          <p className="integral">
            <MathJax>{`\\[${integral || 'Fetching...' }\\]`}</MathJax>
          </p>
        </div>
        <div>
          <AnswerInput time={time} /> {/* pass time as a prop */}
        </div>
      </div>
    </MathJaxContext>
  );
}

export default DailyIntegralPage;