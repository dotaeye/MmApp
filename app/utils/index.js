import _ from 'lodash';

export function updateArrayItem(arr, item) {
  let index = _.indexOf(arr, arr.find(x=>x.id == item.id));
  return arr.splice(index, 1, item);
}

export function getImageUrl(url) {
  return 'http://www.lm123.cc' + url.split(',')[0];
}