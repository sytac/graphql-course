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
  type Query {
    posts(authorId: ID): [Post]!
  }

  type Comment {
    nickname: String!
    message: String!
  }

  type Author {
    id: ID!
    name: String!
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
    posts: (_, { authorId }) => posts,
  },
  Post: {
    author: (parent) => authors.find(author => author.id === parent.authorId),
    comments: (parent) => comments.filter(comment => parent.commentIds.includes(comment.id))
  }
};

const server = new GraphQLServer({ typeDefs, resolvers });
server.start(() => console.log('Server is running on localhost:4000'));
