import {gql} from 'apollo-server';
export default gql `
  type Nginx {
    version : String!
  }
  type Status: {
    status: String! 
  }
  extend type Mutation {
    createNginxFile(version: String!): Status! 
  }
`