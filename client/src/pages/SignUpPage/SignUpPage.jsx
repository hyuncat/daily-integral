import React from 'react';
import Alert from 'react-bootstrap/Alert';

function SignUpPage() {
    fetch('http://localhost:5001/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: 'example',
            password: 'password',
        }),
        })
        .then(response => response.json())
        .then(data => {
            localStorage.setItem('token', data.token); // save the token in local storage
        })
        .catch((error) => {
            console.error('Error:', error);
    });
    return (
        <div style={{display: 'flex', justifyContent: 'center', height: '100vh'}}>
            <form style={{width: '40%'}}>
                <div className="title-container">
                    <h1 className='heading'>sign up</h1>
                </div>
                <div className="mb-3">
                    <label for="username" className="form-label">username</label>
                    <input type="text" className="form-control" id="username" />
                </div>
                <div className="mb-3">
                    <label for="password" className="form-label">password</label>
                    <input type="password" className="form-control" id="password" />
                </div>
                <span style={{width: "50%", textAlign: 'justify', textAlign: 'center'}}>
                    {/* <p>Make an account to post your scores to the leaderboard. Please note that passwords are not secure—don't use a password you use anywhere else.</p> */}
                        <Alert variant="warning">
                            <p className="mb-0">
                            Please note that passwords are not secure—don't use a password you use anywhere else.
                            </p>
                        </Alert>
                </span>
                <button type="submit" className="btn btn-primary">sign up</button>
            </form>
        </div>
    );
}

export default SignUpPage;