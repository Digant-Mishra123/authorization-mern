import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';
import '../Css/Home.css';

function Home() {
    const [loggedInUser, setLoggedInUser] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));
        console.log('Retrieved user from localStorage:', storedUser);
        if (storedUser) {
            setLoggedInUser(storedUser);
        }
    }, []);

    const handleLogout = (e) => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        handleSuccess('User logged out');
        setTimeout(() => {
            navigate('/login');
        }, 1000);
    };

    const handleUpdateProfile = () => {
        navigate('/update-profile');
    };

    return (
        <div className="container-home">
            <h1>Welcome, {loggedInUser.name}</h1>
            <div className='content'>
                <div className='note'>
                    Good to see you here!
                </div>
                <div className='note'>
                    <h3 className='header-email'>Email: {loggedInUser.email}</h3>
                </div>
                <div className='note'>
                    <h3 className='header-location'>Location: {loggedInUser.location}</h3>
                </div>
            </div>
            <div className='button'>
                    <button className="center-button" onClick={handleLogout}>Logout</button>
                    <button className="center-button" onClick={handleUpdateProfile}>Update</button>
                </div>
            <ToastContainer />
        </div>
    );
}

export default Home;
