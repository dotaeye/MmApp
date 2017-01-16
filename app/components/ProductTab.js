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
import PureRenderMixin from 'react-addons-pure-render-mixin';
import ViewPages from '../components/ViewPages';
import {getImageSource} from '../utils';

const pageSize = 20;

class ProductTab extends Component {

  static propTypes = {
    product: PropTypes.object,
    productActions: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
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
    this.props.productActions.getVipProduct({
      pageIndex: 0,
      pageSize
    });
  }

  onRefresh() {
    this.canLoadMore = false;
    this.props.productActions.getVipProduct({
      pageIndex: 0,
      pageSize,
      refreshing: true
    })
  }


  onScroll() {
    if (!this.canLoadMore) {
      this.canLoadMore = true;
    }
  }


  onEndReached() {
    const {product, productActions}=this.props;
    const now = Date.parse(new Date()) / 1000;
    if (product.vipList.hasMore && this.canLoadMore && now - this.prevLoadMoreTime > 2) {
      productActions.getVipProduct({
        pageIndex: product.vipList.pageIndex + 1,
        pageSize,
        loadMore: true
      });
      this.prevLoadMoreTime = Date.parse(new Date()) / 1000;
      this.canLoadMore = false;
    }
  }

  renderFooter() {
    const {product}=this.props;
    if (product.vipList.loadMore) {
      return <Spinner/>;
    }
    if (product.vipList.refreshing !== true
      && product.vipList.hasMore !== true
      && product.vipList.list.length) {
      return <EndTag/>;
    }
  }

  renderRow(item) {
    const {router}=this.props;
    return (
      <TouchableOpacity
        style={[
        UI.CommonStyles.rowContainer,
        UI.CommonStyles.bb, {padding: 10}]}
        onPress={()=>{
          router.push(ViewPages.product(),{
            id:item.id
          })
        }}
        >
        <Image source={{uri:getImageSource(item.imageUrl)}} style={{width: 120, height: 120, marginRight: 10}}/>
        <View style={[
          UI.CommonStyles.columnContainer, {justifyContent: 'flex-start'}]}>
          <Text numberOfLines={2} style={{width:UI.Size.window.width-150}}>{item.name}</Text>
          <View style={[
          UI.CommonStyles.columnContainer, {justifyContent: 'space-between',flex:1}]}>
            <Text
              style={{marginTop: 10, fontSize: UI.Size.font.ms, color: UI.Colors.grayFont,width:UI.Size.window.width-150}}>{item.description}</Text>
            <Text><Text style={{color:UI.Colors.danger}}>￥{item.vipPrice}</Text> <Text
              style={{textDecorationLine:'line-through',fontSize:UI.Size.font.ms}}>￥{item.price}</Text></Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }


  render() {
    const {product} = this.props;
    const isEmpty = product.vipList && product.vipList.list && product.vipList.list.length === 0;
    if (!product.vipList.loaded || !product.vipList.list) {
      return <Loading />;
    }
    if (isEmpty) {
      return (
        <ScrollView
          automaticallyAdjustContentInsets={false}
          horizontal={false}
          contentContainerStyle={styles.no_data}
          style={{flex: 1}}
          refreshControl={
            <RefreshControl
              style={{backgroundColor: 'transparent'}}
              refreshing={!!product.vipList.refreshing}
              onRefresh={() => this.onRefresh()}
              title="Loading..."
              colors={['#ffaa66cc', '#ff00ddff', '#ffffbb33', '#ffff4444']}
            />
          }
          >
          <View style={{alignItems: 'center'}}>
            <Text style={{fontSize: 16}}>
              目前没有数据，请刷新重试……
            </Text>
          </View>
        </ScrollView>
      );
    }
    return (
      <ListView
        initialListSize={5}
        dataSource={this.state.dataSource.cloneWithRows(product.vipList.list.products)}
        renderRow={this.renderRow.bind(this)}
        style={styles.listView}
        onEndReached={() => this.onEndReached()}
        onEndReachedThreshold={10}
        onScroll={this.onScroll.bind(this)}
        renderFooter={this.renderFooter.bind(this)}
        refreshControl={
          <RefreshControl
            style={{backgroundColor: 'transparent'}}
            refreshing={!!product.vipList.refreshing}
            onRefresh={() => this.onRefresh()}
            title="获取数据中..."
            colors={['#ffaa66cc', '#ff00ddff', '#ffffbb33', '#ffff4444']}
          />
        }/>
    )
  }
}

export default ProductTab;

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