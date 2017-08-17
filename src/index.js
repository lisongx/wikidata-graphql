import client from "./api"
import entity from "./types/entity"
import schema from "./schema"


import { graphql, buildSchema } from 'graphql'

client.getEntity('Q42').then( (d) => {
  console.log('label', d.id, d.label({lang: 'zh'}))
})


// // Run the GraphQL query '{ hello }' and print out the response
// graphql(schema, '{ hello }', root).then((response) => {
//   console.log(response);
// });
