import React, {Component} from 'react';
import {
  Dimensions,
  Image,
  Animated,
  InteractionManager,
  ScrollView,
  ListView,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';

import _ from 'lodash';
import Icon from 'react-native-vector-icons/Ionicons';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import UI from '../common/UI';

class My extends Component {

  renderAvatar() {
    return (
      <Image
        style={UI.CommonStyles.avatar_back}
        source={require('../images/my/background.jpg')}
      >
        <View style={[UI.CommonStyles.container,UI.CommonStyles.rowContainer]}>
          <Image
            style={UI.CommonStyles.avatar}
            source={require('../images/my/avatar.jpg')}/>
          <View style={[UI.CommonStyles.columnContainer]}>
            <Text>用户名</Text>
            <Text>用户级别</Text>
          </View>
        </View>
      </Image>
    )
  }

  renderOrders() {

    return (
      <View style={[UI.CommonStyles.container,UI.CommonStyles.columnContainer]}>
        <View style={[UI.CommonStyles.container,UI.CommonStyles.rowContainer]}>
          <Text>我的订单</Text>
          <Icon name="ios-arrow-forward" size={20} color={UI.Colors.grayFont}/>
        </View>
        <View style={[UI.CommonStyles.container,UI.CommonStyles.rowContainer]}>
          <View style={[UI.CommonStyles.container,UI.CommonStyles.columnContainer]}>
            <Icon name="ios-card" size={20} color={UI.Colors.grayFont}/>
            <Text>待付款</Text>
          </View>
          <View style={[UI.CommonStyles.container,UI.CommonStyles.columnContainer]}>
            <Icon name="ios-archive-outline" size={20} color={UI.Colors.grayFont}/>
            <Text>待发货</Text>
          </View>
          <View style={[UI.CommonStyles.container,UI.CommonStyles.columnContainer]}>
            <Icon name="ios-send-outline" size={20} color={UI.Colors.grayFont}/>
            <Text>已发货</Text>
          </View>
        </View>
      </View>
    )
  }

  renderList(){
    return (
      <View style={[UI.CommonStyles.container,UI.CommonStyles.columnContainer]}>
        <View style={[UI.CommonStyles.container,UI.CommonStyles.rowContainer]}>
          <Icon name="ios-heart-outline" size={20} color={UI.Colors.grayFont}/>
          <Text>我的收藏</Text>
          <Icon name="ios-arrow-forward" size={20} color={UI.Colors.grayFont}/>
        </View>
        <View style={[UI.CommonStyles.container,UI.CommonStyles.rowContainer]}>
          <Icon name="ios-pin-outline" size={20} color={UI.Colors.grayFont}/>
          <Text>地址管理</Text>
          <Icon name="ios-arrow-forward" size={20} color={UI.Colors.grayFont}/>
        </View>
        <View style={[UI.CommonStyles.container,UI.CommonStyles.rowContainer]}>
          <Icon name="ios-settings-outline" size={20} color={UI.Colors.grayFont}/>
          <Text>系统设置</Text>
          <Icon name="ios-arrow-forward" size={20} color={UI.Colors.grayFont}/>
        </View>
      </View>
    )
  }

  render() {

    return (
      <View style={[UI.CommonStyles.container,UI.CommonStyles.columnContainer]}>
        {this.renderAvatar()}
        {this.renderOrders()}
        {this.renderList()}
      </View>
    )
  }
}