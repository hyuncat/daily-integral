import React, { useState } from 'react';
import { Form, Button, Alert, Container } from 'react-bootstrap';

function SignUpPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameTaken, setUsernameTaken] = useState(false); // add this line

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log('username:', username);

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
            } else {
                setUsernameTaken(true); // show the alert if the username is taken
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    return (
        <Container className="d-flex justify-content-center" style={{ height: '100vh', marginTop: '10%' }}>
            <Form style={{ width: '40%' }} onSubmit={handleSubmit}>
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
    );
}

export default SignUpPage;