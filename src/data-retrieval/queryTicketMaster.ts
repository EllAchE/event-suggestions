require('dotenv').config();
import axios from 'axios';
import { UrlParam } from '../utils/types/common';

// https://developer.ticketmaster.com/products-and-docs/apis/discovery-api/v2/#search-events-v2
export default async function queryTicketMaster(
  params: UrlParam[],
  size: number = 20
): Promise<any> {
  let url = `https://app.ticketmaster.com/discovery/v2/events.json?size=${size}&apikey=${process.env.TICKETMASTER_API_KEY}`;
  for (const param of params) {
    url += `&${param.key}=${param.value}`;
  }

  var config = {
    method: 'get',
    url,
    headers: {},
  };

  return axios(config);
}
