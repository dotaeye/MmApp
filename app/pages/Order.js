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
import ScrollableTabView, {DefaultTabBar} from 'react-native-scrollable-tab-view';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from '../components/Button';
import UI from '../common/UI';
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
      Center: {
        text: '我的订单'
      },
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
      status: null,
    }, {
      name: '待付款',
      status: 1
    }, {
      name: '待发货',
      status: 2
    }, {
      name: '已发货',
      status: 3
    }]
    const {order}=this.props;
    
    

  }

  render() {
    const {router}=this.props;

    return (
      <View style={[UI.CommonStyles.container,UI.CommonStyles.columnContainer]}>
        {this.renderNav()}
        <ScrollableTabView
          renderTabBar={() =>
              <DefaultTabBar
                style={{height:44}}
                tabStyle={{ paddingBottom: 0 }}
                textStyle={{ fontSize: 16 }}
              />
            }
          tabBarBackgroundColor={UI.Colors.white}
          tabBarUnderlineStyle={{ backgroundColor: UI.Colors.danger, height: 2 }}
          tabBarActiveTextColor={UI.Colors.danger}
          tabBarInactiveTextColor={UI.Colors.black}
        >

        </ScrollableTabView>
      </View>
    )
  }
}



export default connect((state, props) => ({}), dispatch => ({}), null, {
  withRef: true
})(Order);

