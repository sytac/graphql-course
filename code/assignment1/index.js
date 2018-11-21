const { GraphQLServer } = require('graphql-yoga');

const posts = [
  {
    title: 'Post 1',
    body: 'Post body 1',
    commentIds: [1, 2, 3],
    authorId: 1,
  },
  {
    title: 'Post 2',
    body: 'Post body 2',
    commentIds: [4],
    authorId: 1,
  },
  {
    title: 'Post 3',
    body: 'Post body 3',
    commentIds: [],
    authorId: 2,
  },
  {
    title: 'Post 4',
    body: 'Post body 4',
    commentIds: [],
    authorId: 2,
  },
  {
    title: 'Post 5',
    body: 'Post body 5',
    commentIds: [],
    authorId: 1,
  },
  {
    title: 'Post 6',
    body: 'Post body 6',
    commentIds: [],
    authorId: 2,
  },
];

const comments = [
  {
    id: 1,
    nickname: 'Troll',
    message: 'First!',
  },
  {
    id: 2,
    nickname: 'Jessica',
    message: 'Wow!',
  },
  {
    id: 3,
    nickname: 'Henk',
    message: 'Amazing post!',
  },
  {
    id: 4,
    nickname: 'Donald',
    message: 'Fake news!',
  },
];

const authors = [
  {
    id: 1,
    name: 'Atkinson',
  },
  {
    id: 2,
    name: 'Martin',
  },
];

const typeDefs = `
  schema {
    query: Query
  }

  type Query {
    posts: [Post]!
  }

  type Comment {
    nickname: String!
    message: String!
  }

  type Author {
    id: ID!
    name: String!
    posts(limit: Int): [Post]!
  }

  type Post {
    author: Author!
    title: String!
    body: String!
    comments: [Comment]!
  }
`;

const resolvers = {
  Query: {
    posts: (parent) => posts,
  },
  Post: {
    author: parent => authors.find(author => author.id === parent.authorId),
    comments: parent =>
      comments.filter(comment => parent.commentIds.includes(comment.id)),
  },
  Author: {
    posts: (parent, { limit }) =>
      posts
        .filter(post => post.authorId === parent.id)
        .slice(0, limit ? limit : posts.length),
  },
};

const server = new GraphQLServer({ typeDefs, resolvers });
server.start(() => console.log('Server is running on localhost:4000'));
