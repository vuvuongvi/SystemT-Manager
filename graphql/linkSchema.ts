import userSchema from './graphql';
import dockerGeneratorSchema from './graphql-docker-generator';
import {gql} from 'apollo-server';
const linkSchema =  gql `
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
`
export default [linkSchema, userSchema, dockerGeneratorSchema];