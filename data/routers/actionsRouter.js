const express = require('express');

const Actions = require('../helpers/actionModel');

const router = express.Router();

// Projects Action CRUD
router.get('/:id', (req,res) => {
    const id = req.params.id
    Actions.get(id).then(action => {
        res.status(200).json(action)
    }).catch(err => {
        res.status(500).json({errorMessage:"something went wrong with get"})
    })
})

router.post('/', (req,res) => {
    const action = req.body
    Actions.insert(action).then(actions => {
        res.status(201).json(actions)
    }).catch(err => {
        res.status(500).json({errorMessage:"something went wrong with insert"})
    })
})

router.put('/:id', (req,res) => {
    const id = req.params.id
    const changes = req.body
    Actions.update(id,changes).then(actions => {
        res.status(200).json(actions)
    }).catch(err => {
        res.status(500).json({errorMessage:"something went wrong with updating actions"})
    })
})

router.delete('/:id', (req,res) => {
    const id = req.params.id
    Actions.remove(id).then(actions => {
        res.status(200).json(actions)
    }).catch(err => {
        res.status(500).json({errorMessage:"something went wrong with deleting actions"})
    })
})

module.exports = router;