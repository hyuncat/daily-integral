import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import './Timer.css';

function Timer({ time, setTime }) {
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setTime(time => time + 10);
      }, 10);
    } else if (!isActive && time !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, time]);

  const formatTime = () => {
    const seconds = `0${Math.floor((time / 1000) % 60)}`.slice(-2);
    const minutes = `0${Math.floor((time / 60000) % 60)}`.slice(-2);

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