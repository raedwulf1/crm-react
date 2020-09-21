const { ApolloServer, gql } = require('apollo-server');




// Server

const server = new ApolloServer();




// start Server
server.listen.then( ({url}) => {
  console.log(`Server running in URL ${url}`);
});
