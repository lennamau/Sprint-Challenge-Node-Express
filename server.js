const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const actionsRouter = require('./actions/actions-router.js');
const projectsRouter = require('./projects/projects-router')

const server = express();

// global middleware
server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));

//Routes

server.use('/api/actions', actionsRouter);
server.use('/api/projects', projectsRouter);

server.get("/", (req, res) => {
    res.send(`
        <h2>Projects and Actions API</h>
      `);
  });

module.exports = server; 