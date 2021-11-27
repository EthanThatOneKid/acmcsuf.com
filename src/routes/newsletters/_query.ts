const id = import.meta.env.VITE_GH_DISCUSSION_CATEGORY_ID;

export const newslettersQuery = `{
  repository(owner: "ethanthatonekid", name: "acmcsuf.com") {
    discussions(first: 100, categoryId: "${id}") {
      nodes {
        id
        bodyHTML
      }
    }
  }
}`;
