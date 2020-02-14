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

router.post('/', validateNewProject, (req,res) => {
    const project = req.body

    Projects.insert(project).then(project => {
        res.status(201).json(project)
    }).catch(err => {
        res.status(500).json({errorMessage:"something went wrong with insert"})
    })
})

router.put('/:id', validateProjectId, validateEditProject, (req,res) => {
    const id = req.params.id
    const changes = req.body

    Projects.update(id,changes).then(project => {
        res.status(200).json(changes)
    }).catch(err => {
        res.status(500).json({errorMessage:"something went wrong with update"})
    })
})

router.delete('/:id', validateProjectId, (req,res) => {
    const id = req.params.id

    Projects.remove(id).then(projects => {
        res.status(200).json(projects)
    }).catch(err => {
        res.status(500).json({errorMessage:"something went wrong with delete"})
    })
})

router.get('/:id/actions', validateProjectId, (req,res) => {
    const id = req.params.id
    Projects.getProjectActions(id).then(actions => {
        res.status(200).json(actions)
    }).catch(er => {
        res.status(500).json({errorMessage:"something went wrong with getting actions"})
    })
})

function validateProjectId(req,res,next){
    const id = req.params.id
    Projects.get(id).then(p => {
        if(Object.keys(p).length > 0){
            next()
        }
    }).catch(err => {
        res.status(400).json({message:"Invalid Project Id"})
    })
}

function validateNewProject(req, res, next) {
    // do your magic!
    const body = req.body;
    console.log(body)
    if(Object.keys(body).length === 0){
        res.status(400).json({ message: "missing project data" })
    } else if (!body.name) {
        res.status(400).json({ message: "missing required name field" })
    } else if (!body.description) {
        res.status(400).json({ message: "missing required description field" })
    }
    next();
}

function validateEditProject(req, res, next) {
    // do your magic!
    const body = req.body;

    if(Object.keys(body).length === 0){
        res.status(400).json({ message: "missing project data" })
    }
    next();
}

module.exports = router;