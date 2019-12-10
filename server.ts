import express from 'express';
import graphqlHTTP from 'express-graphql';
import { buildSchema, graphql } from 'graphql';
import { PathParams } from 'express-serve-static-core';
let schema = buildSchema(`
  type Query {
    ip: String
  }
`)
const loggingMiddleware: any = (req: any, res: string, next: any) => {
  console.log('ip:', req.ip);
  next();
}
let root = {
  ip: function(arg: any, request: any) {
    return request.ip
  }
}
let app = express();
app.use(loggingMiddleware);
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}))
app.listen(4000);
console.log(`Running a graphQL API server at http://localhost:4000/graphql`)