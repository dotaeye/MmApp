import React, {Component} from 'react';
import {
  Dimensions,
  Image,
  Animated,
  InteractionManager,
  ScrollView,
  RefreshControl,
  ListView,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/Ionicons';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import UI from '../common/UI';
import NavBar from '../components/NavBar'
import Loading from '../components/Loading';
import Stepper from '../components/Stepper';
import ViewPages from '../components/ViewPages'
import * as shopCartActions from '../actions/shopCart';
import {getImageUrl} from '../utils';

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
    this.canLoadMore = false;
    this.prevLoadMoreTime = 0;
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    this.props.shopCartActions.getShopCartList({
      success: () => {
        const {shopCart}=this.props;
        if (shopCart.list.length) {
          this.setState({
            selectedIds: shopCart.list.map(x => x.id)
          })
        }
      }
    });
  }

  onRefresh() {
    this.canLoadMore = false;
    this.props.shopCartActions.getShopCartList({
      refreshing: true
    });
  }

  onEditComplete() {
    this.setState({
      editEnabled: false
    })
  }

  onEdit() {
    this.setState({
      editEnabled: true
    })
  }

  onToolButtonClick() {
    const {editEnabled, selectedIds}=this.state;
    if (selectedIds.length == 0) {
      return;
    }
    if (editEnabled) {
      this.props.shopCartActions.deleteShopCart({
        ids: selectedIds,
        success: () => {
          this.setState({
            selectedIds: []
          })
        }
      })
    } else {
      this.props.router.push(ViewPages.checkOut(), {
        ids: selectedIds
      })
    }
  }

  onSelectAll() {
    const {shopCart}=this.props;
    const {selectedIds}=this.state;
    if (selectedIds.length == shopCart.list.length) {
      this.setState({
        selectedIds: []
      })
    } else {
      this.setState({
        selectedIds: shopCart.list.map(x => x.id)
      })
    }
  }

  onSelectItem(id) {
    const {selectedIds}=this.state;
    if (selectedIds.includes(id)) {
      let index = _.indexOf(selectedIds, id);
      this.setState({
        selectedIds: [...selectedIds.slice(0, index), ...selectedIds.slice(index + 1)]
      })
    } else {
      this.setState({
        selectedIds: [...selectedIds, id]
      })
    }
  }

  onUpdateItem(item, quantity) {
    this.props.shopCartActions.updateShopCart({
      id: item.id,
      quantity
    });
  }

  getTotal() {
    let total = 0;
    const {selectedIds}=this.state;
    const {shopCart}=this.props;
    shopCart.list.forEach(item => {
      if (selectedIds.includes(item.id)) {
        total += item.unitPrice * item.quantity;
      }
    });
    return total;
  }

  renderNav() {
    const {router}=this.props;
    const {editEnabled}=this.state;
    const nav = {
      Left: [{
        iconName: 'ios-arrow-back',
        iconSize: 20,
        iconColor: UI.Colors.black,
        onPress: () => {
          router.pop();
        }
      }],
      Center: [{
        text: '购物车',
        isText: true
      }],
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
    const iconName = selectedIds.includes(item.id) ? 'ios-checkmark-circle' : 'ios-checkmark-circle-outline';
    return (
      <View style={[
        UI.CommonStyles.rowContainer,
        UI.CommonStyles.bb,
        {
          padding: 10,
          alignItems: 'center'
        }
      ]}>
        <TouchableOpacity
          style={{
            paddingHorizontal: 8,
            height: 60,
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onPress={this.onSelectItem.bind(this, item.id)}
        >
          <Icon name={iconName} size={20} color={UI.Colors.danger}/>
        </TouchableOpacity>
        <View
          style={[UI.CommonStyles.rowContainer, {flex: 1}]}>
          <Image
            source={{uri: getImageUrl(item.imageUrl)}}
            style={{
              width: 60,
              height: 60,
              marginRight:10
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
                justifyContent: 'space-between',
                alignItems: 'center',
                height: 28
              }]}>
              <Text>￥{item.price}</Text>
              {editEnabled && <Stepper
                value={item.quantity}
                max={30}
                onChange={this.onUpdateItem.bind(this, item)}/>}
            </View>
          </View>
        </View>
      </View>
    )
  }

  renderList() {
    const {shopCart}=this.props;
    if (!shopCart.loaded) return <Loading/>;
    return (
      <ListView
        style={{
          marginTop: 10,
          marginBottom:50
        }}
        ref={(view) => this.listView = view }
        removeClippedSubviews
        enableEmptySections={ true }
        onEndReachedThreshold={ 30 }
        initialListSize={ 10 }
        pageSize={ 10 }
        pagingEnabled={ false }
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
    const iconName = selectedIds.length > 0 ? 'ios-checkmark-circle' : 'ios-checkmark-circle-outline';

    return (
      <View style={[UI.CommonStyles.rowContainer,
        UI.CommonStyles.bt,
        {
          height: 50,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          alignItems: 'center'
        }]}>
        <View style={[UI.CommonStyles.rowContainer, {
          justifyContent: 'space-between',
          flex: 1,
          height: 50,
          alignItems: 'center'
        }]}>
          <TouchableOpacity
            onPress={this.onSelectAll.bind(this)}
            style={[UI.CommonStyles.rowContainer, {paddingLeft: 10}]}>
            <Icon name={iconName} size={20} color={UI.Colors.danger}/>
            <Text style={{
              marginLeft: 10
            }}>已选 ({selectedIds.length})</Text>
          </TouchableOpacity>
          <View style={{flex: 1}}>
            <Text style={{marginRight: 10, textAlign: 'right'}}>￥{this.getTotal()}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={[{
            backgroundColor: UI.Colors.grayFont,
            height: 50,
            width: 80,
            alignItems: 'center',
            justifyContent: 'center'
          }, selectedIds.length > 0 && {backgroundColor: UI.Colors.danger}]}
          onPress={this.onToolButtonClick.bind(this)}
        >
          <Text style={{color: UI.Colors.white}}>{editEnabled ? "删除所选" : "下单"}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    return (
      <View style={[
        UI.CommonStyles.container,
        UI.CommonStyles.columnContainer,
        {
          backgroundColor: UI.Colors.gray
        }]}>
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
