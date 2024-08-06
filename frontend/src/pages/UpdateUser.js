import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';

function UpdateUser() {
    const [updateInfo, setUpdateInfo] = useState({
        name: '',
        email: '',
        location: '',
        newPassword: '',
        confirmNewPassword: ''
    });

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/home');
            return;
        }

        const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));
        if (storedUser) {
            setUpdateInfo(u => ({
                ...u,
                name: storedUser.name || '',
                email: storedUser.email || '',
                location: storedUser.location || ''
            }));
        }
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdateInfo({
            ...updateInfo,
            [name]: value
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const { newPassword, confirmNewPassword } = updateInfo;

        if (newPassword && newPassword !== confirmNewPassword) {
            return handleError('Passwords do not match');
        }

        try {
            const token = localStorage.getItem('token');
            // const url = `http://localhost:8080/auth/update`;
            const url = `https://authorization-mern-app.vercel.app/auth/update`;
            const response = await fetch(url, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(updateInfo)
            });
            console.log(response)
            const result = await response.json();
            const { success, message, user, error } = result;
            if (success) {
                handleSuccess(message);
                localStorage.setItem('loggedInUser', JSON.stringify(user));
                setTimeout(() => {
                    navigate('/home');
                }, 1000);
            } else if (error) {
                const details = error?.details[0].message;
                handleError(details);
            } else if (!success) {
                handleError(message);
            }
        } catch (err) {
            handleError("Something Wrong"+err);
        }
    };

    return (
        <div className='container'>
            <h1>Update Profile</h1>
            <form onSubmit={handleUpdate}>
                <div>
                    <label htmlFor='name'>Name</label>
                    <input
                        onChange={handleChange}
                        type='text'
                        name='name'
                        value={updateInfo.name}
                    />
                </div>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input
                        onChange={handleChange}
                        type='email'
                        name='email'
                        value={updateInfo.email}
                    />
                </div>
                <div>
                    <label htmlFor='location'>Location</label>
                    <input
                        onChange={handleChange}
                        type='text'
                        name='location'
                        value={updateInfo.location}
                    />
                </div>
                <div>
                    <label htmlFor='newPassword'>New Password</label>
                    <input
                        onChange={handleChange}
                        type='password'
                        name='newPassword'
                        value={updateInfo.newPassword}
                        autoComplete="new-password"
                    />
                </div>
                <div>
                    <label htmlFor='confirmNewPassword'>Confirm New Password</label>
                    <input
                        onChange={handleChange}
                        type='password'
                        name='confirmNewPassword'
                        value={updateInfo.confirmNewPassword}
                        autoComplete="new-password"
                    />
                </div>
                <button type='submit'>Update</button>
            </form>
            <ToastContainer />
        </div>
    );
}

export default UpdateUser;
