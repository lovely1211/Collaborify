const { gql } = require("apollo-server-express");

const typeDefs = gql`
type Post {
  _id: ID!
  title: String!
  description: String!
  imageUrl: String!
  userId: ID!
  createdAt: String!
  updatedAt: String!
}

type Query {
  getPosts: [Post]
  getPost(id: ID!): Post
}

type Mutation {
  addPost(title: String!, description: String!, imageUrl: String!, userId: ID!): Post
  updatePost(id: ID!, title: String, description: String, imageUrl: String): Post
  deletePost(id: ID!): String
}
`;

module.exports = typeDefs;
