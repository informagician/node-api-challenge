import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {

  const [ projects, setProjects ] = useState([])

  useEffect(() => {
    axios
    .get(`http://localhost:5000/api/projects`)
    .then(res => {
      console.log(res.data)
      setProjects(res.data)
    })
    .catch(err => {
      console.log(err)
    })
  },[])

  return (
    <>
    <h1>Projects {'&'} Actions Challenge</h1>
    {projects.map(p => (
      <div key={p.id}>
        <h2>{p.name}</h2>
        <p>Project Description:{p.description}</p>
        <p>Project Completed: {p.completed}</p>
      </div>
    ))}
    </>
  );
}

export default App;
