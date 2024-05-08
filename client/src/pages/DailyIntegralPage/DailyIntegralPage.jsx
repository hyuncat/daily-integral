import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MathJax, MathJaxContext } from "better-react-mathjax";

import Timer from '../../components/Timer/Timer';
import CurrentDate from '../../components/CurrentDate/CurrentDate';
import AnswerInput from '../../components/AnswerInput/AnswerInput';
import Grid from '@mui/material/Grid';

import './DailyIntegralPage.css';

function DailyIntegralPage() {
  const [time, setTime] = useState(0); 
  const [integral, setIntegral] = useState();
  const [solution, setSolution] = useState();
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    const currentDate = new Date();
    const dateString = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;
  
    axios.get('/integrals.json')
      .then(response => {
        const todayIntegral = response.data.integrals.find(integral => integral.date === dateString);
  
        if (todayIntegral) {
          setIntegral(todayIntegral.integral);
          setSolution(todayIntegral.solution);
        } else {
          console.error('No integral found for today');
        }
      })
      .catch(error => console.error('Fetch error:', error));
  }, []);

  // const handleAnswerSubmit = (userAnswer) => {
  //   if (userAnswer !== solution) {
  //     setAttempts(attempts + 1);
  //   }
  // };

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
          <AnswerInput time={time} n_attempts={attempts} setAttempts={setAttempts} soln={solution}/> {/* pass time and onAnswerSubmit as props */}
        </div>
        <div className="attempts-container">
          <p>Attempts: {attempts}</p>
        </div>
      </div>
    </MathJaxContext>
  );
}

export default DailyIntegralPage;