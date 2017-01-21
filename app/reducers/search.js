import * as actionTypes  from '../common/actionTypes';

const initialState = {
  listLoaded: false,
  entity: {},
  list: [],
  hot: []
};

export default function search(state = initialState, action = {}) {
  switch (action.type) {
    case 'RESET_STATE':
      return {
        ...initialState
      };
    case actionTypes.SEARCH_LIST:
      return {
        ...state,
        loading: true
      };

    case actionTypes.SEARCH_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        list: action.loadMore ? state.list.concat(action.list) : action.list,
        hot: action.hot,
        listLoaded: true
      };

    case actionTypes.SEARCH_LIST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      };

    default:
      return state;
  }
}