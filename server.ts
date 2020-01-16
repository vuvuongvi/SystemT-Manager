import cors from 'cors';
import express from 'express';
import './connection/mongo';
import jwt from 'jsonwebtoken';
const {ApolloServer, AuthenticationError} = require('apollo-server-express')
import schemas from './graphql/linkSchema';
import resolvers from './graphql/resolvers/resolvers';

import userModel from './graphql/graphql';


const app: any = express();
app.use(cors())
const getUser = async (req: any) => {
  const token = req.headers['token'];
  if (token) {
    try {
      return jwt.verify(token, 'riddlemethis');
    } catch (error) {
      throw new AuthenticationError('Your session expired. Sign in again.');
    }
  }
}
const server = new ApolloServer({
  typeDefs: schemas,
  resolvers,
  context: async ({ req }: any) => {
    if (req) {
      const me = await getUser(req);
      return {
        me,
        models: {
          userModel,
        }
      }
    }
  }
})
server.applyMiddleware({ app, path: '/graphql' })
// Start the server
app.listen(3000, () => {
  console.log('Go to http://localhost:3000/graphql to run queries!');
});