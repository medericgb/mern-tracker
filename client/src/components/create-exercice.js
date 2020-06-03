import React, { useState, useEffect, useRef } from 'react';
import DatePicker from "react-datepicker";
import axios from 'axios';

function CreateExercice() {
    const [username, setUsername] = useState('')
    const [description, setDescription] = useState('')
    const [duration, setDuration] = useState('')
    const [date, setDate] = useState(new Date())
    const [users, setUsers] = useState([])

    const userInput = useRef(username)

    // componentDidMount
    useEffect(() => {
        axios.get('http://localhost:5000/users')
            .then(res => {
                if (res.data.length > 0) {
                    setUsers(res.data.map(user => user.username))
                    setUsername({username: res.data[0].username})
                }
            })
    }, [])

    const handleChangeUsername = e => setUsername(e.target.value)
    const handleChangeDescription = e => setDescription(e.target.value)
    const handleChangeDuration = e => setDuration(e.target.value)
    const handleChangeDate = date => setDate(date)

    const handleSubmit = e => {
        if (e) e.preventDefault()
        const exercice = {
            username: username,
            description: description,
            duration: duration,
            date: date,
        }
        console.log(exercice)

        // Send datas to the db
        axios.post('http://localhost:5000/exercices/add', exercice)
            .then(res => console.log(res.data))    
        // Set empty fields
        setUsername('')
        setDescription('')
        setDuration(0)
        setDate(new Date())
    }

    return (
        <div>
            <h3>Create New Exercice</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Username </label>
                    <select className="form-control" required autoFocus={true} value={username} onChange={handleChangeUsername}>
                        { users.map((user)=> <option key={user} value={user}>{user}</option>) }
                    </select>
                </div>
                <div className="form-group">
                    <label>Description </label>
                    <input className="form-control" type="text" required value={description} onChange={handleChangeDescription} />
                </div>
                <div className="form-group">
                    <label>Duration (In minutes)</label>
                    <input className="form-control" type="text" required value={duration} onChange={handleChangeDuration} />
                </div>
                <div className="form-group">
                    <label>Date</label>
                    <div>
                        <DatePicker selected={date} onChange={handleChangeDate} />
                        {/* <input type="date" value={date} onChange={handleChangeDate} /> */}
                    </div>
                </div>
                <div className="form-group">
                    <input type="submit" value="Create Exercice" className="btn btn-primary"/>
                </div>
            </form>
        </div>
    )
}

export default CreateExercice;