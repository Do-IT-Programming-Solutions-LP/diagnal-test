import {
  TOGGLE_SEARCH, GET_PAGE, SEARCH_ITEM,
} from '../constants';

const initialState = {
  listing: [],
  searchResults: [],
  title: '',
  searchEnabled: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PAGE:
      return { ...state, listing: [...state.listing, ...action.payload['content-items'].content], title: action.payload.title };
    case SEARCH_ITEM: {
      const searchResults = state.listing.filter(item => item.name.includes(action.payload));
      return { ...state, searchResults };
    }
    case TOGGLE_SEARCH:
      return { ...state, searchEnabled: !state.searchEnabled, searchResults: state.listing };
    default:
      return state;
  }
};
