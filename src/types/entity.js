import {
  GraphQLObjectType, GraphQLString, GraphQLList, GraphQLNonNull,
  GraphQLInt,
  GraphQLUnionType
} from 'graphql'

import {remove as removeDiacritics } from 'diacritics'
import config from "./../../config.json"


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


let EntityType = null

const WikiDataStringType = new GraphQLObjectType({
  name: 'WikiDataString',
  description: `Just string`,
  fields: () => ({
    value: {
      type: GraphQLString,
      resolve(obj) {
        return obj
      }
    },
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
    if (typeof value == 'string') {
      return WikiDataStringType
    }
    // fallback to entity type, need more detail
    return EntityType
  }
})


const _genFieldNameByLabel = (label) => {
  // genertate property name
  // maximum frequency of audible sound =>  maximum_frequency_of_audible_sound

  // remove some diacritics as in https://www.wikidata.org/wiki/Property:P380
  let newLabel = removeDiacritics(label)

  newLabel = newLabel
    .toLowerCase()
    .replace(/[,()\/\.]/g, "")
    .replace(/[-–]/g, "_") // https://www.wikidata.org/wiki/Property:P2170
    .replace(/[']/g, "_")
    .replace(/[:]/g, "_")
    .replace(/[+]/g, "_")
    .replace(/[&]/g, "_")
    .replace(/[!]/g, "_")

  // https://www.wikidata.org/wiki/Property:P3605
  if (!isNaN(newLabel[0])) {
    newLabel = `p_${newLabel}`
  }
  return newLabel.split(' ').join('_')
}

const _generatePropertyValueType = (fieldType) => {
  return new GraphQLObjectType({
    name: `PropertyValue${fieldType.name}`,
    fields: () => ({
      mainsnak: { type: fieldType },
      // TODO: add reference, qualifiters
    }),
  })
}


const _generateNamedPropertyList = (configList) => {
  let fields = {}
  const stringPropertyType = _generatePropertyValueType(GraphQLString)
  const itemPropertyType = _generatePropertyValueType(EntityType)

  const _propertyTypeToGraphqlType = (datatype) => {
    switch (datatype) {
      case "ExternalId":
      case "String":
      case "Time":
        return stringPropertyType
        break
      // case "Quantity":
      //   break
      case "WikibaseItem":
        return itemPropertyType
        break
      default:
        return stringPropertyType
    }
  }

  configList.forEach(({property, label, datatype}) => {
    const fieldName = _genFieldNameByLabel(label)
    const fieldType = _propertyTypeToGraphqlType(datatype)
    fields[fieldName] = {
      type: new GraphQLList(fieldType),
      resolve(obj) {
        return obj.property({id: property})
      }
    }
  });

  return fields
}


EntityType = new GraphQLObjectType({
 name: 'Entity',
 description: `Wikidata entity.`,
 fields: () => Object.assign({
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
 }, _generateNamedPropertyList(config.property))
})



export default EntityType
