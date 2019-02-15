const express = require("express");
const actionDb = require("./actionModel");
const projectDb = require("../projects/projectModel");
const router = express.Router();

//Get

router.get("/", (req, res) => {
  actionDb
    .get()
    .then(actions => {
      res.status(200).json({ actions });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The action information could not be retrieved" });
    });
});

//Get by id
router.get("/:id", (req, res) => {
  const id = req.params.id;
  actionDb
    .get(id)
    .then(action => {
      if (action) {
        res.status(200).json(action);
      } else {
        res
          .status(404)
          .json({ error: "No action found with the specified ID." });
      }
    })
    .catch(err => {
      res
        .status(404)
        .json({ error: "The action with specified ID can not be found" });
    });
});

//Post
router.post("/", (req, res) => {
  const newAction = req.body;

  if (newAction.project_id && newAction.description && newAction.notes) {
    projectDb
      .get(newAction.project_id)
      .then(() => {
        actionDb
          .insert(newAction)
          .then(insertedAction => {
            res.status(201).json(insertedAction);
          })
          .catch(() => {
            res.status(500).json({ error: "The action could not be added." });
          });
      })
      .catch(() => {
        res
          .status(404)
          .json({ error: "There was no project found with the specified ID." });
      });
  } else {
    res.status(400).json({
      error: "Please include proper Project ID, description, and notes."
    });
  }
});

// Put

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const dataForUpdate = req.body;

  actionDb
    .update(id, dataForUpdate)
    .then(updatedAction => {
      if (updatedAction) {
        res.status(200).json(updatedAction);
      } else {
        res
          .status(404)
          .json({ error: "There was no action found with the specified ID." });
      }
    })
    .catch(() => {
      res.status(500).json({ error: "The action could not be updated." });
    });
});

//delete

router.delete("/:id", (req, res) => {
  const id = req.params.id;

  actionDb
    .remove(id)
    .then(recordsDeleted => {
      if (recordsDeleted === 1) {
        res.status(200).json(recordsDeleted);
      } else {
        res
          .status(404)
          .json({ error: "There was no action found with the specified ID." });
      }
    })
    .catch(() => {
      res.status(500).json({ error: "The action could not be deleted." });
    });
});

module.exports = router;
