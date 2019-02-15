const express = require("express");
const projectDb = require("../projects/projectModel");
const router = express.Router();



//Get actions

router.get('/:id/actions/', (req, res) => {
    const id = req.params.id;

    projectDb
    .get(id)
    .then(project => {
        if (project) {
            projectDb
                .getProjectActions(id)
                .then(actions => {
                    res.status(200).json(actions);
                })
                .catch(() => {
                    res.status(500).json({ error: "The project information could not be retrieved"});
                });
        } else {
            res.status(404).json({ error : 'No project found with the specified ID.' });
        }
    })
    .catch(() => {
        res.status(500).json({ error : 'No project information could be retrieved.'});
    });
})

//Get project by id

router.get('/:id', (req, res) => {
    const id = req.params.id;

    projectDb
        .get(id)
        .then(project => {
            if (project) {
                res.status(200).json({project});
            } else {
                res.status(404).json({ error : 'No project found with the specified ID.' });
            }
        })
        .catch(() => {
            res.status(500).json({ error : 'No project information could be retrieved.' });
        });
})

router.get('/', (req, res) => {
    projectDb
        .get()
        .then(projects => {
            res.status(200).json(projects);
        })
        .catch(() => {
            res.status(500).json({ error: 'No project information could be retrieved. '});
        });
})

router.post('/', (req, res) => {
    const newProject = req.body;

    if (newProject.name && newProject.description) {
        projectDb
            .insert(newProject)
            .then(insertedProject => {
                res.status(201).json(insertedProject);
            })
            .catch(() => {
                res.status(500).json({ error: 'The project could not be added.'});
            });
    } else {
        res.status(400).json({ error: 'Please include a name and description.' });
    }
})

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const dataForUpdate = req.body;

    projectDb
        .update(id, dataForUpdate)
        .then(updatedProject => {
            if (updatedProject) {
                res.status(200).json(updatedProject);
            } else {
                res.status(404).json({ error: "There was no project found with the specified ID." });
            }
        })
        .catch(() => {
            res.status(500).json({ error: "The project could not be updated."});
        });
})

router.delete('/:id', (req, res) => {
    const id = req.params.id;

    projectDb
        .remove(id)
        .then(recordsDeleted => {
            if (recordsDeleted === 1) {
                res.status(200).json(recordsDeleted);
            } else {
                res.status(404).json({ error: "There was no project found with the specified ID." });
            }
        })
        .catch(() => {
            res.status(500).json({ error: "The action could not be deleted." });
        });
})


module.exports = router;












