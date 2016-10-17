import { Dimensions } from 'react-native';

const config = {
  token: 'token',
  apiRoot: 'http://192.168.0.104/dotaeye/api'
};


const window = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height
};


export default {
  config,
  window
};
