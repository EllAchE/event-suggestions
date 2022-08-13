require('dotenv').config();
const serpapi = require('google-search-results-nodejs');
import axios from 'axios';
import { Param } from '../utils/types';

// Show result as JSON

export function querySerpApi(
  googleQuery: string,
  callback: (response: any) => void
): void {
  const search = new serpapi.GoogleSearch();

  const params = {
    q: googleQuery,
    google_domain: 'google.com',
    gl: 'us',
    hl: 'en',
    api_key: 'ae432bb4eade9985f9af2cd8d94a411516a216b598a697992b4f9bbe150c832f', // TODO: This should be an env var
  };

  search.json(params, callback);
}

export function queryMeetup(
  query: string,
  lat: number,
  long: number,
  source = 'EVENTS'
): Promise<any> {
  // TODO: get more fields, i.e. datetime, venue etc. and variably retrieve each
  var data = JSON.stringify({
    query: `query($kw: SearchConnectionFilter!) {
        keywordSearch(filter: $kw) {
          pageInfo {
            hasNextPage
            hasPreviousPage
            startCursor
            endCursor
          }
          count
          edges {
            cursor
            node {
              id
              result {
                ... on Event {
                  id
                  token
                  title
                  eventUrl
                  description
                  shortDescription
                  host {
                      name
                      username
                      city
                      country
                      bio
                  }
                  howToFindUs
                  group {
                      logo {
                        baseUrl
                        preview
                        }
                      isPrivate
                      latitude
                      longitude
                      #topics
                      description
                      name
                      city
                      state
                      country
                      link
                      groupPhoto {
                      baseUrl
                      preview
                  }
                  }
                  venue {
                      name
                      address
                      city
                      state
                      postalCode
                      lat
                      lng
                      country
                  }
                  images {
                      baseUrl
                      preview
                  }
                  onlineVenue {
                      url
                  }
                  status
                  timeStatus
                  dateTime
                  duration
                  timezone
                  endTime
                  createdAt
                  priceTier
                  fees {
                      processingFee {
                          type
                          amount
                      }
                      serviceFee {
                          type
                          amount
                      }
                      tax {
                          type
                          amount
                      }
                  }
                  taxType
                  donation {
                      title
                      orgName
                      url
                  }
                  maxTickets
                  waitlistMode
                  going
                  waiting
                  eventType
                  isOnline
                  isNetworkEvent
                  image {
                      baseUrl
                  }
                  shortUrl
                  hosts {
                      name
                      username
                      city
                      country
                      bio
                  }
                  topics {
                      edges {
                          cursor
                          node {
                              name
                              urlkey
                          }
                      }
                      count
                  }
                  zoomMeetingId
                }
              }
            }
          }
        }
      }`,
    variables: {
      kw: {
        query: query,
        lat: lat,
        lon: long,
        source: source,
      },
    },
  });

  var config = {
    method: 'post',
    url: 'https://www.meetup.com/gql',
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  };

  return axios(config);
}

export async function queryTicketMaster(
  params: Param[],
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

export function queryPredictHq() {}
