import React, { useState } from 'react';
import { MathJax, MathJaxContext } from "better-react-mathjax";

import Timer from '../../components/Timer/Timer';
import CurrentDate from '../../components/CurrentDate/CurrentDate';
import AnswerInput from '../../components/AnswerInput/AnswerInput';
import Grid from '@mui/material/Grid';

import './DailyIntegralPage.css';

function DailyIntegralPage() {
    // const [showModal, setShowModal] = useState(false)
    return (
        <MathJaxContext>
            <div className="daily-integral-page">
                <Grid container spacing={3}>
                    <Grid item xs={4} md={3} lg={2}>
                        <div className="timer-container" style={{ textAlign: 'left' }}>
                    <Timer />
                        </div>
                    </Grid>
                    <Grid item xs={4} md={6} lg={8} style={{marginTop: '20px'}}>
                        <CurrentDate fontSize={'1.5em'}/>
                        <hr size="2" width="50%" color="grey" style={{margin: '0 auto', marginTop: '-1em', marginBottom: '1em'}}/>
                    </Grid>
                </Grid>
                <div className="integral-container">
                <p className="integral">
                    <MathJax>{"\\[\\int_{2023}^{2025} 2024 \\, dx \\]"}</MathJax>
                </p>
                </div>
                <div>
                <AnswerInput />
                </div>
            </div>
        </MathJaxContext>
    );
}

export default DailyIntegralPage;