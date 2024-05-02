import { ELASTIC_API_KEY } from "$env/static/private";
const ElasticEmail  = require('@elasticemail/elasticemail-client')
const defaultClient = ElasticEmail.ApiClient.instance

const apikey = defaultClient.authentications['apikey']
apikey.apikey = ELASTIC_API_KEY


const api = new ElasticEmail.CampainsAPI()