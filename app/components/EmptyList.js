import React, {Component} from 'react';
import {
  Text,
  View
} from 'react-native';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import UI from '../common/UI';

class EmptyList extends Component {

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    const {text = "— 没有收货地址 —"} = this.props;
    return (
      <View style={ UI.CommonStyles.emptyList }>
        <Text style={ UI.CommonStyles.emptyList_text }>
          { text }
        </Text>
      </View>
    )
  }
}

export default EmptyList;


