import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './Timer.css';

function Timer() {
  const [milliseconds, setMilliseconds] = useState(0);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setMilliseconds(milliseconds => milliseconds + 10);
      }, 10);
    } else if (!isActive && milliseconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, milliseconds]);

  const stopTimer = () => {
    setIsActive(false);
  }

  const formatTime = () => {
    // const getMilliseconds = `0${(milliseconds % 1000) / 10}`.slice(-2);
    const seconds = `0${Math.floor((milliseconds / 1000) % 60)}`.slice(-2);
    const minutes = `0${Math.floor((milliseconds / 60000) % 60)}`.slice(-2);

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