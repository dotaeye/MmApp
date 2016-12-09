import * as actionTypes  from '../common/actionTypes';

export function getStorageList(payload) {
  return {
    type: actionTypes.STORAGE_LIST,
    payload
  };
}