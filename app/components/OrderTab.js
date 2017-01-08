import React, {Component, PropTypes} from "react";
import {
  ListView,
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  View,
  Text,
  Image,
  ActivityIndicator,
  InteractionManager
} from "react-native";

import Loading from './Loading';
import EndTag from './EndTag';
import Spinner from './Spinner';
import UI from '../common/UI';
import Icon from 'react-native-vector-icons/Ionicons';
import FaIcon from 'react-native-vector-icons/FontAwesome'
import PureRenderMixin from 'react-addons-pure-render-mixin';
import ViewPages from '../components/ViewPages';
import {orderStatus} from '../common/orderStatus';
import {getImageUrl} from '../utils';


class OrderTab extends Component {

  static propTypes = {
    status: PropTypes.number.isRequired,
    order: PropTypes.object,
    orderActions: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2)=>row1 !== row2
      })
    };
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.canLoadMore = false;
    this.prevLoadMoreTime = 0;
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.fetchData();
    });
  }

  fetchData() {
    const {orderActions, status}=this.props;
    orderActions.getOrderList({
      status,
      pageIndex: 0
    });
  }

  onRefresh() {
    this.canLoadMore = false;
    const {orderActions, status}=this.props;
    orderActions.getOrderList({
      status,
      pageIndex: 0,
      refreshing: true
    })
  }


  onScroll() {
    if (!this.canLoadMore) {
      this.canLoadMore = true;
    }
  }

  onCancel(id) {
    const {orderActions}=this.props;
    Alert.alert(
      '确认要取消此订单?',
      null,
      [
        {
          text: '否', onPress: () => {
        }
        },
        {
          text: '是', onPress: () => {
          orderActions.cancelOrder({
            id
          })
          }
        }
      ]
    )
  }

  onDelete(id) {
    const {orderActions}=this.props;
    Alert.alert(
      '确认要删除此订单?',
      null,
      [
        {
          text: '否', onPress: () => {
        }
        },
        {
          text: '是', onPress: () => {
          orderActions.deleteOrder({
            id
          })
        }
        }
      ]
    );
  }

  onEndReached() {
    const {order, orderActions, status}=this.props;
    const now = Date.parse(new Date()) / 1000;
    if (order.hasMore[status] && this.canLoadMore && now - this.prevLoadMoreTime > 2) {
      orderActions.getOrderList({
        status,
        pageIndex: order.pageIndex + 1,
        loadMore: true
      });
      this.prevLoadMoreTime = Date.parse(new Date()) / 1000;
      this.canLoadMore = false;
    }
  }

  renderFooter() {
    const {order, status}=this.props;
    if (order.loadMore[status]) {
      return <Spinner/>;
    }
    if (order.refreshing[status] !== true
      && order.hasMore[status] !== true
      && order.list[status].length) {
      return <EndTag/>;
    }
  }

  renderRow(item) {
    const {router}=this.props;
    const shopCart = item.shopCartItems[0];
    const os = orderStatus.find(x=>x.status == item.orderStatusId);
    return (
      <View style={[
      UI.CommonStyles.columnContainer,
      UI.CommonStyles.bb,
      {
        marginTop:10
      }]}>
        <View style={[
        UI.CommonStyles.rowContainer,
        UI.CommonStyles.bb,
        {
          padding:10,
          justifyContent:'space-between'

        }]}>
          <Text>订单编号: {item.id}</Text>
          {os.status < 20 && (
            <TouchableOpacity
              onPress={this.onDelete.bind(this,item.id)}
            >
              <FaIcon
                name='trash-o'
                size={22}
                color={UI.Colors.grayFont}
                style={{
                marginRight:5
              }}
              />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity
          onPress={()=>{
            router.push(ViewPages.orderDetail())
          }}
          style={[UI.CommonStyles.rowContainer,{padding:10}]}>
          <Image
            source={{uri:getImageUrl(shopCart.imageUrl)}}
            style={{
              width:80,
              height:80
            }}/>
          <View style={[
            UI.CommonStyles.container,
            UI.CommonStyles.columnContainer]}>
            <View style={[
                UI.CommonStyles.rowContainer,
                {
                  justifyContent:'space-between'

                }]}>
              <Text>{shopCart.name}</Text>
            </View>
            <View style={[
                UI.CommonStyles.rowContainer,
                {
                  justifyContent:'space-between'

                }]}>
              <Text style={{
                fontSize:UI.Size.font.ms,
                color:UI.Colors.grayFont,
                marginTop:5
              }}>共{item.shopCartItems.length}个商品</Text>
              <Text style={{
                fontSize:UI.Size.font.ms,
                marginTop:5
              }}>{os.name}</Text>
            </View>
          </View>
        </TouchableOpacity>
        {os.status > 0 && (
          <View style={[
            UI.CommonStyles.rowContainer,
            UI.CommonStyles.bt,
            {
              padding:10,
              justifyContent:'space-between',
              alignItems:'center'
            }]}>
            <Text>实付:<Text
              style={{
              color:UI.Colors.danger
            }}>￥ {item.orderTotal}</Text>
            </Text>
            <View style={[
            UI.CommonStyles.rowContainer]}>
              {os.status < 20 && (
                <TouchableOpacity
                  style={[UI.CommonStyles.button,{marginRight:10}]}
                  onPress={this.onCancel.bind(this,item.id)}>
                  <Text>取消订单</Text>
                </TouchableOpacity>
              )}
              {os.status < 20 && (
                <TouchableOpacity
                  style={UI.CommonStyles.button}
                  onPress={()=>{
                  this.props.router.push(ViewPages.pay(),{
                    order:item
                  })
                }}
                >
                  <Text>付款</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
      </View>
    )
  }


  render() {
    const {order, status} = this.props;
    const isEmpty = order.list[status] && order.list[status].orders && order.list[status].orders.length === 0;
    if (!order.loaded || !order.list[status]) {
      return <Loading />;
    }

    if (isEmpty) {
      return (
        <ScrollView
          automaticallyAdjustContentInsets={false}
          horizontal={false}
          contentContainerStyle={styles.no_data}
          style={{ flex: 1 }}
          refreshControl={
            <RefreshControl
              style={{ backgroundColor: 'transparent' }}
              refreshing={order.refreshing[status]}
              onRefresh={() => this.onRefresh()}
              title="Loading..."
              colors={['#ffaa66cc', '#ff00ddff', '#ffffbb33', '#ffff4444']}
            />
          }
        >
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 16 }}>
              目前没有数据，请刷新重试……
            </Text>
          </View>
        </ScrollView>
      );
    }
    return (
      <ListView
        initialListSize={5}
        dataSource={this.state.dataSource.cloneWithRows(order.list[status].orders)}
        renderRow={this.renderRow.bind(this)}
        style={styles.listView}
        onEndReached={() => this.onEndReached()}
        onEndReachedThreshold={10}
        onScroll={this.onScroll.bind(this)}
        renderFooter={this.renderFooter.bind(this)}
        refreshControl={
          <RefreshControl
            style={{ backgroundColor: 'transparent' }}
            refreshing={!!order.refreshing[status]}
            onRefresh={() => this.onRefresh()}
            title="获取数据中..."
            colors={['#ffaa66cc', '#ff00ddff', '#ffffbb33', '#ffff4444']}
          />
        }/>
    )
  }
}

export default OrderTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: UI.Colors.white
  },
  no_data: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 100
  }
});