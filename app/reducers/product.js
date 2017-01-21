import * as actionTypes  from '../common/actionTypes';

const initialState = {
  loaded: false,
  list: {
    products: [],
    filteredItems: [],
    availableSortOptions: []
  },
  hasMore: true,
  pageIndex: 1,
  refreshing: false,
  vipList: {
    list: []
  },
  vipAlbumCategories: {},
  vipAlbumProduct: {},
  vipAlbumProductDetail: {}
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
        list: action.loadMore ? loadMore(state.list, action) : action.list,
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
        entity: action.product,

      };
    case actionTypes.PRODUCT_DETAIL_FAIL:
      return {
        ...state,
        error: action.error
      };

    case actionTypes.GET_VIP_PRODUCT:
      return {
        ...state,
        vipList: {
          ...state.vipList,
          loading: true,
          loadMore: payload.loadMore || false,
          refreshing: payload.refreshing || false,
          pageIndex: payload.pageIndex,
        }
      };
    case actionTypes.GET_VIP_PRODUCT_SUCCESS:
      return {
        ...state,
        vipList: {
          ...state.vipList,
          loading: false,
          hasMore: payload.hasMore,
          refreshing: false,
          list: payload.loadMore ? loadMore(state.vipList.list, payload) : payload.list,
          loadMore: false,
          loaded: true
        }
      };
    case actionTypes.GET_VIP_PRODUCT_FAIL:
      return {
        ...state,
        vipList: {
          ...state.vipList,
          loading: false,
          refreshing: false,
        }
      };

    case actionTypes.GET_VIP_PRODUCT_DETAIL:
      return {
        ...state,
        vipProductDetail: {
          ...state.vipProductDetail,
          [payload.id]: {
            loading: true
          }
        }
      };

    case actionTypes.GET_VIP_PRODUCT_DETAIL_SUCCESS:
      return {
        ...state,
        vipProductDetail: {
          ...state.vipProductDetail,
          [payload.id]: {
            loading: false,
            loaded: true,
            entity: payload.entity
          }
        }
      };

    case actionTypes.GET_VIP_PRODUCT_DETAIL_FAIL:
      return {
        ...state,
        vipProductDetail: {
          ...state.vipProductDetail,
          [payload.id]: {
            loading: false
          },
        }
      };


    case actionTypes.GET_VIP_ALBUM_CATEGORY:
      return {
        ...state,
        vipAlbumCategories: {
          loading: true
        }
      };

    case actionTypes.GET_VIP_ALBUM_CATEGORY_SUCCESS:
      return {
        ...state,
        vipAlbumCategories: {
          loading: false,
          list: payload.list,
          loaded: true
        }
      };
    case actionTypes.GET_VIP_ALBUM_CATEGORY_FAIL:
      return {
        ...state,
        vipAlbumCategories: {
          loading: false
        }
      };
    case actionTypes.GET_VIP_ALBUM_PRODUCT:
      return {
        ...state,
        vipAlbumProduct: {
          ...state.vipAlbumProduct,
          [payload.categoryId]: {
            loading: true,
            loadMore: payload.loadMore || false,
            refreshing: payload.refreshing || false,
            pageIndex: payload.pageIndex,
            list: {
              products: []
            }
          }
        }
      };
    case actionTypes.GET_VIP_ALBUM_PRODUCT_SUCCESS:
      return {
        ...state,
        vipAlbumProduct: {
          ...state.vipAlbumProduct,
          [payload.categoryId]: {
            loading: false,
            hasMore: payload.hasMore,
            refreshing: false,
            list: payload.list,
            loadMore: false,
            loaded: true
          }
        }
      };
    case actionTypes.GET_VIP_ALBUM_PRODUCT_FAIL:
      return {
        ...state,
        vipAlbumProduct: {
          ...state.vipAlbumProduct,
          [payload.categoryId]: {
            loading: false,
          }
        }
      };

    case actionTypes.GET_VIP_ALBUM_PRODUCT_DETAIL:
      return {
        ...state,
        vipAlbumProductDetail: {
          [payload.id]: {
            loading: true
          },
          ...state.vipAlbumProductDetail
        }
      };
    case actionTypes.GET_VIP_ALBUM_PRODUCT_DETAIL_SUCCESS:
      return {
        ...state,
        vipAlbumProductDetail: {
          [payload.id]: {
            loading: false,
            loaded: true,
            entity: payload.entity
          },
          ...state.vipAlbumProductDetail
        }
      };
    case actionTypes.GET_VIP_ALBUM_PRODUCT_DETAIL_FAIL:
      return {
        ...state,
        vipAlbumProductDetail: {
          [payload.id]: {
            loading: false
          },
          ...state.vipAlbumProductDetail
        }
      };
    default:
      return state;
  }
}

function loadMore(list, payload) {
  list.products = list.products.concat(payload.list.products);
  return list;
}