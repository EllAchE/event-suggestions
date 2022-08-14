import axios from 'axios';
import { buildSchema } from 'graphql'; // TODO: use gql library instead of axios
import { GeoPoint } from '../utils/types/common';

export default async function queryMeetup(location: GeoPoint): Promise<any> {
  const queryText = location.city; // TODO: either this query has to be repeated with different texts or a return all as to be discovered.
  // TODO: also need to handle pagination

  const data = JSON.stringify({
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
        query: queryText,
        lat: location.lat ?? 37.779998779296875,
        lon: location.long ?? -122.41999816894531,
        source: 'EVENTS',
      },
    },
  });

  const config = {
    method: 'post',
    url: 'https://www.meetup.com/gql',
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  };

  return axios(config);
}
