import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import UI from '../common/UI';

class EndTag extends Component {

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    const { text = "— 没有更多了 —" } = this.props;
    return (
      <View style={ UI.CommonStyles.endTag }>
        <Text style={ UI.CommonStyles.endTag_text }>
          { text }
        </Text>
      </View>
    )
  }
}

export default EndTag;


