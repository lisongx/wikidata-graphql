import wdk from "wikidata-sdk"
import axios from "axios"

const _JSON_FORMAT = "json"

class WikiClient {
  constructor() {
    this.format = _JSON_FORMAT
  }

  fetchItemsByIds(ids) {
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
