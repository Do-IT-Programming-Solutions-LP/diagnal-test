import {
  TOGGLE_SEARCH, GET_PAGE, SEARCH_ITEM,
} from '../constants/index';
import page1 from '../assets/data/CONTENTLISTINGPAGE-PAGE1';
import page2 from '../assets/data/CONTENTLISTINGPAGE-PAGE2';
import page3 from '../assets/data/CONTENTLISTINGPAGE-PAGE3';

const PAGES = [page1, page2, page3];

export const onGetPage = pageNumber => ({
  type: GET_PAGE,
  payload: PAGES[pageNumber].page,
});

export const onSearchItem = text => ({
  type: SEARCH_ITEM,
  payload: text,
});

export const toggleSearch = text => ({
  type: TOGGLE_SEARCH,
  payload: text,
});
