import {Dimensions} from 'react-native';
import * as RouterSceneConfig from './routerScene';

const config = {
  token: 'token',
  apiRoot: 'http://192.168.0.104/dotaeye/api'
};

export default {
  config,
  RouterSceneConfig:{
    ...RouterSceneConfig
  }
};
