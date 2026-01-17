const initialState = {
  query: ''
}

const headerReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_SEARCH_QUERY':
      return {
        ...state,
        query: action.payload
      }
    case 'CLEAR_SEARCH_QUERY':
      return {
        ...state,
        query: ''
      }
    default:
      return state
  }
}

export default headerReducer
