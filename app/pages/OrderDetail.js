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

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import UI from '../common/UI';
import NavBar from '../components/NavBar';
import ViewPages from '../components/ViewPages';
import moment from 'moment';
import {getImageSource} from '../utils';
import Loading from '../components/Loading';
import * as orderActions from '../actions/order';

class OrderDetail extends Component {

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    this.props.orderActions.getOrder({
      id: this.props.id
    })
  }

  renderNav() {
    const {router}=this.props;
    const nav = {
      Left: [{
        iconName: 'ios-arrow-back',
        iconSize: 20,
        iconColor: UI.Colors.black,
        onPress: () => {
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
    const {order:{orderDetail}, id}=this.props;
    const entity = orderDetail[id];

    return (
      <View style={[
        UI.CommonStyles.columnContainer,
        UI.CommonStyles.bt,
        {
          padding: 10,
          justifyContent: 'flex-start'
        }]}>
        <View style={{marginBottom: 10}}>
          <Text>下单时间: <Text>{moment(entity.createTime).format('YYYY-MM-DD HH:mm')}</Text></Text>
        </View>

        <Text>订单编号: <Text>{entity.outTradeNo}</Text></Text>

        <View style={[UI.CommonStyles.rowContainer, UI.CommonStyles.bt, {
          paddingTop: 10,
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 10
        }]}>
          <Text>实付:<Text
            style={{
              color: UI.Colors.danger
            }}>￥ {entity.orderTotal}</Text>
          </Text>
          {entity.orderStatusId == 10 && (
            <View style={[
              UI.CommonStyles.rowContainer
            ]}>
              <TouchableOpacity
                style={UI.CommonStyles.button}
                onPress={() => {
                  this.props.router.push(ViewPages.pay(), {
                    order: entity
                  })
                }}>
                <Text>付款</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    )
  }

  renderProduct() {
    const {order:{orderDetail}, id}=this.props;
    const order = orderDetail[id];
    return (
      <View style={[
        UI.CommonStyles.columnContainer,
        UI.CommonStyles.bb,
        {
          marginVertical: 10
        }]}>
        <View style={[
          UI.CommonStyles.rowContainer,
          UI.CommonStyles.bb,
          {
            padding: 10,
            justifyContent: 'space-between'

          }]}>
          <Text>商品列表</Text>
        </View>
        {order.shopCartItems.map((shopCart, index) => {
          return (
            <View key={index} style={[UI.CommonStyles.rowContainer, UI.CommonStyles.bb, {padding: 10}]}>
              <Image source={{uri: getImageSource(shopCart.imageUrl)}} style={{width: 80, height: 80}}/>
              <View style={[UI.CommonStyles.container, UI.CommonStyles.columnContainer]}>
                <Text numberOfLines={2}>{shopCart.name}</Text>
                <View style={[UI.CommonStyles.rowContainer, {justifyContent: 'space-between'}]}>
                  <Text style={{
                    fontSize: UI.Size.font.ms,
                    color: UI.Colors.grayFont,
                    marginTop: 5
                  }}>{shopCart.attributesXml}</Text>
                  <Text>x{shopCart.quantity}</Text>
                </View>
                <View style={[UI.CommonStyles.rowContainer, {justifyContent: 'space-between'}]}>
                  <Text
                    style={{
                      fontSize: UI.Size.font.ms,
                      marginTop: 5,
                      color: UI.Colors.danger
                    }}>￥ {shopCart.price}</Text>
                </View>
              </View>
            </View>
          );
        })}
      </View>
    )
  }

  renderAddress() {
    const {order:{orderDetail}, id}=this.props;
    const order = orderDetail[id];
    return (
      <View style={[UI.CommonStyles.columnContainer]}>
        <View style={[
          UI.CommonStyles.rowContainer,
          UI.CommonStyles.bb,
          {
            padding: 10,
            justifyContent: 'space-between'

          }]}>
          <Text>收货信息</Text>
        </View>
        <View style={[UI.CommonStyles.rowContainer, {padding: 10}]}>
          <Text style={{marginRight: 10}}>{order.addressDTO.name}</Text>
          <Text>{order.addressDTO.phoneNumber}</Text>
        </View>
        <Text style={{paddingHorizontal: 10, marginBottom: 10}}>{order.addressDTO.detail}</Text>
        <View style={[UI.CommonStyles.rowContainer, UI.CommonStyles.bt, {justifyContent: 'flex-start', padding: 10}]}>
          <Text>实付:<Text style={{color: UI.Colors.danger}}>￥ {order.orderTotal}</Text></Text>
        </View>
      </View>
    )
  }

  render() {
    const {order:{orderDetail}, id}=this.props;
    return (
      <View style={[
        UI.CommonStyles.container,
        UI.CommonStyles.columnContainer,
        {
          justifyContent: 'flex-start',
          backgroundColor: UI.Colors.gray
        }]}>
        {this.renderNav()}
        {!orderDetail[id] ? (<Loading/>)
          : (<ScrollView style={{flex: 1}}>
          {this.renderDetail()}
          {this.renderProduct()}
          {this.renderAddress()}
        </ScrollView>)}
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
