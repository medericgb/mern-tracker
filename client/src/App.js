import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from './components/navbar';
import ExercicesList from './components/exercices-list';
import EditExercice from './components/edit-exercice';
import CreateExercice from './components/create-exercice';
import CreateUser from './components/create-user';

function App() {
  return (
    <Router>
      <Navbar />
      <br />
      <div className="container">
        <Route path="/" exact component={ExercicesList}/>
        <Route path="/edit/:id" component={EditExercice}/>
        <Route path="/create" component={CreateExercice}/>
        <Route path="/user" component={CreateUser}/>
      </div>
    </Router>

  );
}

export default App;
