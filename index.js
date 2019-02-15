// play this: https://www.youtube.com/watch?v=d-diB65scQU

// code away!
const server = require('./server')

const port = 4000;

server.listen(port, () => {
  console.log(`\n*** Server Running on http://localhost:${port}***\n`);
}); 