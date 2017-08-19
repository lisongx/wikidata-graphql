import client from "./api"
import entity from "./types/entity"
import schema from "./schema"


import { graphql, buildSchema } from 'graphql'

const query = `
{
  entity(id: "Q42") {
    id
    label(lang: "en")
    property(id: "P31") {
        id
        label(lang: "en")
    }
  }
}
`

graphql(schema, query).then((response) => {
  console.log(response.data);
});
