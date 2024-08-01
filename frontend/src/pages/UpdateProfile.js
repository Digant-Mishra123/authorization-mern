import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';

function UpdateProfile() {
    const [profileInfo, setProfileInfo] = useState({
        name: '',
        email: '',
        location: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileInfo({ ...profileInfo, [name]: value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/auth/update-profile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}` // Ensure token is included
                },
                body: JSON.stringify(profileInfo)
            });
            const result = await response.json();
            if (result.success) {
                handleSuccess(result.message);
                navigate('/home');
            } else {
                handleError(result.error || result.message);
            }
        } catch (err) {
            handleError(err);
        }
    };

    return (
        <div className="container">
            <h1>Update Profile</h1>
            <form onSubmit={handleUpdate}>
                <div>
                    <label htmlFor='name'>Name</label>
                    <input
                        type='text'
                        name='name'
                        onChange={handleChange}
                        value={profileInfo.name}
                    />
                </div>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input
                        type='email'
                        name='email'
                        onChange={handleChange}
                        value={profileInfo.email}
                    />
                </div>
                <div>
                    <label htmlFor='location'>Location</label>
                    <input
                        type='text'
                        name='location'
                        onChange={handleChange}
                        value={profileInfo.location}
                    />
                </div>
                <button type='submit'>Update</button>
            </form>
            <ToastContainer />
        </div>
    );
}

export default UpdateProfile;
