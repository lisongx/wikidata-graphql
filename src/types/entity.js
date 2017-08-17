import {
  GraphQLObjectType, GraphQLString, GraphQLList, GraphQLNonNull
} from 'graphql'

const EntityType = new GraphQLObjectType({
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
      type: new GraphQLList(EntityType),
      resolve() {
      },
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
