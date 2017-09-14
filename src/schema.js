import { GraphQLSchema, GraphQLObjectType, GraphQLString } from 'graphql'

import EntityType from './types/entity'
import itemLoader from './dataloader'

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    description: `The query root, from which multiple types of Wikidata
requests can be made.`,
    fields: () => ({
      entity: {
        type: EntityType,
        args: {
          id: { type: GraphQLString }
        },
        resolve: (_, {id}) => {
          return itemLoader.load(id);
        },
      }
    })
  })
})
