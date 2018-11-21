const { GraphQLServer } = require('graphql-yoga');

const flights = [
  {
    number: 'KL0001',
    destinationId: 1,
    originId: 4,
    airplaneId: 1,
    departure: '2012-07-14T01:00:00Z',
    arrival: '2012-07-14T09:00:00Z'
  },
  {
    number: 'KL0002',
    destinationId: 4,
    originId: 3,
    airplaneId: 1,
    departure: '2012-07-14T12:00:00Z',
    arrival: '2012-07-14T14:00:00Z'
  },
  {
    number: 'KL0003',
    destinationId: 1,
    originId: 3,
    airplaneId: 1,
    departure: '2012-07-14T23:00:00Z',
    arrival: '2012-07-15T09:00:00Z'
  },
];

const airplanes = [
    {
        id: 1,
        name: 'Boeing 737-200',
    },
    {
        id: 2,
        name: 'Airbus A320-200'
    },
    {
        id: 3,
        name: 'Boeing 777'
    },
    {
        id: 4,
        name: 'Boeing 787 Dreamliner'
    },
    {
        id: 5,
        name: 'Airbus A380-800'
    }
];

const airports = [
    {
        id: 1,
        name: 'AMS',
    },
    {
        id: 2,
        name: 'NRT',
    },
    {
        id: 3,
        name: 'JFK',
    },
    {
        id: 4,
        name: 'LHR'
    }
];


const typeDefs = `
    type Query {
        hello: String!
    }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello'
  },
};

const server = new GraphQLServer({ typeDefs, resolvers });
server.start(() => console.log('Server is running on localhost:4000'));
