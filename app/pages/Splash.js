import React, {Component} from 'react';
import {
  Dimensions,
  Image,
  InteractionManager,
  View
} from 'react-native';
import TimerMixin from 'react-timer-mixin';
import {connect} from 'react-redux';
import SplashScreen from 'react-native-splash-screen'
import UI from '../common/UI';
import ViewPages from '../components/ViewPages';
const splashImg = require('../images/splash/LaunchScreen_640_960.png');

class Splash extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    SplashScreen.hide();
    const {navigator} = this.props;
    this.timer = TimerMixin.setTimeout(() => {
      InteractionManager.runAfterInteractions(() => {
        navigator.resetTo(ViewPages.main());
      });
    }, 1000);
  }

  componentWillUnmount() {
    this.timer && TimerMixin.clearTimeout(this.timer);
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Image
          style={{flex: 1, width: UI.Size.window.width, height: UI.Size.window.height}}
          source={splashImg}
        />
      </View>
    );
  }
}

export default connect((state, props) => ({
}), dispatch => ({
}), null, {
  withRef: true
})(Splash);
