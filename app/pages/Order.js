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
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import ScrollableTabView, {DefaultTabBar} from 'react-native-scrollable-tab-view';
import Icon from 'react-native-vector-icons/Ionicons';
import NavBar from '../components/NavBar';
import UI from '../common/UI';
import OrderTab from '../components/OrderTab'
import * as orderActions from '../actions/order'

class Order extends Component {

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

  renderList() {

  }

  renderTabs() {
    const tabs = [{
      name: '全部',
      status: 0
    }, {
      name: '待付款',
      status: 1
    }, {
      name: '待发货',
      status: 2
    }, {
      name: '已发货',
      status: 3
    }];
    const {order, orderActions}=this.props;
    return tabs.map((tab, index)=> {
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

          tabBarBackgroundColor={UI.Colors.white}
          tabBarUnderlineStyle={{ backgroundColor: UI.Colors.danger,
          height: 2,
          paddingHorizontal:25,
          width:UI.Size.window.width/4-50,
          marginLeft:25
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

