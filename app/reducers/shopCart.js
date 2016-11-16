import * as actionTypes  from '../common/actionTypes';

const initialState = {
  loading: false,
  list: [],
  hasLoaded: false,
  refreshing: false
};

export default function shopCart(state = initialState, action = {}) {
  const {payload}=action;
  switch (action.type) {
    case actionTypes.SHOP_CART_LIST:
      return {
        ...state,
        loadMore: payload.loadMore || false,
        refreshing: payload.refreshing || false,
        pageIndex: payload.pageIndex,
        loading: true
      };
    case actionTypes.SHOP_CART_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        hasMore: action.hasMore,
        refreshing: action.refreshing,
        list: action.loadMore ? state.list.concat(action.list) : action.list,
        loadMore: false,
        hasLoaded: true
      };
    case actionTypes.SHOP_CART_LIST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      };

    case actionTypes.ADD_SHOP_CART:
      return {
        ...state,
        loading: true
      };
    case actionTypes.ADD_SHOP_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        list: state.list.push(action.shopCartItem)
      };
    case actionTypes.ADD_SHOP_CART_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      };

    case actionTypes.DELETE_SHOP_CART:
      return {
        ...state,
        loading: true
      };
    case actionTypes.DELETE_SHOP_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        list: action.list
      };

    case actionTypes.DELETE_SHOP_CART_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      };

    case actionTypes.UPDATE_SHOP_CART:
      return {
        ...state,
        loading: true
      };
    case actionTypes.UPDATE_SHOP_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        list: action.list
      };
    case actionTypes.UPDATE_SHOP_CART_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
}
