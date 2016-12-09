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
  StatusBar
} from 'react-native';

import FaIcon from 'react-native-vector-icons/FontAwesome'
import Icon from 'react-native-vector-icons/Ionicons';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import UI from '../common/UI';
import ViewPages from '../components/ViewPages'
import Storage from '../utils/Storage';
import config from '../common/config';

class My extends Component {

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  onLogout() {
    const {userActions}=this.props;
    userActions.logout({
      success: this.logoutSuccess.bind(this)
    });
  }

  onClear() {
    Storage.delete(config.city);
  }

  logoutSuccess() {
    const {router}=this.props;
    this.props.onLogout();
    router.push(ViewPages.login());
  }

  renderAvatar() {
    const {user}=this.props;
    return (
      <View>
        <Image
          resizeMode="cover"
          style={[UI.CommonStyles.rowContainer,{
            height:120,
            width:UI.Size.window.width,
            alignItems:'center',
          }]}
          source={require('../images/my/background.jpg')}
        >
          <View style={[UI.CommonStyles.rowContainer,{
          backgroundColor:UI.Colors.transparent,
          alignItems:'center'
          }]}>
            <Image
              style={{
                width:UI.Size.avatar.lg,
                height:UI.Size.avatar.lg,
                borderRadius:UI.Size.avatar.lg/2,
                marginHorizontal:20
              }}
              source={require('../images/my/avatar.jpg')}/>
            <Text style={{
                color:UI.Colors.white,
                marginBottom:10
              }}>{user.user && user.user.userName}</Text>
          </View>
        </Image>
      </View>
    )
  }

  renderOrders() {

    return (
      <View style={[UI.CommonStyles.columnContainer]}>
        <TouchableOpacity
          onPress={()=>{this.props.router.push(ViewPages.order())}}
          style={[UI.CommonStyles.rowContainer,UI.CommonStyles.bb,UI.CommonStyles.bt,{
            justifyContent:'space-between',
            alignItems:'center',
            padding:10
          }]}>
          <Text>我的订单</Text>
          <Icon name="ios-arrow-forward" size={20} color={UI.Colors.grayFont}/>
        </TouchableOpacity>
        <View style={[UI.CommonStyles.rowContainer,UI.CommonStyles.bb,{
          paddingVertical:10
        }]}>
          <View style={[UI.CommonStyles.columnContainer,
          UI.CommonStyles.br,
          {
            flex:1,
            alignItems:'center',
            justifyContent:'center'
          }]}>
            <Icon name="ios-card" size={24} color={UI.Colors.grayFont}/>
            <Text>待付款</Text>
          </View>
          <View style={[UI.CommonStyles.columnContainer,
          UI.CommonStyles.br,
          {
            flex:1,
            alignItems:'center',
            justifyContent:'center'
          }]}>
            <Icon name="ios-archive-outline" size={24} color={UI.Colors.grayFont}/>
            <Text>待发货</Text>
          </View>
          <View style={[UI.CommonStyles.columnContainer,
          {
            flex:1,
            alignItems:'center',
            justifyContent:'center'
          }]}>
            <Icon name="ios-send-outline" size={24} color={UI.Colors.grayFont}/>
            <Text>已发货</Text>
          </View>
        </View>
      </View>
    )
  }

  renderList() {
    return (
      <View style={[UI.CommonStyles.columnContainer,{
        marginTop:10
      }]}>
        <View style={[UI.CommonStyles.rowContainer,UI.CommonStyles.bb,{
            paddingVertical:10,
            paddingRight:10,
            justifyContent:'space-between',
            alignItems:'center'
        }]}>
          <Icon
            name="ios-heart-outline"
            size={20}
            color={UI.Colors.grayFont}
            style={{
              width:40,
              textAlign:'center'
            }}/>
          <Text style={{
            flex:1
          }}>我的收藏</Text>
          <Icon name="ios-arrow-forward" size={20} color={UI.Colors.grayFont}/>
        </View>
        <TouchableOpacity
          onPress={()=>{
            this.props.router.push(ViewPages.addressList())
          }}
          style={[UI.CommonStyles.rowContainer,UI.CommonStyles.bb,{
             paddingVertical:10,
            paddingRight:10,
            justifyContent:'space-between',
            alignItems:'center'
        }]}>
          <Icon
            name="ios-pin-outline"
            size={20}
            color={UI.Colors.grayFont}
            style={{
              width:40,
              textAlign:'center'
            }}/>
          <Text style={{
            flex:1
          }}>地址管理</Text>
          <Icon name="ios-arrow-forward" size={20} color={UI.Colors.grayFont}/>
        </TouchableOpacity>
        <View style={[UI.CommonStyles.rowContainer,UI.CommonStyles.bb,{
              paddingVertical:10,
            paddingRight:10,
            justifyContent:'space-between',
            alignItems:'center'
        }]}>
          <Icon
            name="ios-settings-outline"
            size={20}
            color={UI.Colors.grayFont}
            style={{
              width:40,
              textAlign:'center'
            }}/>
          <Text style={{
            flex:1
          }}>系统设置</Text>
          <Icon name="ios-arrow-forward" size={20} color={UI.Colors.grayFont}/>
        </View>
      </View>
    )
  }

  renderAbout() {
    const {router}=this.props;
    return (
      <View style={[UI.CommonStyles.columnContainer,{
        marginTop:10
      }]}>
        <TouchableOpacity
          onPress={()=>{
            router.push(ViewPages.about())
          }}
          style={[UI.CommonStyles.rowContainer,UI.CommonStyles.bb,{
            paddingVertical:10,
            paddingRight:10,
            justifyContent:'space-between',
            alignItems:'center'
        }]}>
          <Icon
            name="ios-alert-outline"
            size={20}
            color={UI.Colors.grayFont}
            style={{
              width:40,
              textAlign:'center'
            }}/>
          <Text style={{
            flex:1
          }}>关于我们</Text>
          <Icon name="ios-arrow-forward" size={20} color={UI.Colors.grayFont}/>
        </TouchableOpacity>
      </View>
    )
  }


  renderClear() {
    return (
      <View style={[UI.CommonStyles.columnContainer,{
        marginTop:10
      }]}>
        <TouchableOpacity
          onPress={this.onClear.bind(this)}
          style={[UI.CommonStyles.rowContainer,UI.CommonStyles.bb,{
            paddingVertical:10,
            paddingRight:10,
            justifyContent:'space-between',
            alignItems:'center'
        }]}>
          <FaIcon
            name='trash-o'
            size={20}
            color={UI.Colors.grayFont}
            style={{
              width:40,
              textAlign:'center'
            }}/>
          <Text style={{
            flex:1
          }}>清理缓存</Text>
        </TouchableOpacity>
      </View>
    )
  }

  renderLogout() {
    return (
      <View style={[UI.CommonStyles.columnContainer,{
        marginTop:10
      }]}>
        <TouchableOpacity
          onPress={this.onLogout.bind(this)}
          style={[UI.CommonStyles.rowContainer,UI.CommonStyles.bb,{
            paddingVertical:10,
            paddingRight:10,
            justifyContent:'space-between',
            alignItems:'center'
        }]}>
          <Icon
            name="ios-log-out-outline"
            size={20}
            color={UI.Colors.grayFont}
            style={{
              width:40,
              textAlign:'center'
            }}/>
          <Text style={{
            flex:1
          }}>退出登陆</Text>
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    return (
      <View style={[UI.CommonStyles.container,UI.CommonStyles.columnContainer,{
        justifyContent:'flex-start',
        backgroundColor:UI.Colors.gray
      }]}>
        <StatusBar barStyle="light-content"/>
        {this.renderAvatar()}
        {this.renderOrders()}
        {this.renderList()}
        {this.renderAbout()}
        {this.renderClear()}
        {this.renderLogout()}
      </View>
    )
  }
}

export default My