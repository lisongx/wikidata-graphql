import {
  GraphQLObjectType, GraphQLString, GraphQLList, GraphQLNonNull
} from 'graphql'

let EntityType = new GraphQLObjectType({
  name: 'Entity',
  description: `Wikidata entity.`,
  fields: () => ({
    id: {
      type: GraphQLString
    },
    label: {
      type: GraphQLString,
      args: {
        lang: {
          name: 'lang',
          type: new GraphQLNonNull(GraphQLString),
        }
      }
    },
    property: {
      type: EntityType,
      args: {
        id: {
          name: 'id',
          type: new GraphQLNonNull(GraphQLString),
        }
      }
    }
  })
})

export default EntityType
