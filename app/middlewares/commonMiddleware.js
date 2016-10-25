import * as commonAction from '../actions/common';

export default function commonMiddleware({dispatch}) {
  return next => action => {
    const {error} = action;
    if (error) {
      console.log(error);
      dispatch(commonAction.message(error.message));
    }
    next(action);
  }
}
