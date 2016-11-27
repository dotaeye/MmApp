import * as actionTypes  from '../common/actionTypes';

const initialState = {
  loaded: false,
  entity: {},
  list: {
    products: [],
    filteredItems: [],
    availableSortOptions: []
  },
  hasMore: true,
  pageIndex: 1,
  refreshing: false
};

export default function product(state = initialState, action = {}) {
  const {payload}=action;
  switch (action.type) {
    case actionTypes.SEARCH_PRODUCT:
      return {
        ...state,
        loadMore: payload.loadMore || false,
        refreshing: payload.refreshing || false,
        pageIndex: payload.pageIndex,
        loading: true
      };
    case actionTypes.SEARCH_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        hasMore: action.hasMore,
        refreshing: false,
        list: action.loadMore ? loadMore(state, action) : action.list,
        loadMore: false,
        loaded: true
      };
    case actionTypes.SEARCH_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        refreshing: false,
        error: action.error
      };
    case actionTypes.PRODUCT_DETAIL:
      return {
        ...state,
      };
    case actionTypes.PRODUCT_DETAIL_SUCCESS:
      return {
        ...state,
        entity: action.entity

      };
    case actionTypes.PRODUCT_DETAIL_FAIL:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
}

function loadMore(state, action) {
  state.list.products = state.list.products.concat(action.list.products);
  return state.list;
}