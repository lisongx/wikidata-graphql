import wdk from "wikidata-sdk"
import axios from "axios"


class Entity {
  constructor(rawData) {
    this.rawData = rawData
    this.id = rawData.id
  }

  label({lang}) {
    const label = this.rawData.labels[lang]
    return label && label.value;
  }
}


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
export default client
