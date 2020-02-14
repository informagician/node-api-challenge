import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {

  const [ projects, setProjects ] = useState([])
  const [ newProject, setNewProject ] = useState({})

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

  const handleChange = e => {
    setNewProject({
      ...newProject,
      [e.target.name]: e.target.value
    })
  }

  const handleNew = e => {
    e.preventDefault();
    console.log(newProject)
    axios
    .post(`http://localhost:5000/api/projects`, newProject)
    .then(res => {
      axios
      .get(`http://localhost:5000/api/projects`)
      .then(res => {
        setProjects(res.data)
      })
    })
    .catch(err => console.log(err))
  }
  return (
    <>
    <h1>Projects {'&'} Actions Challenge</h1>
    <hr/>
    {projects.map(p => (
      <div key={p.id}>
        <h3>{p.name}</h3>
        <p>Project Description:{p.description}</p>
        <p>Project Completed: {p.completed === false ? 'Not Completed' : 'Complete'}</p>
        <p><span>[Edit]</span> <span>[Delete]</span> <span>[Mark As Complete]</span> <span>[Actions]</span></p>
      </div>
    ))}
    <hr/>
    <h2>Add new Project</h2>
    <label>Project Name:<input type="text" name="name" onChange={handleChange} /></label>
    <label>Project Description:<input type="text" name="description" onChange={handleChange} /></label>
    <button onClick={handleNew}>Submit</button>
    </>
  );
}

export default App;
