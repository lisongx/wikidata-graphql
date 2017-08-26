import wdk from "wikidata-sdk"
import axios from "axios"


class WikiClient {
  constructor() {
    this.format = "json"
  }

  getEntity(id) {
    return this.getItemByIds(id).then((res) => {
      return new Entity(res[id])
    })
  }

  getItemByIds(ids) {
    const url = this._genRequestUrlById(ids)
    return axios.get(url)
      .then(function(response) {
        return response.data.entities;
      });
  }

  _genRequestUrlById(ids) {
    return wdk.getEntities({
      ids: ids,
      format: this.format,
    });
  }
}

const client = new WikiClient()

class Entity {
  constructor(rawData) {
    this.rawData = rawData
    this.id = rawData.id
    this.labels = rawData.labels
    this.claims = rawData.claims
  }

  label({lang}) {
    const label = this.labels[lang]
    return label && label.value
  }

  property({id}) {
    const value = this.claims[id]
    if (value) {
      return this._processClaimItems(value)
    }
  }

  _processClaimItems(value) {
    return value.map((item) => {
      return this._processClaimItem(item)
    });
  }

  _processClaimItem(item) {
    // TODO: dealing with other types
    const mainsnak = item.mainsnak;
    return {
      mainsnak: this._processMainSnak(mainsnak)
    }
  }

  _processMainSnak(mainsnak){
    const snaktype = "text"
    switch (mainsnak.datatype) {
      case "wikibase-item":
        const itemId = mainsnak.datavalue.value.id
        return client.getEntity(itemId)
        break;
      case "time":
        // TODO: add a time type
        return mainsnak.datavalue.value.time.toString()
        break;
      case "external-id":
      case "string":
        return mainsnak.datavalue.value
      default:
        return mainsnak.datavalue.value
    }
  }
}



export default client
