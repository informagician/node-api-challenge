const express = require('express');

const Projects = require('../helpers/projectModel');

const router = express.Router();

// Projects CRUD
router.get('/', (req,res) => {
    Projects.get().then(p => {
        res.status(200).json(p)
    }).catch(err => {
        res.status(500).json({errorMessage:"something went wrong with get"})
    }) 
})

router.post('/', (req,res) => {
    const project = req.body

    Projects.insert(project).then(project => {
        res.status(201).json(project)
    }).catch(err => {
        res.status(500).json({errorMessage:"something went wrong with insert"})
    })
})

router.put('/:id', (req,res) => {
    const id = req.params.id
    const changes = req.body

    Projects.update(id,changes).then(project => {
        res.status(200).json(changes)
    }).catch(err => {
        res.status(500).json({errorMessage:"something went wrong with update"})
    })
})

router.delete('/:id', (req,res) => {
    const id = req.params.id

    Projects.remove(id).then(projects => {
        res.status(200).json(projects)
    }).catch(err => {
        res.status(500).json({errorMessage:"something went wrong with delete"})
    })
})

router.get('/:id/actions', (req,res) => {
    const id = req.params.id
    Projects.getProjectActions(id).then(actions => {
        res.status(200).json(actions)
    }).catch(er => {
        res.status(500).json({errorMessage:"something went wrong with getting actions"})
    })
})

module.exports = router;