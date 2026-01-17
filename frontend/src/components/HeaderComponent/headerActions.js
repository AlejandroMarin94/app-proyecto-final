export const setSearchQuery = (query) => {
  return {
    type: 'SET_SEARCH_QUERY',
    payload: query
  }
}

export const clearSearchQuery = () => ({
  type: 'CLEAR_SEARCH_QUERY'
})
