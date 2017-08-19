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
      // TODO: the type here should be more complex
      // Because of the property can have different type of value
      // for example, date of birth (P569) is should be a datetime object
      // And sometimes the property have values too:
      // for example, spouse (P26) can also have start time, end time
      // And they all can have multiple references
      type: new GraphQLList(EntityType),
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
