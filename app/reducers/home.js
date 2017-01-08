import * as actionTypes  from '../common/actionTypes';

const initialState = {
  list: {
    banners: [],
    hotCategories: [],
    hotManufacturers: [],
    orders: {}
  },
  loaded: false
};

export default function home(state = initialState, action = {}) {
  const {payload}=action;
  switch (action.type) {
    case actionTypes.HOME_LIST:
      return {
        ...state,
        loadMore: payload.loadMore || false,
        refreshing: payload.refreshing || false,
        pageIndex: payload.pageIndex
      };
    case actionTypes.HOME_LIST_SUCCESS:
      return {
        ...state,
        hasMore: action.hasMore,
        refreshing: false,
        list: action.loadMore ? state.list.concat(action.list) : action.list,
        loadMore: false,
        loaded: true
      };
    case actionTypes.HOME_LIST_FAIL:
      return {
        ...state,
        refreshing: false,
        error: action.error
      };
    default:
      return state;
  }
}