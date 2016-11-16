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
import {bindActionCreators} from 'redux';
import {List} from 'antd-mobile';
import NavBar from '../components/NavBar'
import Icon from 'react-native-vector-icons/Ionicons';
import UI from '../common/UI';
import * as orderActions from '../actions/order';

class CheckOut extends Component {


  onToolButtonClick() {

  }

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
      Center: [{
        text: '填写订单',
        isText: true
      }],
      Right: []
    };
    return (
      <NavBar options={nav}/>
    )
  }

  renderAddress() {
    return (
      <View style={[UI.CommonStyles.rowContainer,UI.CommonStyles.bt,{
          alignItems:'center',
          padding:10
      }]}>
        <View style={[UI.CommonStyles.columnContainer,
          {
            flex:1
          }]}>
          <View style={[
                UI.CommonStyles.rowContainer,

            ]}>
            <Text style={{ marginRight:10}}>收款人</Text>
            <Text>电话号码1988888</Text>
          </View>
          <Text style={{
                  marginTop:10,
                  fontSize:UI.Size.font.xs,
                  color:UI.Colors.grayFont
                }}>啊说的节快乐撒的风景卡很舒服阿斯蒂芬会感觉</Text>
        </View>
        <Icon name="ios-arrow-forward" size={20} color={UI.Colors.grayFont}/>
      </View>
    )
  }


  renderBottom() {
    return (
      <View style={[UI.CommonStyles.rowContainer,
      UI.CommonStyles.bt,
      {
        height:50,
        position:'absolute',
        bottom:0,
        left:0,
        right:0,
        alignItems:'center'
      }]}>
        <View style={{
          flex:1
        }}>
          <Text style={{
            marginLeft:10
          }}>实付:￥188.00</Text>
        </View>

        <TouchableOpacity
          style={{
            backgroundColor:UI.Colors.danger,
            height:50,
            width:80,
            alignItems:'center',
            justifyContent:'center'
          }}
          onPress={this.onToolButtonClick.bind(this)}
        >
          <Text style={{color:UI.Colors.white}}>去付款</Text>
        </TouchableOpacity>

      </View>
    )
  }

  renderListRow(item, index) {
    return (
      <View key={index} style={[UI.CommonStyles.rowContainer]}>
        <Image source={require('../images/products/product.jpg')}/>
        <View style={[UI.CommonStyles.columnContainer]}>
          <Text>{item.name}</Text>
          <Text>{item.attribute}</Text>
          <Text>{item.price}</Text>
        </View>
        <View style={[UI.CommonStyles.columnContainer]}>
          <Text>X 1</Text>
        </View>
      </View>
    )
  }

  renderPrice() {

    return (
      <View style={[UI.CommonStyles.columnContainer,UI.CommonStyles.bt,UI.CommonStyles.bb,{
        padding:15,
        marginVertical:10
      }]}>
        <View style={[UI.CommonStyles.rowContainer,
          UI.CommonStyles.bb,
          {
             justifyContent:'space-between',
             paddingBottom:15
          }]}>
          <Text>商品合计:</Text>
          <Text>￥188.00</Text>
        </View>
        <View style={[UI.CommonStyles.rowContainer,
          UI.CommonStyles.bb,
          {
             justifyContent:'space-between',
             paddingVertical:15
          }]}>
          <Text>运费:</Text>
          <Text>￥0.00</Text>
        </View>
        <View style={[UI.CommonStyles.rowContainer,

          {
             justifyContent:'space-between',
             paddingTop:15
          }]}>
          <Text>活动优惠:</Text>
          <Text>-￥0.00</Text>
        </View>
      </View>
    )
  }

  renderProduct() {
    return (
      <View style={[
          UI.CommonStyles.columnContainer,
          UI.CommonStyles.bb,
          {
            marginBottom:10
          }]}>
        <View style={[
            UI.CommonStyles.rowContainer,
            {
              padding:10
            }]}>
          <Image
            source={require('../images/products/product.jpg')}
            style={{
              width:80,
              height:80
            }}/>
          <View style={[
              UI.CommonStyles.container,
              UI.CommonStyles.columnContainer]}>
            <View style={[
                UI.CommonStyles.rowContainer,
                {
                  justifyContent:'space-between',

                }]}>
              <Text>牛皮简约短款皮包</Text>
              <Text>x1</Text>
            </View>
            <View style={[
                UI.CommonStyles.rowContainer,
                {
                  justifyContent:'space-between'

                }]}>
              <Text style={{
                fontSize:UI.Size.font.ms,
                color:UI.Colors.grayFont,
                marginTop:5
              }}>黑色</Text>
            </View>
            <View style={[
                UI.CommonStyles.rowContainer,
                {
                  justifyContent:'space-between'

                }]}>
              <Text style={{
                  fontSize:UI.Size.font.ms,
                  marginTop:5
                  }}>￥ 188.0</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }

  render() {
    const data = [];
    return (
      <View style={[UI.CommonStyles.container,
      UI.CommonStyles.columnContainer,
      {
        justifyContent:'flex-start',
        backgroundColor:UI.Colors.gray
      }]}>
        {this.renderNav()}
        {this.renderAddress()}
        {this.renderPrice()}
        {this.renderProduct()}
        {data.map((item, index)=> {
          return this.renderListRow(item, index)
        })}
        {this.renderBottom()}
      </View>
    )
  }
}


export default connect((state, props) => ({
  order: state.order
}), dispatch => ({
  orderActions: bindActionCreators(orderActions, dispatch)
}), null, {
  withRef: true
})(CheckOut);
