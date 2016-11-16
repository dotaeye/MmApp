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
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import UI from '../common/UI';
import NavBar from '../components/NavBar'
import ViewPages from '../components/ViewPages'
import * as orderActions from '../actions/order'

class OrderDetail extends Component {

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  componentDidMount() {

  }

  fetchData() {
    this.props.cityActions.getCities({})
  }

  onSave() {

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
        text: '订单详情',
        isText: true
      }],
      Right: []
    };

    return (
      <NavBar options={nav}/>
    )
  }

  renderDetail() {
    return (
      <View style={[
      UI.CommonStyles.columnContainer,
      UI.CommonStyles.bt,
      {
        padding:10,
        justifyContent:'flex-start'
      }]}>
        <Text>下单时间: <Text>2015-11-12 15:49</Text></Text>
        <Text>订单编号: <Text>3707570</Text></Text>
        <Text>付款剩余时间: <Text>60分钟</Text></Text>
        <View style={[
        UI.CommonStyles.rowContainer,
        UI.CommonStyles.bt,
        {
          paddingTop:10,
          justifyContent:'space-between',
          alignItems:'center',
          marginTop:10
        }]}>

          <Text>实付:<Text
            style={{
              color:UI.Colors.danger
            }}>￥ 188.0</Text>
          </Text>

          <View style={[
            UI.CommonStyles.rowContainer
            ]}>
            <TouchableOpacity style={[UI.CommonStyles.button,{marginRight:10}]}>
              <Text>取消订单</Text>
            </TouchableOpacity>
            <TouchableOpacity style={UI.CommonStyles.button}>
              <Text>付款</Text>
            </TouchableOpacity>
          </View>
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
            marginVertical:10
          }]}>
        <View style={[
            UI.CommonStyles.rowContainer,
            UI.CommonStyles.bb,
            {
              padding:10,
              justifyContent:'space-between'

            }]}>
          <Text>包裹1</Text>
        </View>
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

  renderAddress() {
    return (
      <View style={[
              UI.CommonStyles.columnContainer]}>
        <View style={[
                UI.CommonStyles.rowContainer,
                {
                  padding:10
                }
            ]}>
          <Text style={{ marginRight:10}}>收款人</Text>
          <Text>电话号码1988888</Text>
        </View>
        <Text style={{
                  paddingHorizontal:10,
                  marginBottom:10
                }}>啊说的节快乐撒的风景卡很舒服阿斯蒂芬会感觉</Text>

        <View style={[
              UI.CommonStyles.columnContainer,
              UI.CommonStyles.bt,
              {
                padding:10
              }]}>
          <View style={[
                UI.CommonStyles.rowContainer
            ]}>
            <Text>支付方式:</Text>
            <Text>啊是否健康</Text>
          </View>
          <View style={[
                UI.CommonStyles.rowContainer
            ]}>
            <Text>支付方式:</Text>
            <Text>啊是否健康</Text>
          </View>
          <View style={[
                UI.CommonStyles.rowContainer
            ]}>
            <Text>支付方式:</Text>
            <Text>啊是否健康</Text>
          </View>
        </View>

        <View style={[
        UI.CommonStyles.rowContainer,
        UI.CommonStyles.bt,
        {
          justifyContent:'flex-start',
          padding:10
        }]}>

          <Text>实付:<Text
            style={{
              color:UI.Colors.danger
            }}>￥ 188.0</Text>
          </Text>
        </View>
      </View>
    )
  }

  render() {
    return (
      <View style={[
      UI.CommonStyles.container,
      UI.CommonStyles.columnContainer,
      {
        justifyContent:'flex-start',
        backgroundColor:UI.Colors.gray
      }]}>
        {this.renderNav()}
        {this.renderDetail()}
        {this.renderProduct()}
        {this.renderAddress()}
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
})(OrderDetail);
