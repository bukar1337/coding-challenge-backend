import { ApolloServer, gql } from 'apollo-server-lambda';
import { Op } from 'sequelize';
import Model from '../../models/Result.model';

const typeDefs = gql`
  type Query {
    resultCount(startDate: String!, endDate: String!): Int!
  }
`;

const resolvers = {
  Query: {
    resultCount: async (_, { startDate, endDate }) => {
      const count = await Model.count({
        where: {
          createdAt: {
            [Op.between]: [startDate, endDate],
          },
        },
      });
      return count;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

export const handler = server.createHandler();
