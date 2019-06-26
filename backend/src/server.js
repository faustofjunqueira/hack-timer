const { createServer } = require('http');

module.exports.upServer = function (application, port) {
  const server = createServer(application);
  console.log(`Server Started [port=${port}]`);
  server.listen(Number(port));
  return server;
}