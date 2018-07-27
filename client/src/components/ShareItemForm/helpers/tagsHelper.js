export const getAndSortTags = tags => {
  if (tags) {
    return tags
      .map(tag => {
        tag = JSON.parse(tag)
        delete tag.__typename
        return tag
      })
      .sort((a, b) => a.title > b.title)
  }
  return []
}
