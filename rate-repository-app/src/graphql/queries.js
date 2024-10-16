import { gql } from '@apollo/client';

export const ALL_REPOSITORIES = gql`
  query Repositories {
    repositories {
      edges {
        node {
          id
          ownerAvatarUrl
          fullName
          description
          language
          stargazersCount
          forksCount
          reviewCount
          ratingAverage
        }
      }
    }
  }
`

export const ME_DATA = gql`
  query Me {
    me {
      id
      username
    }
  }
`