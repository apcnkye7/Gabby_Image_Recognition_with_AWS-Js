/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCelebrityImageMetdata = /* GraphQL */ `
  query GetCelebrityImageMetdata($ImageKey: String!, $Timestamp: String!) {
    getCelebrityImageMetdata(ImageKey: $ImageKey, Timestamp: $Timestamp) {
      ImageKey
      Timestamp
      celebrityName
      confidence
      createdAt
      description
      name
      url
      __typename
    }
  }
`;
export const listCelebrityImageMetdata = /* GraphQL */ `
  query ListCelebrityImageMetdata(
    $filter: TableCelebrityImageMetdataFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCelebrityImageMetdata(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        ImageKey
        Timestamp
        celebrityName
        confidence
        createdAt
        description
        name
        url
        __typename
      }
      nextToken
      __typename
    }
  }
`;
