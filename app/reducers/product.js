import * as actionTypes  from '../common/actionTypes';

const initialState = {
  listLoaded: false,
  entity: {},
  list: [],
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
        refreshing: action.refreshing,
        list: action.loadMore ? state.list.concat(action.list) : action.list,
        loadMore: false,
        listLoaded: true
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
        loading: true
      };
    case actionTypes.PRODUCT_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        entity: action.entity,

      };
    case actionTypes.PRODUCT_DETAIL_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
}