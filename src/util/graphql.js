import gql from 'graphql-tag';

export const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      username
      createdAt
      body
      likeCount
      commentCount
      comments {
        id
        createdAt
        username
        body
      }
      likes {
        id
        createdAt
        username
      }
    }
  }
`;
