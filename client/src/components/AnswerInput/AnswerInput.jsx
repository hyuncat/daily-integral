import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addStyles, EditableMathField } from 'react-mathquill';
import { Button, Form, Alert } from 'react-bootstrap';

// inserts the required css to the <head> block.
// you can skip this, if you want to do that by yourself.
addStyles()

function AnswerInput({ time, n_attempts, setAttempts, soln }) {
  const [latex, setLatex] = useState('');
  const [falseAlarm, setFalseAlarm] = useState(false);
  const navigate = useNavigate();


  const handleSubmit = (event) => {
    event.preventDefault();

    // TODO: make error checking more sophisticated
    if (latex !== soln) {
      setFalseAlarm(true);
      setAttempts(prevAttempts => prevAttempts + 1);

      // hide false alarm after 3 seconds
      setTimeout(() => {
        setFalseAlarm(false);
      }, 3000);
    } 
    else {
      setFalseAlarm(false);
      navigate('/leaderboard', { 
        state: { 
          answer: latex, 
          time: time, 
          n_attempts: n_attempts
        } 
      });
  }}

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="answer-input-form">
        <Form.Label>answer:</Form.Label>
        <br />
        <EditableMathField style={{ padding: '0.75rem' }}
          latex={latex}
          onChange={(mathField) => {
            setLatex(mathField.latex())
          }}
        />
      </Form.Group>
      {falseAlarm && (
      <Alert variant="danger" onClose={() => setFalseAlarm(false)} dismissible>
        incorrect
      </Alert>
      )}
      <Button variant="primary" type="submit">
        submit
      </Button>
    </Form>
  )
}

export default AnswerInput;