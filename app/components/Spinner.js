import React, { Component } from 'react';
import {
  View,
  Text,
  ActivityIndicator
} from 'react-native';

import UI from '../common/UI';

class Spinner extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={[ UI.CommonStyles.spinner, this.props.style ]}>
        <ActivityIndicator
          size = { 'large' }
          color={ UI.Colors.black }
          {...this.props} />
        <Text style={UI.CommonStyles.spinner_text}>正在加载...</Text>
      </View>
    )
  }
}

export default Spinner;


