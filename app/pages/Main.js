import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  StatusBar
} from 'react-native';
import moment from 'moment';
import TabNavigator from 'react-native-tab-navigator';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import config from '../common/config';
import UI from '../common/UI';
import ViewPages from '../components/ViewPages'
import Home from './Home';
import Category from './Category';
import My from './My';
import Storage from '../utils/Storage';
import { registerApp } from 'react-native-wechat';

import * as homeActions from '../actions/home';
import * as userActions from '../actions/user';

class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'home'
    };
    registerApp('wx14d553bd6197d470');
  }

  componentWillMount() {
    Storage.get(config.token).then((user)=> {
      if (user && moment().isBefore(new Date(user['.expires']))) {
        this.props.userActions.loginSuccess(user);
      }
    })
  }

  componentDidFocus() {
    const {selectedTab}=this.state;
    if (selectedTab == 'home') {
      this.home.setStatusBarStyle();
    }
  }

  onTabPress(tab, isDefaultBarStyle, route) {
    const {user, router}=this.props;
    // if (isDefaultBarStyle) {
    //   StatusBar.setBarStyle('default')
    // }
    // if (tab == 'home') {
    //   this.home.setStatusBarStyle();
    // }
    if (['my', 'selectcar', 'message'].includes(tab) && !user.user) {
      router.push(ViewPages.login());
    } else {
      if (['selectcar', 'message'].includes(tab)) {
        router.push(route);
      } else {
        this.setState({
          selectedTab: tab
        })
      }
    }
  }

  onLogout() {
    this.setState({
      selectedTab: 'home'
    })
  }

  render() {
    return (
      <View style={{flex:1}}>

        <TabNavigator tabBarStyle={UI.CommonStyles.tabBar}>
          <TabNavigator.Item
            title="首页"
            selected={this.state.selectedTab === 'home'}
            selectedTitleStyle={UI.CommonStyles.tabBarTextSelected}
            titleStyle={UI.CommonStyles.tabBarTextSelected}
            renderIcon={() => <Image source={require("../images/icon/home.png")} style={UI.CommonStyles.tabBarIcon}/>}
            renderSelectedIcon={() => <Image source={require("../images/icon/home_on.png")} style={UI.CommonStyles.tabBarIcon}/>}
            onPress={this.onTabPress.bind(this,'home')}>
            <Home ref={(ref)=>{this.home=ref}} {...this.props}/>
          </TabNavigator.Item>
          <TabNavigator.Item
            title="分类"
            selected={this.state.selectedTab === 'category'}
            selectedTitleStyle={UI.CommonStyles.tabBarTextSelected}
            titleStyle={UI.CommonStyles.tabBarTextSelected}
            renderIcon={() => <Image source={require("../images/icon/category.png")} style={UI.CommonStyles.tabBarIcon}/>}
            renderSelectedIcon={() => <Image source={require("../images/icon/category_on.png")} style={UI.CommonStyles.tabBarIcon}/>}
            onPress={this.onTabPress.bind(this,'category',true)}>
            <Category {...this.props}/>
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={false}
            renderIcon={() => <Image source={require("../images/icon/plus.png")} style={UI.CommonStyles.tabBarIconPlus}/>}
            onPress={this.onTabPress.bind(this,'selectcar',true, ViewPages.selectCar())}>
          </TabNavigator.Item>
          <TabNavigator.Item
            title="消息"
            selected={this.state.selectedTab === 'message'}
            selectedTitleStyle={UI.CommonStyles.tabBarTextSelected}
            titleStyle={UI.CommonStyles.tabBarTextSelected}
            renderIcon={() => <Image source={require("../images/icon/message.png")} style={UI.CommonStyles.tabBarIcon}/>}
            renderSelectedIcon={() => <Image source={require("../images/icon/message_on.png")} style={UI.CommonStyles.tabBarIcon}/>}
            onPress={this.onTabPress.bind(this,'message',true, ViewPages.shopCart())}>
          </TabNavigator.Item>
          <TabNavigator.Item
            title="我的"
            selected={this.state.selectedTab === 'my'}
            selectedTitleStyle={UI.CommonStyles.tabBarTextSelected}
            titleStyle={UI.CommonStyles.tabBarTextSelected}
            renderIcon={() => <Image source={require("../images/icon/my.png")} style={UI.CommonStyles.tabBarIcon}/>}
            renderSelectedIcon={() => <Image source={require("../images/icon/my_on.png")} style={UI.CommonStyles.tabBarIcon}/>}
            onPress={this.onTabPress.bind(this,'my',true)}>
            <My
              onLogout={this.onLogout.bind(this)}
              {...this.props}/>
          </TabNavigator.Item>
        </TabNavigator>
      </View>
    );
  }
}

export default connect((state, props) => ({
  home: state.home,
  user: state.user
}), dispatch => ({
  homeActions: bindActionCreators(homeActions, dispatch),
  userActions: bindActionCreators(userActions, dispatch)
}), null, {
  withRef: true
})(Main);