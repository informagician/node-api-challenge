const express = require('express');

const Actions = require('../helpers/actionModel');
const Projects = require('../helpers/projectModel');

const router = express.Router();

// Projects Action CRUD
router.get('/:id', validateActionId,(req,res) => {
    const id = req.params.id
    Actions.get(id).then(action => {
        res.status(200).json(action)
    }).catch(err => {
        res.status(500).json({errorMessage:"something went wrong with get"})
    })
})

router.post('/', validateNewAction, validateProjectId, (req,res) => {
    const action = req.body
    Actions.insert(action).then(actions => {
        res.status(201).json(actions)
    }).catch(err => {
        res.status(500).json({errorMessage:"something went wrong with insert"})
    })
})

router.put('/:id',validateActionId, validateEditAction, (req,res) => {
    const id = req.params.id
    const changes = req.body
    Actions.update(id,changes).then(actions => {
        res.status(200).json(actions)
    }).catch(err => {
        res.status(500).json({errorMessage:"something went wrong with updating actions"})
    })
})

router.delete('/:id',validateActionId, (req,res) => {
    const id = req.params.id
    Actions.remove(id).then(actions => {
        res.status(200).json(actions)
    }).catch(err => {
        res.status(500).json({errorMessage:"something went wrong with deleting actions"})
    })
})

function validateActionId(req,res,next){
    const id = req.params.id
    Actions.get(id).then(p => {
        if(Object.keys(p).length > 0){
            next()
        }
    }).catch(err => {
        res.status(400).json({message:"Invalid Action Id"})
    })
}

function validateNewAction(req, res, next) {
    // do your magic!
    const body = req.body;

    if(Object.keys(body).length === 0){
        res.status(400).json({ message: "missing Action data" })
    } else if (!body.project_id) {
        res.status(400).json({ message: "missing required project id field" })
    } else if (!body.description) {
        res.status(400).json({ message: "missing required description field" })
    } else if (!body.notes) {
        res.status(400).json({ message: "missing required notes field" })
    }
    next();
}

function validateEditAction(req, res, next) {
    // do your magic!
    const body = req.body;

    if(Object.keys(body).length === 0){
        res.status(400).json({ message: "missing action data" })
    }
    next();
}

function validateProjectId(req,res,next){
    const id = req.body.project_id
    Projects.get(id).then(p => {
        if(Object.keys(p).length > 0){
            next()
        }
    }).catch(err => {
        res.status(400).json({message:"Invalid Project Id"})
    })
}

module.exports = router;