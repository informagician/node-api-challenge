/*
play this: https://www.youtube.com/watch?v=d-diB65scQU

Sing along:

here's a little code I wrote, please read the README word for word, don't worry, you got this
in every task there may be trouble, but if you worry you make it double, don't worry, you got this
ain't got no sense of what is REST? just concentrate on learning Express, don't worry, you got this
your file is getting way too big, bring a Router and make it thin, don't worry, be crafty
there is no data on that route, just write some code, you'll sort it out… don't worry, just hack it…
I need this code, but don't know where, perhaps should make some middleware, don't worry, just hack it

Go code!
*/
const express = require('express');
const server = express();
server.use(express.json());
const Projects = require('./data/helpers/projectModel')
const Actions = require('./data/helpers/actionModel')


server.get('/', (req,res) => {
    res.status(200).json('Its Working')
})


// Projects CRUD
server.get('/api/projects', (req,res) => {
    Projects.get().then(p => {
        res.status(200).json(p)
    }).catch(err => {
        res.status(500).json({errorMessage:"something went wrong with get"})
    }) 
})

server.post('/api/projects', (req,res) => {
    const project = req.body

    Projects.insert(project).then(project => {
        res.status(201).json(project)
    }).catch(err => {
        res.status(500).json({errorMessage:"something went wrong with insert"})
    })
})

server.put('/api/projects/:id', (req,res) => {
    const id = req.params.id
    const changes = req.body

    Projects.update(id,changes).then(project => {
        res.status(200).json(changes)
    }).catch(err => {
        res.status(500).json({errorMessage:"something went wrong with update"})
    })
})

server.delete('/api/projects/:id', (req,res) => {
    const id = req.params.id

    Projects.remove(id).then(projects => {
        res.status(200).json(projects)
    }).catch(err => {
        res.status(500).json({errorMessage:"something went wrong with delete"})
    })
})

server.get('/api/projects/:id/actions', (req,res) => {
    const id = req.params.id
    Projects.getProjectActions(id).then(actions => {
        res.status(200).json(actions)
    }).catch(er => {
        res.status(500).json({errorMessage:"something went wrong with getting actions"})
    })
})

// Projects Action CRUD
server.get('/api/actions/:id', (req,res) => {
    const id = req.params.id
    Actions.get(id).then(action => {
        res.status(200).json(action)
    }).catch(err => {
        res.status(500).json({errorMessage:"something went wrong with get"})
    })
})

server.post('/api/actions', (req,res) => {
    const action = req.body
    Actions.insert(action).then(actions => {
        res.status(201).json(actions)
    }).catch(err => {
        res.status(500).json({errorMessage:"something went wrong with insert"})
    })
})

server.put('/api/actions/:id', (req,res) => {
    const id = req.params.id
    const changes = req.body
    Actions.update(id,changes).then(actions => {
        res.status(200).json(actions)
    }).catch(err => {
        res.status(500).json({errorMessage:"something went wrong with updating actions"})
    })
})

const port = 5000;

server.listen(port, () => {
    console.log(`\n* Server Running on Port ${port}*\n`)
})