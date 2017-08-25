import {
  GraphQLObjectType, GraphQLString, GraphQLList, GraphQLNonNull,
  GraphQLUnionType
} from 'graphql'

import config from "../config.json"


// TODO: add qualiter/reference
// sometimes the property have values too:
// for example, spouse (P26) can also have start time, end time qualifiter
// And they all can have multiple references
const PropertyValueType = new GraphQLObjectType({
  name: 'PropertyValue',
  description: `A peroperty's value`,
  fields: () => ({
    mainsnak: { type: WikiDataValueType },
  })
})


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
      type: new GraphQLList(PropertyValueType),
      args: {
        id: {
          name: 'id',
          type: new GraphQLNonNull(GraphQLString),
        }
      }
    }
  })
})


const WikiDataStringType = new GraphQLObjectType({
  name: 'WikiDataString',
  description: `Just string`,
  fields: () => ({
    value: { type: GraphQLString },
  }),
})

// TODO: maybe the most complex data type
// see https://www.wikidata.org/wiki/Special:ListDatatypes
// Because of the property can have different type of value
// for example, date of birth (P569) is should be a datetime object
const WikiDataValueType = new GraphQLUnionType({
  name: 'WikiDataValue',
  description: `An wikidata value type`,
  types: [ EntityType, WikiDataStringType ],
  resolveType(value) {
    if (typeof value.value == 'string') {
      return WikiDataStringType
    }
    // fallback to entity type, need more detail
    return EntityType
  }
})


export default EntityType
