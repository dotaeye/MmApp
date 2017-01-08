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
import _ from 'lodash';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import ScrollableTabView, {DefaultTabBar} from 'react-native-scrollable-tab-view';
import Icon from 'react-native-vector-icons/Ionicons';
import NavBar from '../components/NavBar';
import UI from '../common/UI';
import OrderTab from '../components/OrderTab'
import * as orderActions from '../actions/order'
import {orderStatus} from '../common/orderStatus';

class Order extends Component {

  constructor(props) {
    super(props);
    this.state = {
      status: props.status || 0
    }
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
        text: '我的订单',
        isText: true
      }],
      Right: []
    };

    return (
      <NavBar options={nav}/>
    )
  }

  renderTabs() {

    const {order, orderActions}=this.props;
    return orderStatus.filter(x=>x.status >= 0).map((tab, index)=> {
      return (
        <OrderTab
          router={this.props.router}
          status={tab.status}
          tabLabel={tab.name}
          order={order}
          orderActions={orderActions}
          key={index}
        />
      )
    })
  }

  render() {
    const {status}=this.state;
    const initialPage = _.indexOf(orderStatus, orderStatus.find(x=>x.status == status));
    return (
      <View style={[UI.CommonStyles.container,UI.CommonStyles.columnContainer,{
        backgroundColor:UI.Colors.gray
      }]}>
        {this.renderNav()}
        <ScrollableTabView
          renderTabBar={() =>
              <DefaultTabBar
                style={[{height:30},UI.CommonStyles.bb]}
                tabStyle={{ paddingBottom: 0 }}
                textStyle={{ fontSize: 14 }}
              />
            }
          initialPage={initialPage}
          tabBarBackgroundColor={UI.Colors.white}
          tabBarUnderlineStyle={{ backgroundColor: UI.Colors.danger,
            height: 2,
            paddingHorizontal:15,
            width:UI.Size.window.width/5-30,
            marginLeft:15
          }}
          tabBarActiveTextColor={UI.Colors.danger}
          tabBarInactiveTextColor={UI.Colors.black}
        >
          {this.renderTabs()}
        </ScrollableTabView>
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
})(Order);

