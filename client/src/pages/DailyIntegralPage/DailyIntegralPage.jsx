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

  useEffect(() => {
    const currentDate = new Date();
    const dateString = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;
  
    // current integrals from https://math.mit.edu/~yyao1/pdf/qualifying_round_2024_test.pdf
    fetch('/integrals.json')
      .then(response => response.json())
      .then(data => {
        const todayIntegral = data.integrals.find(integral => integral.date === dateString);
  
        if (todayIntegral) {
          setIntegral(todayIntegral.integral);
        } else {
          console.error('No integral found for today');
        }
      })
      .catch(error => console.error('Fetch error:', error));
  }, []);

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