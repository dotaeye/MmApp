import _ from 'lodash';

export function updateArrayItem(arr, item) {
  let index = _.indexOf(arr, arr.find(x=>x.id == item.id));
  arr.splice(index, 1, item);
  return arr
}

export function removeArrayItem(arr, id) {
  let ids = [];
  if (!_.isArray(id)) {
    ids.push(id)
  } else {
    ids = id;
  }
  ids.forEach(Id=> {
    let index = _.indexOf(arr, arr.find(x=>x.id == Id));
    arr.splice(index, 1);
  });
  return arr;
}


export function addArrayItem(arr, item) {
  arr.push(item);
  return arr;
}

export function getImageUrl(url, options) {
  let result = 'http://www.lm123.cc' + url.split(',')[0];
  if (options && options.mid) {
    result = result.replace('_120', '_430');
  }
  if (options && options.max) {
    result = result.replace('_120', '_800');
  }
  return result;
}


export function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

export function getCities(list, citys) {
  const province = list.find(x=>x.label == citys[0]);
  const area = province.children.find(x=>x.label == citys[1]);
  const county = area.children.find(x=>x.label == citys[2]);
  return {
    province,
    area,
    county
  }
}