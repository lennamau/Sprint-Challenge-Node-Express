const express = require('express')
const actionDb = require('./actionModel')
const projectDb = require('../projects/projectModel')
const router = express.Router()


//Get

router.get('/', (req, res) =>{
    actionDb.get()
    .then(actions => {
        res.status(200).json({actions})
    })
    .catch(err => {
        res.status(500).json({ message: 'The action information could not be retrieved'})
    })
})

//Get by id
router.get("/:id", (req, res) => {
    const id = req.params.id;
    actionDb.get(id)
    .then(action => {
        res.status(200).json({action});
    })
    .catch(err => {
        res.status(404).json( {message: 'The action with specified ID can not be found' })
    })
  });
