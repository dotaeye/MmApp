import * as actionTypes  from '../common/actionTypes';

const initialState = {
  loading: false,
  list: [],
  hasLoaded: false
};

export default function shopCart(state = initialState, action = {}) {

  switch (action.type) {
    case actionTypes.SHOP_CART_LIST:
      return {
        ...state,
        loading: true
      };
    case actionTypes.SHOP_CART_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        list: action.list,
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
