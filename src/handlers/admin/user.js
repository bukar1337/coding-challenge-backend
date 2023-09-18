// importing database
import { Selector } from '../../models/index'

// importing helpers
import { ApolloServer, gql } from 'apollo-server-lambda';

// addding definitions
const typeDefs = gql`
  type Query {
    selectors: [Selector]
    selector(id: ID!): Selector
  }

  type Mutation {
    updateSelector(id: ID!, email: String, status: String): Selector
  }

  type Selector {
    selectorID: ID!
    email: String!
    status: String!
  }
`;
// these are the resolver consider as the operation`s implementation the first two are used for select
const resolvers = {
    Query: {
        selectors: async () => {
            return await Selector.findAll();
        },
        selector: async (_, { id }) => {
            return await Selector.findByPk(id);
        },
    },
    // this is used to mutate or update
    Mutation: {
        updateSelector: async (_, { id, email, status }) => {
            const selector = await Selector.findByPk(id);
            if (!selector) {
                throw new Error("Selector not found");
            }
            if (email) {
                selector.email = email;
            }
            if (status) {
                selector.status = status;
            }
            await selector.save();
            return selector;
        },
    },
};

// initializing the apolio server
const server = new ApolloServer({
    typeDefs,
    resolvers,
});


export const handler = server.createHandler();
