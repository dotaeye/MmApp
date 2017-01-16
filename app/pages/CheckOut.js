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
import Icon from 'react-native-vector-icons/Ionicons';
import UI from '../common/UI';
import Loading from '../components/Loading';
import {getImageUrl} from '../utils';
import * as orderActions from '../actions/order';
import * as addressActions from '../actions/address';
import ViewPages from '../components/ViewPages'

class CheckOut extends Component {


  constructor(props) {
    super(props);
    this.state = {
      addressId: null
    }
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.fetchData();
    });
    DeviceEventEmitter.addListener('pickerAddress', (addressId) => {
      InteractionManager.runAfterInteractions(() => {
        this.setState({
          addressId
        });
      });
    });
  }

  fetchData() {
    const {addressActions}=this.props;
    addressActions.getAddressList({})
  }

  onToolButtonClick() {
    const {orderActions, address}=this.props;
    const {addressId}=this.state;
    let defaultAddress;
    if (addressId) {
      defaultAddress = address.list.find(x=>x.id == addressId);
    } else {
      defaultAddress = address.list.find(x=>x.default);
      // defaultAddress = address.list[0];
    }
    orderActions.addOrder({
      data: {
        shopCartIds: this.props.ids,
        addressId: defaultAddress.id
      },
      success: this.onCheckOutSuccess.bind(this)
    });
  }


  onCheckOutSuccess() {
    const {order, router}=this.props;
    const currentOrder = order.checkOrder;
    router.push(ViewPages.pay(), {
      order: currentOrder,
      popNumber: 2
    });
  }


  getPrice() {
    const {ids, shopCart}=this.props;
    const items = shopCart.list.filter(x=>ids.includes(x.id));
    let price = 0;
    items.forEach(item=> {
      price += item.price;
    });
    return price;
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
    const {address}=this.props;
    const {addressId}=this.state;
    let defaultAddress;
    if (addressId) {
      defaultAddress = address.list.find(x=>x.id == addressId);
    } else {
      defaultAddress = address.list.find(x=>x.default);
      // defaultAddress = address.list[0];
    }
    return (
      <TouchableOpacity
        onPress={()=>{this.props.router.push(ViewPages.pickerAddress())}}
        style={[UI.CommonStyles.rowContainer,UI.CommonStyles.bt,{ alignItems:'center', padding:10}]}>
        <View style={[UI.CommonStyles.columnContainer,{flex:1}]}>
          <View style={[UI.CommonStyles.rowContainer]}>
            <Text style={{ marginRight:10}}>收款人</Text>
            <Text>{defaultAddress.name} {defaultAddress.phoneNumber}</Text>
          </View>
          <Text style={{marginTop:10,fontSize:UI.Size.font.xs, color:UI.Colors.grayFont}}>
            {`${defaultAddress.province}${defaultAddress.area}${defaultAddress.county}${defaultAddress.detail}`}
          </Text>
        </View>
        <Icon name="ios-arrow-forward" size={20} color={UI.Colors.grayFont}/>
      </TouchableOpacity>
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
          }}>实付:￥ {this.getPrice()}</Text>
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
          <Text>￥ {this.getPrice()}</Text>
        </View>
        <View style={[UI.CommonStyles.rowContainer,
          UI.CommonStyles.bb,
          {
             justifyContent:'space-between',
             paddingVertical:15
          }]}>
          <Text>运费:</Text>
          <Text>￥ 0.00</Text>
        </View>
        <View style={[UI.CommonStyles.rowContainer,

          {
             justifyContent:'space-between',
             paddingTop:15
          }]}>
          <Text>活动优惠:</Text>
          <Text>-￥ 0.00</Text>
        </View>
      </View>
    )
  }

  renderProduct() {
    const {shopCart, ids}=this.props;
    const items = shopCart.list.filter(x=>ids.includes(x.id));
    return (
      <View style={[
          UI.CommonStyles.bb,
          {
            flexDirection: 'column',
            justifyContent: 'center',
            marginBottom:50
          }]}>
        {items.map((item, index)=> {
          return (
            <View
              key={index}
              style={[UI.CommonStyles.rowContainer,{padding:10,marginBottom:10}]}>
              <Image
                source={{uri:getImageUrl(item.imageUrl)}}
                style={{
                  width:80,
                  height:80
                }}/>
              <View style={[
                UI.CommonStyles.container,
                UI.CommonStyles.columnContainer]}>
                <Text numberOfLines={2}>{item.name} </Text>
                <Text style={{
                  fontSize: UI.Size.font.ms,
                  color: UI.Colors.grayFont,
                  marginTop: 5
                }}>{item.attributesXml} 共{item.quantity}个商品</Text>
                <View style={[
                UI.CommonStyles.rowContainer,
                {
                  justifyContent:'space-between'

                }]}>
                  <Text style={{
                  fontSize:UI.Size.font.ms,
                  marginTop:5
                  }}>￥ {item.price}</Text>
                </View>
              </View>
            </View>
          )
        })}
      </View>
    )
  }

  render() {
    const {address}=this.props;
    return (
      <View
        style={[UI.CommonStyles.container,UI.CommonStyles.columnContainer,{justifyContent:'flex-start',backgroundColor:UI.Colors.gray}]}>
        {this.renderNav()}
        {address.loaded ? (
          <ScrollView style={{flex:1}}>
            {this.renderAddress()}
            {this.renderPrice()}
            {this.renderProduct()}
            {this.renderBottom()}
          </ScrollView>
        ) : <Loading/>}
      </View>
    )
  }
}


export default connect((state, props) => ({
  order: state.order,
  shopCart: state.shopCart,
  address: state.address
}), dispatch => ({
  orderActions: bindActionCreators(orderActions, dispatch),
  addressActions: bindActionCreators(addressActions, dispatch)
}), null, {
  withRef: true
})(CheckOut);
