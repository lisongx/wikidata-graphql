import DataLoader from "dataloader"

import wikiClient from "../api"

const itemLoader = new DataLoader(ids => {
  return Entity.getItemsByIds(ids)
})

class Entity {
  constructor(rawData) {
    this.rawData = rawData
    this.id = rawData.id
    this.labels = rawData.labels
    this.claims = rawData.claims
  }

  static getItemsByIds(ids) {
    return wikiClient.fetchItemsByIds(ids).then((res) => {
      return ids.map( id => new Entity(res[id]) )
    })
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
    switch (mainsnak.datatype) {
      case "wikibase-item":
        const itemId = mainsnak.datavalue.value.id
        return itemLoader.load(itemId)
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

export default itemLoader;
