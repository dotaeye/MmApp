import * as actionTypes  from '../common/actionTypes';
import {updateArrayItem, addArrayItem, removeArrayItem} from '../utils';

const initialState = {
  loading: false,
  list: {},
  hasMore: {},
  pageIndex: {},
  loaded: false,
  refreshing: {},
  loadMore: {},
  orderDetail: {},
  checkOrder: {},
  status: {},
  detailLoading: {}
};

export default function order(state = initialState, action = {}) {
  const {payload}=action;
  switch (action.type) {
    case 'RESET_STATE':
      return {
        ...initialState
      };
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

    case actionTypes.ORDER_STATUS:
      return {
        ...state,
        loading: true
      };
    case actionTypes.ORDER_STATUS_SUCCESS:
      return {
        ...state,
        status: action.status,
        loading: false
      };
    case actionTypes.ORDER_STATUS_FAIL:
      return {
        ...state,
        loading: false
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
        checkOrder: action.order
      };
    case actionTypes.ADD_ORDER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      };

    case actionTypes.ORDER_DETAIL:
      return {
        ...state,
        detailLoading: {
          ...state.detailLoading,
          [payload.id]: true
        }
      };
    case actionTypes.ORDER_DETAIL_SUCCESS:
      return {
        ...state,
        orderDetail: {
          ...state.orderDetail,
          [payload.id]: action.order
        },
        detailLoading: {
          ...state.detailLoading,
          [payload.id]: false
        }
      };
    case actionTypes.ORDER_DETAIL_FAIL:
      return {
        ...state,
        detailLoading: {
          ...state.detailLoading,
          [payload.id]: false
        }
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
        list: deleteOrder(state.list, action.id)
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
        list: cancelOrder(state.list, action.id)
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

function deleteOrder(list, id) {
  const keys = Object.keys(list);
  keys.forEach(key => {
    if (list[key].orders.find(x => x.id == id)) {
      list[key].orders = removeArrayItem(list[key].orders, id);
    }
  });
  return list;
}


function cancelOrder(list, id) {
  const keys = Object.keys(list);
  keys.forEach(key => {
    if (list[key].orders.find(x => x.id == id)) {
      list[key].orders.find(x => x.id == id).orderStatusId = -1;
    }
  });
  return list;
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
