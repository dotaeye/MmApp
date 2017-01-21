import * as actionTypes  from '../common/actionTypes';
import {removeArrayItem, updateArrayItem, addArrayItem} from '../utils';

const initialState = {
  list: [],
  loaded: false,
  refreshing: false
};

export default function shopCart(state = initialState, action = {}) {
  const {payload}=action;
  switch (action.type) {
    case 'RESET_STATE':
      return {
        ...initialState
      };
    case actionTypes.SHOP_CART_LIST:
      return {
        ...state,
        refreshing: payload.refreshing || false
      };
    case actionTypes.SHOP_CART_LIST_SUCCESS:
      return {
        ...state,
        refreshing: false,
        list: action.list,
        loaded: true
      };
    case actionTypes.SHOP_CART_LIST_FAIL:
      return {
        ...state
      };

    case actionTypes.ADD_SHOP_CART:
      return {
        ...state
      };
    case actionTypes.ADD_SHOP_CART_SUCCESS:
      return {
        ...state,
        list: addItemToShopCart(state, action.shopCartItem)
      };
    case actionTypes.ADD_SHOP_CART_FAIL:
      return {
        ...state
      };

    case actionTypes.DELETE_SHOP_CART:
      return {
        ...state
      };
    case actionTypes.DELETE_SHOP_CART_SUCCESS:
      return {
        ...state,
        list: removeArrayItem(state.list, action.ids)
      };

    case actionTypes.DELETE_SHOP_CART_FAIL:
      return {
        ...state
      };

    case actionTypes.UPDATE_SHOP_CART:
      return {
        ...state
      };
    case actionTypes.UPDATE_SHOP_CART_SUCCESS:
      return {
        ...state,
        list: updateArrayItem(state.list, action.shopCartItem)
      };
    case actionTypes.UPDATE_SHOP_CART_FAIL:
      return {
        ...state
      };
    default:
      return state;
  }
}


function addItemToShopCart(state, item) {
  if (state.list.find(x => x.id === item.id)) {
    state.list.find(x => x.id === item.id).quantity = item.quantity;
  } else {
    state.list.push(item);
  }
  return state.list;
}