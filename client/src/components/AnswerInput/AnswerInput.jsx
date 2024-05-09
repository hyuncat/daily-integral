import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { addStyles, EditableMathField } from 'react-mathquill';
import { Button, Form, Alert } from 'react-bootstrap';

import UserContext from '../../contexts/UserContext';
import UserEntryContext from '../../contexts/UserEntryContext';

// inserts the required css to the <head> block.
// you can skip this, if you want to do that by yourself.
addStyles()

function AnswerInput({ time, n_attempts, setAttempts, soln }) {
  const [latex, setLatex] = useState('');
  const [falseAlarm, setFalseAlarm] = useState(false);
  const { user } = useContext(UserContext);
  const { setUserEntry } = useContext(UserEntryContext); 

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (latex !== soln) {
      setFalseAlarm(true);
      setAttempts(prevAttempts => prevAttempts + 1);

      setTimeout(() => {
        setFalseAlarm(false);
      }, 3000);
    } 
    else {
      setFalseAlarm(false);
      const newUserEntry = { username: user ? user.username : 'you', n_attempts: n_attempts+1, time };
      setUserEntry(newUserEntry);
  
      // If the user is logged in, update their document in the database
      if (user) {
        try {
          await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/users/post-entry`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUserEntry),
          })
            .then(response => response.json())
            .then(data => {
              // handle the response data
            })
            .catch(error => {
              console.error('Error making request:', error);
            });
      
          navigate('/leaderboard');
        } catch (error) {
          console.error('Failed to update user:', error);
        }
      } else {
        navigate('/leaderboard'); 
      }
    }
  }

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