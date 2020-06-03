import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const Exercice = (props) => {
    return (
        <tr>
            <td>{props.currentExercice.username}</td>
            <td>{props.exercice.description}</td>
            <td>{props.exercice.duration}</td>
            <td>{/*{props.exercice.date.substring(0,10)}*/}</td>
            <td>
                <Link to={'/edit/'+props.exercice._id}>Edit</Link> / <a href="#" onClick={props.deleted(props.exercice._id)}>Delete</a>
            </td>
        </tr>
    )
}

function ExercicesList() {
    const [exercices, setExercices] = useState([])
    
    const handleDelete = id => {
        axios.delete('http://localhost:5000/delete/' + id)
            .then(res => console.log(res.data))
        setExercices(exercices.filter(el => el._id !== id))
    }

    useEffect(() => {
        axios.get('http://localhost:5000/exercices')
            .then(res => {
                res.data.map(el => exercices.push(el))
            })
            .catch(err => console.log(err))
    }, [])

    const exercicesList = () => {
        return (
            exercices.map(currentExercice => {
                return <Exercice exercice={currentExercice} deleted={handleDelete} />
            })
        )
    }

    return (
        <div>
            <h3>Exercices</h3>
            <table className="table">
                <thead className="thead-light">
                    <tr>
                        <th>Username</th>
                        <th>Description</th>
                        <th>Duration</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    { exercicesList() }
                </tbody>
            </table>
        </div>
    )
}

export default ExercicesList;