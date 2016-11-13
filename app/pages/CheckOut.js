import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  PixelRatio,
  ScrollView,
  Dimensions
} from 'react-native';
import {connect} from 'react-redux';
import {List} from 'antd-mobile';
import Icon from 'react-native-vector-icons/Ionicons';
import UI from '../common/UI';

class CheckOut extends Component {

  renderNav() {
    const {router}=this.props;
    const nav = {
      Left: [{
        iconName: 'ios-arrow-back',
        iconSize: 20,
        iconColor: UI.Colors.black,
        onPress: ()=> {
          router.pop();
        }
      }],
      Center: {
        text: '填写订单',
        isText: true
      },
      Right: []
    };
    return (
      <NavBar options={nav}/>
    )
  }

  renderAddress() {
    return (
      <View style={[UI.CommonStyles.container,UI.CommonStyles.rowContainer]}>
        <View style={[UI.CommonStyles.container,UI.CommonStyles.columnContainer]}>
          <View style={[UI.CommonStyles.container,UI.CommonStyles.rowContainer]}>
            <Text>收货人</Text>
            <Text>1838293929</Text>
          </View>
          <Text>啊速度加快哈发健康金卡舒服撒放假卡萨好烦</Text>
        </View>
        <Icon name="ios-arrow-forward" size={20} color={UI.Colors.grayFont}/>
      </View>
    )
  }


  renderBottom() {
    return (
      <View style={[UI.CommonStyles.container,UI.CommonStyles.rowContainer]}>
        <View style={[UI.CommonStyles.container,UI.CommonStyles.rowContainer]}>
          <Text>实付:￥ 188.00</Text>
        </View>
        <View style={[UI.CommonStyles.container,UI.CommonStyles.rowContainer]}>
          <TouchableOpacity
            onPress={this.onToolButtonClick.bind(this)}
          >
            <Text>去付款</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  renderListRow(item, index) {
    return (
      <View key={index} style={[UI.CommonStyles.container,UI.CommonStyles.rowContainer]}>
        <Image source={require('../images/products/product.jpg')}/>
        <View style={[UI.CommonStyles.container,UI.CommonStyles.columnContainer]}>
          <Text>{item.name}</Text>
          <Text>{item.attribute}</Text>
          <Text>{item.price}</Text>
        </View>
        <View style={[UI.CommonStyles.container,UI.CommonStyles.columnContainer]}>
          <Text>X 1</Text>
        </View>
      </View>
    )
  }


  render() {
    const data = [];
    return (
      <View style={[UI.CommonStyles.container,UI.CommonStyles.columnContainer]}>
        {this.renderNav()}
        {this.renderBottom()}
        {this.renderAddress()}
        <List>
          <List.Item extra="188.33">商品合计:</List.Item>
          <List.Item extra="188.33">运费:</List.Item>
          <List.Item extra="188.33">活动优惠:</List.Item>
        </List>
        {data.map((item, index)=> {
          return this.renderListRow(item, index)
        })}
      </View>
    )
  }
}

