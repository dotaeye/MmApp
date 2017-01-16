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
import {getImageUrl} from '../utils';


class VipAlbumCateTab extends Component {

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
    this.props.productActions.getVipAlbumCategory({});
  }

  onRefresh() {
    this.props.productActions.getVipAlbumCategory({
      refreshing: true
    })
  }

  renderRow(item) {
    const {router}=this.props;
    return (
      <View style={[
        UI.CommonStyles.rowContainer,
        UI.CommonStyles.bb
        ]}>
        <Image source={{uri:getImageUrl(item.bannerUrl)}} style={{height: 120, resizeMode:'cover', width: UI.Size.window.width}}/>
      </View>
    )
  }

  render() {
    const {product} = this.props;
    const isEmpty = product.vipAlbumCategories && product.vipAlbumCategories.list && product.vipAlbumCategories.list.length === 0;
    if (!product.vipAlbumCategories.loaded || !product.vipAlbumCategories.list) {
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
              refreshing={!!product.vipAlbumCategories.refreshing}
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
        dataSource={this.state.dataSource.cloneWithRows(product.vipAlbumCategories.list)}
        renderRow={this.renderRow.bind(this)}
        style={styles.listView}
        onEndReachedThreshold={10}
        refreshControl={
          <RefreshControl
            style={{backgroundColor: 'transparent'}}
            refreshing={!!product.vipAlbumCategories.refreshing}
            onRefresh={() => this.onRefresh()}
            title="获取数据中..."
            colors={['#ffaa66cc', '#ff00ddff', '#ffffbb33', '#ffff4444']}
          />
        }/>
    )
  }
}

export default VipAlbumCateTab;

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