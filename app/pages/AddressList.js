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
  RefreshControl,
  Text,
} from 'react-native';

import _ from 'lodash';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Icon from 'react-native-vector-icons/Ionicons';
import FaIcon from 'react-native-vector-icons/FontAwesome'
import PureRenderMixin from 'react-addons-pure-render-mixin';
import UI from '../common/UI';
import NavBar from '../components/NavBar'
import Loading from '../components/Loading'
import ViewPages from '../components/ViewPages'
import * as addressActions from '../actions/address';

class AddressList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      })
    };
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    this.props.addressActions.getAddressList({})
  }


  onRefresh() {
    this.canLoadMore = false;
    this.props.addressActions.getAddressList({
      refreshing: true
    })
  }

  onToolButtonClick() {
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
        text: '地址管理',
        isText: true
      }],
      Right: []
    };

    return (
      <NavBar options={nav}/>
    )
  }

  renderListRow(item) {
    const {router}=this.props;
    const iconName = item.isDefault ? 'ios-checkbox' : 'ios-checkbox-outline';
    return (
      <View style={[UI.CommonStyles.container,
      UI.CommonStyles.columnContainer,
      UI.CommonStyles.bt,
      UI.CommonStyles.bb,
      {
        marginBottom:10
      }]}>
        <View style={[UI.CommonStyles.container,
        UI.CommonStyles.rowContainer,
        {
          padding:10
        }]}>
          <Text style={{marginRight:30}}>{item.name}</Text>
          <Text>{item.phoneNumber}</Text>
        </View>
        <Text style={{
          fontSize:UI.Size.font.min,
          color:UI.Colors.grayFont,
          marginBottom:15,
          marginLeft:10,
        }}>{item.street}</Text>
        <View style={[UI.CommonStyles.container,
        UI.CommonStyles.rowContainer,
        UI.CommonStyles.bt,
        {
           padding:10
        }
        ]}>
          <View
            style={[
            UI.CommonStyles.container,
            UI.CommonStyles.rowContainer,
            {
              justifyContent:'flex-start',
              alignItems:'center',
              flex:1
            }
            ]}>
            <Icon
              name={iconName}
              size={22}
              color={UI.Colors.danger}
              style={{
                marginRight:5
              }}
            />
            <Text>默认地址</Text>
          </View>

          <View
            style={[
            UI.CommonStyles.rowContainer,
            {
              justifyContent:'flex-end',
              alignItems:'center',
              width:110
            }
            ]}>
            <TouchableOpacity
              style={[
              UI.CommonStyles.container,
              UI.CommonStyles.rowContainer,
              {
                justifyContent:'flex-start',
                alignItems:'center',
                marginRight:10
              }
              ]}
              onPress={()=>{
                router.push(ViewPages.address(),{
                  id:item.id
                })
              }}
            >
              <Icon
                name='ios-create-outline'
                size={22}
                color={UI.Colors.grayFont}
                style={{
                marginRight:5
              }}
              />
              <Text>编辑</Text>
            </TouchableOpacity>
            <View
              style={[
            UI.CommonStyles.container,
            UI.CommonStyles.rowContainer,
            {
              justifyContent:'flex-start',
              alignItems:'center'
            }
            ]}>
              <FaIcon
                name='trash-o'
                size={22}
                color={UI.Colors.grayFont}
                style={{
                marginRight:5
              }}
              />
              <Text>删除</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }

  renderList() {
    const {address}=this.props;
    if (!address.hasLoaded) return <Loading/>;
    return (
      <ListView
        ref={(view)=> this.listView = view }
        removeClippedSubviews
        enableEmptySections={ true }
        onEndReachedThreshold={ 30 }
        initialListSize={ 10 }
        pageSize={ 10 }
        pagingEnabled={ false }

        dataSource={ this.state.dataSource.cloneWithRows(address.list) }
        renderRow={this.renderListRow.bind(this)}
        refreshControl={
            <RefreshControl
              refreshing={address.refreshing}
              onRefresh={this.onRefresh.bind(this)}
            />
           }
      />
    )

  }

  renderBottom() {
    const {router}=this.props;
    return (

      <View
        style={[
          UI.CommonStyles.bt,
          {
            backgroundColor:UI.Colors.white,
            padding:10,
            height:60,
          }]}
      >
        <TouchableOpacity
          style={[
          UI.CommonStyles.container,
          UI.CommonStyles.rowContainer,
          UI.CommonStyles.center,
          {
            borderColor:UI.Colors.danger,
            borderWidth:UI.Size.border.size,
            backgroundColor:UI.Colors.white
          }]}
          onPress={()=>{
            router.push(ViewPages.address())
          }}
        >

          <Icon
            name="ios-add"
            size={26}
            color={UI.Colors.danger}
          />
          <Text
            style={{
            marginLeft:10,
            color:UI.Colors.danger
          }}>新增地址</Text>
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    return (
      <View style={[UI.CommonStyles.container,UI.CommonStyles.columnContainer,{
        backgroundColor:UI.Colors.gray
      }]}>
        {this.renderNav()}
        {this.renderList()}
        {this.renderBottom()}
      </View>
    )
  }

}

export default connect((state, props) => ({
  address: state.address
}), dispatch => ({
  addressActions: bindActionCreators(addressActions, dispatch)
}), null, {
  withRef: true
})(AddressList);
