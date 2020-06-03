import React, { useState } from 'react';
import axios from 'axios';

function CreateUser() {
    const [username, setUsername] = useState('')
    
    const handleChangeUsername = e => setUsername(e.target.value)

    const handleSubmit = e => {
        if (e) e.preventDefault()
        const user = {
            username: username
        }
        console.log(user)
        // Send user to db
        axios.post('http://localhost:5000/users/add', user)
            .then(res => console.log(res.data))

        setUsername('')
    }



    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Username</label>
                    <input className="form-control" type="text" required value={username} onChange={handleChangeUsername} />
                </div>
                <div>
                    <input type="submit" value="Create User" className="btn btn-primary" />
                </div>
            </form>
        </div>
    )
}

export default CreateUser;