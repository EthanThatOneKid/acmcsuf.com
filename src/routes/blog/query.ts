/**
 * GraphQL query to get all the blog posts from the newsletters category.
 * @see https://docs.github.com/en/graphql/overview/explorer
 */
export const newslettersQuery = `{
  repository(owner: "ethanthatonekid", name: "acmcsuf.com") {
    discussions(first: 100, categoryId: "${import.meta.env.VITE_GH_DISCUSSION_CATEGORY_ID}") {
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
