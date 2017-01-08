import * as actionTypes  from '../common/actionTypes';

const initialState = {
  rootCars: [],
  childCars: [],
  lastCars: [],
  loaded: false,
  myCars: [],
  myCarLoaded: false,
  selectName: ''
};

export default function carCate(state = initialState, action = {}) {

  switch (action.type) {
    case actionTypes.CARCATE_LIST:
      return {
        ...state
      };
    case actionTypes.CARCATE_LIST_SUCCESS:
      return {
        ...state,
        rootCars: action.rootCars,
        loaded: true
      };
    case actionTypes.CARCATE_LIST_FAIL:
      return {
        ...state
      };

    case actionTypes.CARCATE_LIST_CHILD:
      return {
        ...state
      };
    case actionTypes.CARCATE_LIST_CHILD_SUCCESS:
      return {
        ...state,
        childCars: action.childCars,
        childLoaded: true
      };
    case actionTypes.CARCATE_LIST_CHILD_FAIL:
      return {
        ...state
      };

    case actionTypes.CARCATE_LIST_LAST:
      return {
        ...state
      };
    case actionTypes.CARCATE_LIST_LAST_SUCCESS:
      return {
        ...state,
        lastCars: action.lastCars,
        lastLoaded: true
      };
    case actionTypes.CARCATE_LIST_LAST_FAIL:
      return {
        ...state
      };

    case actionTypes.SELECT_CAR:
      return {
        ...state,
        loading: true
      };
    case actionTypes.SELECT_CAR_SUCCESS:
      return {
        ...state,
        loading: false,
        myCars: state.myCars.push(action.car)
      };
    case actionTypes.SELECT_CAR_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      };

    case actionTypes.DELETE_CAR:
      return {
        ...state,
        loading: true
      };
    case actionTypes.DELETE_CAR_SUCCESS:
      return {
        ...state,
        loading: false,
        myCars: action.myCars
      };

    case actionTypes.DELETE_CAR_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      };

    case actionTypes.SET_DEFAULT_CAR:
      return {
        ...state,
        loading: true
      };
    case actionTypes.SET_DEFAULT_CAR_SUCCESS:
      return {
        ...state,
        loading: false,
        myCars: action.myCars
      };
    case actionTypes.SET_DEFAULT_CAR_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      };

    case actionTypes.GET_MY_CAR_LIST:
      return {
        ...state,
        loading: true
      };
    case actionTypes.GET_MY_CAR_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        myCars: action.myCars,
        myCarLoaded: true
      };
    case actionTypes.GET_MY_CAR_LIST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      };


    default:
      return state;
  }
}
