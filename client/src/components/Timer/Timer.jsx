import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import './Timer.css';

function Timer({ onTimeUpdate }) {
  const [startTime] = useState(Date.now());
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    const intervalID = setInterval(() => {
      const newElapsedTime = Date.now() - startTime;
      setElapsedTime(newElapsedTime);
      onTimeUpdate(newElapsedTime);
    }, 10);
    return () => clearInterval(intervalID);
  }, [startTime, onTimeUpdate]);

  const formatTime = () => {
    const counter = elapsedTime;
    const seconds = `0${Math.floor((counter / 1000) % 60)}`.slice(-2);
    const minutes = `0${Math.floor((counter / 60000) % 60)}`.slice(-2);

    return `${minutes}:${seconds}`;
  }

  return (
    <Card style={{ display: 'inline-block' }}>
      <Card.Header>time elapsed</Card.Header>
      <Card.Body>
        <Card.Text className="timer-p">
          {formatTime()}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Timer;