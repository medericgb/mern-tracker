import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EditExercice(props) {
    const [username, setUsername] = useState('')
    const [description, setDescription] = useState('')
    const [duration, setDuration] = useState('')
    const [date, setDate] = useState(new Date())
    const [users, setUsers] = useState([])

    const handleChangeUsername = e => setUsername(e.target.value)
    const handleChangeDescription = e => setDescription(e.target.value)
    const handleChangeDuration = e => setDuration(e.target.value)
    const handleChangeDate = date => setDate(date)

    useEffect(() => {
        axios.get('http:localhost:5000/exerices/' + props.match.params.id)
            .then(res => {
                setUsername(res.data.username)
                setDescription(res.data.description)
                setDuration(res.data.duration)
                setUsers([])
                setDate(new Date(res.data.date))
            })
            .catch(err => console.log(err))

        axios.get('http://localhost:5000/users')
            .then(res => {
                if (res.data.length > 0) {
                    setUsers(res.data.map(user => user.username))
                    console.log(res.data)
                }
            })
    }, [])

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
        axios.post('http://localhost:5000/exercices/update' + props.match.params.id, exercice)
            .then(res => console.log(res.data))    
        // Set empty fields
        setUsername('')
        setDescription('')
        setDuration(0)
        setDate(new Date())
    }
    
    return (
        <div>
            <h3>Edit Exercice</h3>
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
                        {/* <DatePicker selected={date} onChange={handleChangeDate} /> */}
                        <input type="date" value={date} onChange={handleChangeDate} />
                    </div>
                </div>
                <div className="form-group">
                    <input type="submit" value="Edit Exercice" className="btn btn-primary"/>
                </div>
            </form>
        </div>
    )
}

export default EditExercice;