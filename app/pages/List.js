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
  PanResponder
} from 'react-native';

import _ from 'lodash';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import UI from '../common/UI';
import NavBar from '../components/NavBar'

class List extends Component {

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  getSearchView() {
    return (
      <TouchableOpacity style={UI.CommonStyles.search_box}>
        <View>
          <Image source={require('../images/icon/search@2x.png')} style={{width:15,height:15}}/>
          <Text>搜索</Text>
        </View>
      </TouchableOpacity>
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
      Center: [{
        isView: true,
        view: this.getSearchView()
      }],
      Right: [{
        source: require('../images/icon/shopCar@2x.png'),
        style: {
          width: 20,
          height: 20
        },
        onPress: ()=> {
          router.pop();
        }
      }]
    };

    return (
      <View style={[UI.CommonStyles.container,{backgroundColor:UI.Colors.gray}]}>
        <NavBar options={nav}/>
      </View>
    )
  }
}

export default connect((state, props) => ({}), dispatch => ({}), null, {
  withRef: true
})(List);
