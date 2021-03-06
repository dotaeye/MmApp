import _ from 'lodash';

export function updateArrayItem(arr, item) {
  let index = _.indexOf(arr, arr.find(x => x.id == item.id));
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
  ids.forEach(Id => {
    let index = _.indexOf(arr, arr.find(x => x.id == Id));
    arr.splice(index, 1);
  });
  return arr;
}


export function addArrayItem(arr, item) {
  arr.push(item);
  return arr;
}

export function getImageUrl(url, options) {
  if (!url) return 'http://www.lm123.cc/Upload/Normal/2017/1/14/27f44d55-1744-457e-b956-52260e0431c6.jpg';
  let result = 'http://www.lm123.cc' + url.split(',')[0];
  if (options && options.mid) {
    result = result.replace('_120', '_430');
  }
  if (options && options.max) {
    result = result.replace('_120', '_800');
  }
  return result;
}


export function getImageSource(source, options) {
  let url = source;
  if (!url) url = 'http://www.lm123.cc/Upload/Normal/2017/1/14/27f44d55-1744-457e-b956-52260e0431c6.jpg';
  return getImageUrl(url, options);
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
  const province = list.find(x => x.label == citys[0]);
  const area = province.children.find(x => x.label == citys[1]);
  const county = area.children.find(x => x.label == citys[2]);
  return {
    province,
    area,
    county
  }
}

export function getShopCartCount(list) {
  let count = 0;
  list.forEach(item => {
    count += item.quantity;
  });
  return count;
}

export function isVip(user) {
  return user.user && user.user.userRoleId > 1;
}