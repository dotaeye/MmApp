import React, {Component, PropTypes} from 'react';
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
  DeviceEventEmitter,
  Alert
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


const propTypes = {
  popNumber: PropTypes.number
};

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
    if (errCode && errStr) {
      Alert.alert(
        '支付失败!',
        errStr,
        [
          {
            text: '确定', onPress: () => {
          }
          }
        ]
      )
    } else {
      const {order, router, user}=this.props;
      if (user && user.user.userRoleId < 2 && order.orderTotal >= 500) {
        Alert.alert(
          '支付成功!',
          '你当前单笔购买超500元自动升级为VIP会员，重新登陆即可享受会员权益！',
          [
            {
              text: '确定', onPress: () => {
              router.replace(ViewPages.login());
            }
            }
          ]
        )
      } else {
        router.replace(ViewPages.order());
      }
    }
  }

  renderNav() {
    const {router, popNumber}=this.props;
    const nav = {
      Left: [{
        iconName: 'ios-arrow-back',
        iconSize: 20,
        iconColor: UI.Colors.black,
        onPress: () => {
          Alert.alert(
            '确认要放弃付款?',
            '订单会保留一段时间,请尽快支付',
            [
              {
                text: '继续支付', onPress: () => {
              }
              },
              {
                text: '确认离开', onPress: () => {
                router.popN(popNumber);
              }
              }
            ]
          )
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
    const {order}=this.props;
    WeChat.isWXAppInstalled()
      .then((isInstalled) => {
        if (isInstalled) {
          const options = {
            partnerId: '1411789502',  // 商家向财付通申请的商家id
            prepayId: order.prePayId,   // 预支付订单
            nonceStr: order.nonceStr,   // 随机串，防重发
            timeStamp: order.timeSpan,  // 时间戳，防重发
            'package': 'Sign=WXPay',    // 商家根据财付通文档填写的数据和签名
            sign: order.weChatSign
          };
          WeChat.pay(options).then((result) => {
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
        style={[UI.CommonStyles.container, UI.CommonStyles.columnContainer, {
          justifyContent: 'flex-start',
          backgroundColor: UI.Colors.gray
        }]}>
        {this.renderNav()}
        <View
          style={[UI.CommonStyles.rowContainer, UI.CommonStyles.bb, {
            marginTop: 10,
            height: 45,
            alignItems: 'center'
          }]}>
          <Icon name='ios-checkmark-circle' size={20} color={UI.Colors.danger} style={{marginLeft: 10}}/>
          <Image source={require('../images/pay/wechat.png')} style={{width: 20, height: 18, marginHorizontal: 10}}/>
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

Pay.propTypes = propTypes;

Pay.defaultProps = {
  popNumber: 1
};

export default connect((state, props) => ({
  user: state.user
}), dispatch => ({
  orderActions: bindActionCreators(orderActions, dispatch)
}), null, {
  withRef: true
})(Pay);
