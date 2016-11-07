import React, {Component} from 'react';
import {
  Dimensions,
  Image,
  InteractionManager,
  ScrollView,
  ListView,
  TouchableOpacity,
  View,
  Text,
  TextInput,
  PanResponder
} from 'react-native';

import _ from 'lodash';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import UI from '../common/UI';
import NavBar from '../components/NavBar'
import FadePanel from '../components/FadePanel';
import ViewPage from '../components/ViewPages';


class List extends Component {

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  renderSearchView() {
    return (
      <View style={UI.CommonStyles.search_box}>
        <Icon
          style={UI.CommonStyles.search_box_icon}
          name="ios-search"
          size={16}
          color={UI.Colors.grayFont}
        />
        <TextInput
          underlineColorAndroid={'transparent'}
          autoCapitalize={'none'}
          autoCorrect={false}
          placeholder="搜索"
          style={UI.CommonStyles.search_box_input}
        />
      </View>
    )
  }

  render() {
    const {router}=this.props;
    const nav = {
      Left: [{
        source: require('../images/icon/back@2x.png'),
        style: {
          width: 13,
          height: 15
        },
        onPress: ()=> {
          router.pop();
        }
      }],
      Right: [{
        source: require('../images/icon/shopCar@2x.png'),
        style: {
          width: 20,
          height: 20
        },
        onPress: ()=> {

          // router.push(ViewPage.product());
        }
      }]
    };

    return (
      <View style={[UI.CommonStyles.container,{backgroundColor:UI.Colors.gray}]}>
        <NavBar options={nav}>
          {this.renderSearchView()}
        </NavBar>
      </View>
    )
  }
}

export default connect((state, props) => ({}), dispatch => ({}), null, {
  withRef: true
})(List);
