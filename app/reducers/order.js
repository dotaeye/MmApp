import * as actionTypes  from '../common/actionTypes';
import {updateArrayItem, addArrayItem} from '../utils';

const initialState = {
  loading: false,
  list: {},
  hasMore: {},
  pageIndex: {},
  loaded: false,
  refreshing: {},
  loadMore: {},
  checkOrder:{}
};

export default function order(state = initialState, action = {}) {
  const {payload}=action;
  switch (action.type) {
    case actionTypes.ORDER_LIST:
      return {
        ...state,
        loadMore: combineProperty(state, payload, 'loadMore'),
        refreshing: combineProperty(state, payload, 'refreshing'),
        pageIndex: combineProperty(state, payload, 'pageIndex'),
        loading: true
      };
    case actionTypes.ORDER_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        list: action.loadMore ? loadMore(state, action) : combine(state, action),
        loaded: true,
        hasMore: combineProperty(state, action, 'hasMore'),
        loadMore: combineProperty(state, {loadMore: false, status: action.status}, 'loadMore'),
        refreshing: combineProperty(state, {refreshing: false, status: action.status}, 'refreshing')
      };
    case actionTypes.ORDER_LIST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      };

    case actionTypes.ADD_ORDER:
      return {
        ...state,
        loading: true
      };
    case actionTypes.ADD_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        // list: addArrayItem(state.list, action.order),
        checkOrder:action.order
      };
    case actionTypes.ADD_ORDER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case actionTypes.DELETE_ORDER:
      return {
        ...state,
        loading: true
      };
    case actionTypes.DELETE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        list: updateArrayItem(state.list, action.order)
      };
    case actionTypes.DELETE_ORDER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      };

    case actionTypes.CANCEL_ORDER:
      return {
        ...state,
        loading: true
      };
    case actionTypes.CANCEL_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        list: action.list
      };

    case actionTypes.CANCEL_ORDER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      };

    default:
      return state;
  }
}

function combineProperty(state, action, property) {
  state[property][action.status] = action[property];
  return state[property];
}

function combine(state, action) {
  state.list[action.status] = action.list;
  return state.list;
}

function loadMore(state, action) {
  if (action.list.length > 0) {
    state.list[action.status] = state.list[action.status].concat(action.list);
  }
  return state.list;
}
