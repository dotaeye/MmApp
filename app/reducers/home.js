import * as actionTypes  from '../common/actionTypes';

const initialState = {
  list: []
};

export default function home(state = initialState, action = {}) {
  const {payload}=action;
  switch (action.type) {
    case actionTypes.HOME_LIST:
      return {
        ...state,
        loadMore: payload.loadMore || false,
        refreshing: payload.refreshing || false,
        pageIndex: payload.pageIndex,
        loading: true
      };
    case actionTypes.HOME_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        hasMore: action.hasMore,
        refreshing: action.refreshing,
        list: action.loadMore ? state.list.concat(action.list) : action.list,
        loadMore: false,
        listLoaded: true
      };
    case actionTypes.HOME_LIST_FAIL:
      return {
        ...state,
        refreshing: false,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
}