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
  DeviceEventEmitter,
  Text,
} from 'react-native';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import UI from '../common/UI';
import NavBar from '../components/NavBar'
import Loading from '../components/Loading'
import EmptyList from '../components/EmptyList';
import * as addressActions from '../actions/address';

class PickerAddress extends Component {

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
    InteractionManager.runAfterInteractions(() => {
      this.fetchData();
    });
  }

  fetchData(options) {
    const {addressActions}=this.props;
    const params = Object.assign({}, {}, options);
    addressActions.getAddressList(params)
  }

  onRefresh() {
    this.canLoadMore = false;
    this.fetchData({
      refreshing: true
    });
  }

  onItemPicker(item) {
    DeviceEventEmitter.emit('pickerAddress', item.id);
    this.props.router.pop();
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
        text: '选择地址',
        isText: true
      }],
      Right: []
    };

    return (
      <NavBar options={nav}/>
    )
  }

  renderListRow(item) {
    return (
      <TouchableOpacity
        style={[UI.CommonStyles.container,
          UI.CommonStyles.columnContainer,
          UI.CommonStyles.bt,
          UI.CommonStyles.bb,
          {
            marginBottom:10
          }]}
        onPress={this.onItemPicker.bind(this,item)}
      >
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
        }}>{`${item.province} ${item.area} ${item.county} ${item.detail}`}</Text>
      </TouchableOpacity>
    )
  }

  renderList() {
    const {address}=this.props;
    if (!address.loaded) return <Loading/>;
    if (address.list.length == 0) return <EmptyList/>;

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

  render() {
    return (
      <View style={[UI.CommonStyles.container,UI.CommonStyles.columnContainer,{
        backgroundColor:UI.Colors.gray
      }]}>
        {this.renderNav()}
        {this.renderList()}
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
})(PickerAddress);
