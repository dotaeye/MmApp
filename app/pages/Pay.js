import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  PixelRatio,
  ScrollView,
  Dimensions,
  InteractionManager,
  DeviceEventEmitter
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {List} from 'antd-mobile';
import NavBar from '../components/NavBar'
import UI from '../common/UI';
import * as orderActions from '../actions/order';
import Icon from 'react-native-vector-icons/Ionicons';
import ViewPages from '../components/ViewPages'
import * as WeChat from 'react-native-wechat';
import {Toast} from 'antd-mobile';

class Pay extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    WeChat.addListener('PayReq.Resp', this.onPayCallback.bind(this))
  }

  componentWillUnmount() {
    WeChat.removeAllListeners();
  }

  onPayCallback(errCode, errStr) {
    console.log(errCode);
    console.log(errStr);
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
        text: '选择付款方式',
        isText: true
      }],
      Right: []
    };
    return (
      <NavBar options={nav}/>
    )
  }

  onWeChatPay() {
    const {checkOrder}=this.props.order;
    WeChat.isWXAppInstalled()
      .then((isInstalled) => {
        if (isInstalled) {
          const options = {
            partnerId: '1411789502',  // 商家向财付通申请的商家id
            prepayId: checkOrder.prePayId,   // 预支付订单
            nonceStr: checkOrder.nonceStr,   // 随机串，防重发
            timeStamp: checkOrder.timeSpan,  // 时间戳，防重发
            'package': 'Sign=WXPay',    // 商家根据财付通文档填写的数据和签名
            sign: checkOrder.weChatSign
          };
          WeChat.pay(options).then((result)=> {
            console.log(result);
          })
        } else {
          Toast.info('没有安装微信软件，请您安装微信之后再试');
        }
      });
  }

  render() {
    return (
      <View
        style={[UI.CommonStyles.container,UI.CommonStyles.columnContainer,{justifyContent:'flex-start',backgroundColor:UI.Colors.gray}]}>
        {this.renderNav()}
        <View
          style={[UI.CommonStyles.rowContainer,UI.CommonStyles.bb,{
            marginTop:10,
            height:45,
            alignItems:'center'
          }]}>
          <Icon name='ios-checkmark-circle' size={20} color={UI.Colors.danger} style={{marginLeft:10}}/>
          <Image source={require('../images/pay/wechat.png')} style={{width:20,height:18,marginHorizontal:10}}/>
          <Text>微信支付</Text>
        </View>
        <TouchableOpacity
          style={UI.CommonStyles.product_modal_button}
          onPress={this.onWeChatPay.bind(this)}
        >
          <Text style={UI.CommonStyles.product_modal_button_text}>确认支付</Text>
        </TouchableOpacity>
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
})(Pay);
