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

import _ from 'lodash';
import Icon from 'react-native-vector-icons/Ionicons';
import FaIcon from 'react-native-vector-icons/FontAwesome'
import PureRenderMixin from 'react-addons-pure-render-mixin';
import UI from '../common/UI';
import NavBar from '../components/NavBar'
import Loading from '../components/Loading'
import Stepper from '../components/Stepper';
import ViewPage from '../components/ViewPages'
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
    this.props.productActions.getAddressList({
      refreshing: true
    })
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
      Center: {
        text: '地址管理'
      },
      Right: []
    };

    return (
      <NavBar options={nav}/>
    )
  }

  renderListRow(item) {
    const {editEnabled, selectedIds}=this.state;
    const iconName = selectedIds.includes(item.id) ? 'ios-checkbox' : 'ios-checkbox-outline';
    return (
      <View style={[UI.CommonStyles.container,UI.CommonStyles.columnContainer]}>
        <View style={[UI.CommonStyles.container,UI.CommonStyles.rowContainer]}>
          <Text>李先生</Text>
          <Text>1382333333</Text>
        </View>
        <Text>啥话啊说的看哈撒多久啊开始的的全球额文化</Text>
        <View style={[UI.CommonStyles.container,UI.CommonStyles.rowContainer]}>
          <View>
            <Icon name={iconName} size={20} color={UI.Colors.grayFont}/>
            <Text>默认地址</Text>
          </View>
          <View>
            <Icon name='ios-create-outline' size={20} color={UI.Colors.grayFont}/>
            <Text>编辑</Text>
          </View>
          <View>
            <FaIcon name='fa-trash-o' size={20} color={UI.Colors.grayFont}/>
            <Text>删除</Text>
          </View>
        </View>
      </View>
    )
  }

  renerList() {
    const {address}=this.state;
    if (address.listLoaded) return <Loading/>;

    return (

      <ListView
        ref={(view)=> this.listView = view }
        removeClippedSubviews
        enableEmptySections={ true }
        onEndReachedThreshold={ 30 }
        initialListSize={ 10 }
        pageSize={ 10 }
        pagingEnabled={ false }
        contentContainerStyle={[UI.CommonStyles.wrap_list]}
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
    return (
      <View style={[UI.CommonStyles.container,UI.CommonStyles.rowContainer]}>
        <TouchableOpacity
          onPress={this.onToolButtonClick.bind(this)}
          style={}>
          <Icon name="ios-add" size={20}/>
          <Text>新增地址</Text>
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    return (
      <View style={[UI.CommonStyles.container,UI.CommonStyles.columnContainer]}>
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
