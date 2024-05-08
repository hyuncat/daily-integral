import React from 'react';
import { Alert, Container } from 'react-bootstrap';


function InfoPageHelper({msg}) {

    return (
        <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
            <Alert variant="success">
                {msg}
            </Alert>
        </Container>
    );
}

export default InfoPageHelper;