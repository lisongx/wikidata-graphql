const axios = require("axios")
const fs = require('fs')

const query = `
  SELECT ?property ?type ?propertyLabel WHERE {
      ?property a wikibase:Property.
      ?property wikibase:propertyType ?type.
      SERVICE wikibase:label {
        bd:serviceParam wikibase:language "en".
     }
  }
`

const url =
  `https://query.wikidata.org/sparql?query=${encodeURIComponent(query)}`

const resultPath = './src/config.json'

const processData = (data) => {
  const items = data['results']['bindings']
  return items.map((item) => {
    return {
      property: item.property.value.split('/')[4],
      label: item.propertyLabel.value,
      datatype: item.type.value.split('#')[1],
    }
  })
}

axios.get(`https://query.wikidata.org/sparql?query=${encodeURIComponent(query)}`)
  .then(function(response) {
    const config = {
        property: processData(response.data),
    }
    fs.writeFileSync(resultPath, JSON.stringify(config));
  });
