import React, { useEffect, useContext } from 'react';
import { Alert, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import InfoPageHelper from '../../components/InfoPageHelper/InfoPageHelper';
import UserContext from '../../contexts/UserContext';

function LogoutPage() {
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem('token'); // remove the token from local storage
        setUser(null); // clear the user from the global state
        setTimeout(() => navigate('/'), 2000); // navigate to the home page after 2 seconds
    }, [setUser, navigate]);

    return (
        <InfoPageHelper msg="you are now logged out!" />
    );
}

export default LogoutPage;