/**
 * GraphQL query to get all the blog posts from the newsletters category.
 * @see https://docs.github.com/en/graphql/overview/explorer
 */
export function gql(ghDiscussionCategoryId: string) {
  return `{
    repository(owner: "ethanthatonekid", name: "acmcsuf.com") {
      discussions(first: 100, categoryId: "${ghDiscussionCategoryId}") {
        nodes {
          title
          url
          number
          bodyHTML
          bodyText
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
}
