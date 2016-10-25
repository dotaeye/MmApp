import _ from 'lodash';
import { actionTypes } from '../common/constants';


export function message(text){
  let id = _.uniqueId();
  return {
    type:actionTypes.SHOW_MESSAGE,
    payload:{
      id: id,
      text
    }
  }
}