const axios = require("axios")

const query = `
  SELECT ?property ?datatype ?propertyLabel WHERE {
      ?property a wikibase:Property .
      ?property wikibase:propertyType ?datatype .
      SERVICE wikibase:label {
        bd:serviceParam wikibase:language "en" .
     }
  }
`

const url =
  `https://query.wikidata.org/sparql?query=${encodeURIComponent(query)}`


axios.get(`https://query.wikidata.org/sparql?query=${encodeURIComponent(query)}`)
  .then(function(response) {
    console.log(JSON.stringify(response.data, null, 4))
  });
