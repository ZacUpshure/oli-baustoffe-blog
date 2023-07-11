import { gql } from 'graphql-request';
const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

let request;

if (typeof window !== 'undefined') {
  // Import the `request` function only on the client-side
  request = require('graphql-request').request;
}

export const getPosts = async () => {
    const query = gql`
    query MyQuery {
        postsConnection {
          edges {
            node {
              author {
                bio
                name
                id
                photo {
                  url
                }
              }
              createdAt
              slug
              title
              excerpt
              featuredImage {
                url
              }
              categories {
                name
                slug
              }
            }
          }
        }
      }
    `
    const result = await request(graphqlAPI, query);

    return result.postsConnection.edges;
}

export const getRecentPosts = async () => {
    const query = gql`
        query GetPostDetails(){
            posts(
                orderBy: createdAt_ASC
                last: 3
            ) {
                title
                featuredImage {
                    url
                }
                createdAt
                slug
            }
        }
    `

    const result = await request(graphqlAPI, query);

    return result.posts;
}

export const getRelatedPosts = async () => {
    const query = gql `
        query GetPostDetails($slug: String! $categories: [String!]) {
            posts(
                where: {
                    slug_not: $slug,
                    AND: {categories_some: {slug_in: $categories}}
                }
                last: 3
            ) {
                title
                featuredImage {
                    url
                }
                createdAt
                slug
            }
        }
    `
    const result = await request(graphqlAPI, query);

    return result.posts;
}

export const getCategories = async () => {
    const query = gql`
        query getCategories{
            categories {
                name 
                slug
            }
        }
    `
    const result = await request(graphqlAPI, query);

    return result.categories;

}