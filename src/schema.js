import { GraphQLSchema, GraphQLObjectType, GraphQLString } from 'graphql'
import EntityType from './types/entity'

import client from "./api"

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    description: `The query root, from which multiple types of MusicBrainz
requests can be made.`,
    fields: () => ({
      entity: {
        type: EntityType,
        args: {
          id: { type: GraphQLString }
        },
        resolve: (_, {id}) => {
          return client.getEntity(id);
        },
      }
    })
  })
})
