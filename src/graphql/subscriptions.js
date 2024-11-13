/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateCelebrityImageMetdata = /* GraphQL */ `
  subscription OnCreateCelebrityImageMetdata(
    $ImageKey: String
    $Timestamp: String
    $celebrityName: String
    $confidence: Float
    $createdAt: AWSDateTime
  ) {
    onCreateCelebrityImageMetdata(
      ImageKey: $ImageKey
      Timestamp: $Timestamp
      celebrityName: $celebrityName
      confidence: $confidence
      createdAt: $createdAt
    ) {
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
export const onUpdateCelebrityImageMetdata = /* GraphQL */ `
  subscription OnUpdateCelebrityImageMetdata(
    $ImageKey: String
    $Timestamp: String
    $celebrityName: String
    $confidence: Float
    $createdAt: AWSDateTime
  ) {
    onUpdateCelebrityImageMetdata(
      ImageKey: $ImageKey
      Timestamp: $Timestamp
      celebrityName: $celebrityName
      confidence: $confidence
      createdAt: $createdAt
    ) {
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
export const onDeleteCelebrityImageMetdata = /* GraphQL */ `
  subscription OnDeleteCelebrityImageMetdata(
    $ImageKey: String
    $Timestamp: String
    $celebrityName: String
    $confidence: Float
    $createdAt: AWSDateTime
  ) {
    onDeleteCelebrityImageMetdata(
      ImageKey: $ImageKey
      Timestamp: $Timestamp
      celebrityName: $celebrityName
      confidence: $confidence
      createdAt: $createdAt
    ) {
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
