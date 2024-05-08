import React, { useState, useContext } from 'react';
import { Form, Button, Alert, Container, Tabs, Tab } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../contexts/UserContext';

function AuthPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameTaken, setUsernameTaken] = useState(false);
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleSignUp = (event) => {
        event.preventDefault();

        fetch('http://localhost:5001/api/users/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.token) {
                localStorage.setItem('token', data.token); // save the token in local storage
                setUser({ username: username }); // set the user in the global state
                navigate('/'); // navigate to the home page
            } else {
                setUsernameTaken(true); // show the alert if the username is taken
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    const handleLogin = (event) => {
        event.preventDefault();

        fetch(`http://localhost:${process.env.REACT_APP_SERVERPORT}/api/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.token) {
                localStorage.setItem('token', data.token); // save the token in local storage
                setUser({ username: username }); // set the user in the global state
                navigate('/'); // navigate to the home page
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    return (
        <Container className="d-flex justify-content-center" style={{ height: '80vh', marginTop: '20px' }}>
            <Tabs defaultActiveKey="login" id="uncontrolled-tab-example" className="mb-3" style={{background: '#f0f0f0'}}>
                <Tab eventKey="login" title="login">
                    <Container className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
                        <Form style={{ width: '30vh' }} onSubmit={handleLogin}>
                            <h1 className='heading'>login</h1>
                            <Form.Group className="mb-3" controlId="username">
                                <Form.Label>username</Form.Label>
                                <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="password">
                                <Form.Label>password</Form.Label>
                                <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} />
                            </Form.Group>
                            <Button variant="primary" type="submit">login</Button>
                        </Form>
                    </Container>
                </Tab>
                <Tab eventKey="signup" title="sign up">
                    <Container className="d-flex justify-content-center align-items-center" style={{ height: '80vh'}}>
                        <Form style={{ width: '30vh' }} onSubmit={handleSignUp}>
                            <h1 className='heading'>sign up</h1>
                            <Form.Group className="mb-3" controlId="username">
                                <Form.Label>username</Form.Label>
                                <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} />
                                {usernameTaken && <Alert variant="danger">username is already taken</Alert>}
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="password">
                                <Form.Label>password</Form.Label>
                                <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} />
                            </Form.Group>
                            <Alert variant="warning" style={{ width: "100%", marginBottom: "15px" }}>
                                <p className="mb-0">
                                    Please note that passwords are not secure—don't use a password you use anywhere else.
                                </p>
                            </Alert>
                            <Button variant="primary" type="submit">sign up</Button>
                        </Form>
                    </Container>
                </Tab>
            </Tabs>
        </Container>
    );
}

export default AuthPage;