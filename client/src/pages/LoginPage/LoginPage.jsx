import React, { useState, useContext } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import UserContext from '../../contexts/UserContext';
import UserEntryContext from '../../contexts/UserEntryContext';

import AuthNav from '../AuthPage/AuthNav';
import InfoPageHelper from '../../components/InfoPageHelper/InfoPageHelper';

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState(); // add state for username error
    const [passwordError, setPasswordError] = useState(); // add state for password error

    const { setUser } = useContext(UserContext);
    const { userEntry, setUserEntry } = useContext(UserEntryContext);

    const [activeKey, setActiveKey] = useState("/login"); 
    const [loginSuccess, setLoginSuccess] = useState(false); 
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        fetch(`${process.env.REACT_APP_API_BASE_URL}/api/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(data => {
                    throw new Error(data.error);
                });
            }
            return response.json();
        })
        .then(data => {
            if (data.token) {
              localStorage.setItem('token', data.token); // save the token in local storage
              setUser({ username: username }); // set the user in the global state
          
              // If userEntry exists, post it to the user's account
              if (userEntry) {
                const updatedUserEntry = { ...userEntry, username }; // update the userEntry with the logged-in user's username
          
                fetch(`${process.env.REACT_APP_API_BASE_URL}/api/users/post-entry`, {
                  method: 'PUT',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${data.token}` // pass the token for authorization
                  },
                  body: JSON.stringify(updatedUserEntry),
                })
                .then(response => response.json())
                .then(data => {
                  console.log('User entry posted:', data);
                })
                .catch(error => console.error('Error posting user entry:', error));

                setTimeout(() => {
                    navigate('/leaderboard'); // navigate to the home page
                  }, 2000); // delay of 2 seconds

              } else {
                setLoginSuccess(true); // set login success to true
                setTimeout(() => {
                    navigate('/'); // navigate to the home page
                  }, 2000); // delay of 2 seconds
              }
              
            }
          })
        .catch((error) => {
            console.error('Error:', error);
            if (error.message === 'invalid username') {
                setUsernameError('username does not exist');
            } else if (error.message === 'invalid password') {
                setUsernameError('');
                setPasswordError('incorrect password');
            }
        });
    };

    if (loginSuccess) {
        return <InfoPageHelper msg="you are now logged in!" />;
    }

    return (
        <>
        <AuthNav activeKey={activeKey} setActiveKey={setActiveKey} />
        <Container className="d-flex justify-content-center align-items-center" style={{ height: '70vh' }}>
            <Form style={{ width: '40%' }} onSubmit={handleSubmit}>
                <h1 className='heading'>login</h1>
                <Form.Group className="mb-3" controlId="username">
                    <Form.Label>username</Form.Label>
                    <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} isInvalid={!!usernameError} />
                    <Form.Control.Feedback type="invalid">{usernameError}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>password</Form.Label>
                    <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} isInvalid={!!passwordError} />
                    <Form.Control.Feedback type="invalid">{passwordError}</Form.Control.Feedback>
                </Form.Group>
                <Button variant="primary" type="submit">login</Button>
            </Form>
        </Container>
        </>
    );
}

export default LoginPage;