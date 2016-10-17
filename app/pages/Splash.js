import React, {Component} from 'react';
import {
  Dimensions,
  Image,
  InteractionManager,
  View
} from 'react-native';
import {window} from '../common/constants';
import MainContainer from '../containers/MainContainer';

const {height, width} = window;
const splashImg = require('../images/splash.png');

class Splash extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {navigator} = this.props;
    this.timer = setTimeout(() => {
      InteractionManager.runAfterInteractions(() => {
        navigator.resetTo({
          component: MainContainer,
          name: 'Main'
        });
      });
    }, 1000);
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Image
          style={{flex: 1, width: width, height: height}}
          source={splashImg}
        />
      </View>
    );
  }
}

export default Splash;