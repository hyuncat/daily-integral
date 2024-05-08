import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import './Timer.css';

function Timer() {
  const [start] = useState(Date.now());
  const [now, setNow] = useState(start);

  useEffect(() => {
    const intervalID = setInterval(() => setNow(Date.now()), 10);
    return () => clearInterval(intervalID);
  }, []);

  const formatTime = () => {
    const counter = now - start;
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