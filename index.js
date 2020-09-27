const { ApolloServer, gql } = require('apollo-server');
const typeDefs = require('./db/schema');
const resolvers = require('./db/resolvers');
const  connectDB = require('./config/db');


// Connect with DB
connectDB();

// Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => {
    const miContext = "hola";
  
    return {
      miContext
    };
  }
});


// start Server
server.listen().then( ({url}) => {
  console.log(`Server running in URL ${url}`);
});
