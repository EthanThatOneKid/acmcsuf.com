import { GH_DISCUSSION_CATEGORY_ID } from '$env/static/private';

/**
 * GraphQL query to get all the blog posts from the newsletters category.
 * @see https://docs.github.com/en/graphql/overview/explorer
 */
export const query = `{
  repository(owner: "ethanthatonekid", name: "acmcsuf.com") {
    discussions(first: 100, categoryId: "${GH_DISCUSSION_CATEGORY_ID}") {
      nodes {
        title
        url
        number
        bodyHTML
        createdAt
        lastEditedAt
        
        author {
          login
          url
          avatarUrl
        }
        
        labels(first: 100) {
          nodes {
            name
          }
        }
      }
    }
  }
}`;
