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
import PureRenderMixin from 'react-addons-pure-render-mixin';
import UI from '../common/UI';
import NavBar from '../components/NavBar'
import Loading from '../components/Loading'
import Stepper from '../components/Stepper';
import ViewPage from '../components/ViewPages'
import * as shopCartActions from '../actions/shopCart';

class ShopCart extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedIds: [],
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
    this.props.shopCartActions.getShopCartList({})
  }

  onEditComplete() {

  }

  onEdit() {
    this.setState({
      editEnabled: true
    })
  }

  onRefresh() {
    this.canLoadMore = false;
    this.props.productActions.getShopCartList({
      refreshing: true
    })
  }

  onToolButtonClick() {

  }

  renderNav() {
    const {router}=this.props;
    const {editEnabled}=this.state;
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
        text: '购物车'
      },
      Right: [editEnabled ? {
        text: '完成',
        style: {
          width: 20,
          height: 20
        },
        onPress: this.onEditComplete.bind(this)
      } : {
        text: '编辑',
        style: {
          width: 20,
          height: 20
        },
        onPress: this.onEdit.bind(this)
      }]
    };

    return (
      <NavBar options={nav}/>
    )
  }

  renderListRow(item) {
    const {editEnabled, selectedIds}=this.state;
    const iconName = selectedIds.includes(item.id) ? 'ios-checkbox' : 'ios-checkbox-outline';
    return (
      <View style={[UI.CommonStyles.container,UI.CommonStyles.rowContainer]}>
        <Icon name={iconName} size={20} color={UI.Colors.grayFont}/>
        <Image source={require('../images/products/product.jpg')}/>
        <View style={[UI.CommonStyles.container,UI.CommonStyles.columnContainer]}>
          <Text>{item.name}</Text>
          <Text>{item.attribute}</Text>
          <Text>{item.price}</Text>
        </View>
        <View style={[UI.CommonStyles.container,UI.CommonStyles.columnContainer]}>
          <Text>X 1</Text>
          {editEnabled && <Stepper value={1} max={20}/>}
        </View>
      </View>
    )
  }

  renerList() {
    const {shopCart}=this.state;
    if (shopCart.listLoaded) return <Loading/>;

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
        dataSource={ this.state.dataSource.cloneWithRows(shopCart.list) }
        renderRow={this.renderListRow.bind(this)}
        refreshControl={
            <RefreshControl
              refreshing={shopCart.refreshing}
              onRefresh={this.onRefresh.bind(this)}
            />
           }
      />
    )

  }

  renderBottom() {
    const {editEnabled, selectedIds}=this.state;
    const iconName = selectedIds.length>0 ? 'ios-checkbox' : 'ios-checkbox-outline';

    return (
      <View style={[UI.CommonStyles.container,UI.CommonStyles.rowContainer]}>
        <View style={[UI.CommonStyles.container,UI.CommonStyles.rowContainer]}>
          <Icon name={iconName} size={20} color={UI.Colors.grayFont}/>
          <Text>已选 ({selectedIds.length})</Text>
        </View>
        <View style={[UI.CommonStyles.container,UI.CommonStyles.rowContainer]}>
          <Text>￥ 188.8</Text>
          <TouchableOpacity
            onPress={this.onToolButtonClick.bind(this)}
            style={[UI.CommonStyles.shop_cart_button,selectedIds.length>0&&UI.CommonStyles.shop_cart_button_enabled]}>
            <Text>{editEnabled ? "删除所选" : "下单"}</Text>
          </TouchableOpacity>
        </View>
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
  shopCart: state.shopCart
}), dispatch => ({
  shopCartActions: bindActionCreators(shopCartActions, dispatch)
}), null, {
  withRef: true
})(ShopCart);
