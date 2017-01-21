import React, {Component} from 'react';
import {
  Dimensions,
  Image,
  Animated,
  InteractionManager,
  ScrollView,
  ListView,
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
} from 'react-native';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import UI from '../common/UI';
import ViewPages from '../components/ViewPages';
import {getImageSource} from '../utils';
import Loading from '../components/Loading';
import Button from '../components/Button';
import SwiperBox from '../components/SwiperBox';
import * as productActions from '../actions/product';

const pageSize = 20;

class VipAlbumProductCards extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.fetchData();
    });
  }

  fetchData() {
    this.props.productActions.getVipAlbumProduct({
      pageIndex: 0,
      pageSize,
      categoryId: this.props.categoryId
    });
  }

  renderProductCart(product, index) {
    const {router}=this.props;
    return (
      <View
        key={index}
        style={[UI.CommonStyles.columnContainer, {width: UI.Size.window.width, height: UI.Size.window.height-UI.Size.statusBar.hacker}]}>
        <View style={[UI.CommonStyles.columnContainer, {justifyContent: 'center', alignItems: 'center', flex: 1}]}>
          <Image source={{uri: getImageSource(product.imageUrl, {max: true})}}
                 style={{width: UI.Size.window.width, height: UI.Size.window.width, resizeMode: 'cover'}}/>
        </View>
        <View style={[UI.CommonStyles.columnContainer, {justifyContent: 'flex-start', padding: 10}]}>
          <Text numberOfLines={2} style={{width: UI.Size.window.width - 20}}>{product.name}</Text>
          <Text style={{
            marginTop: 10,
            fontSize: UI.Size.font.ms,
            color: UI.Colors.grayFont,
            width: UI.Size.window.width - 20
          }}>{product.description}</Text>
        </View>
        <View
          style={[UI.CommonStyles.rowContainer, {justifyContent: 'space-between', alignItems: 'center', padding: 10}]}>
          <Text style={{color: UI.Colors.danger}}>￥{product.vipPrice}</Text>
          <TouchableOpacity
            style={{
              height: 30,
              borderWidth: UI.Size.border.size,
              borderColor: UI.Colors.danger,
              borderRadius: 15,
              width: 80,
              justifyContent: 'center',
              alignItems: 'center'
            }}
            onPress={() => {
              router.push(ViewPages.product(), {id: product.id})
            }}
          >
            <Text style={{color: UI.Colors.danger}}>去购买</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  render() {
    const {router, product:{vipAlbumProduct}, categoryId}=this.props;
    const source = vipAlbumProduct[categoryId];
    const isEmpty = source && source.list && source.list.products.length == 0;
    if (!source || !source.loaded) {
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
              refreshing={!!source.refreshing}
              onRefresh={() => this.fetchData()}
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
      <View style={[{justifyContent: 'flex-start', width: UI.Size.window.width, height: UI.Size.window.height}]}>
        <SwiperBox
          height={UI.Size.window.height}
          autoplay={false}
          showsPagination={false}
          renderRow={this.renderProductCart.bind(this)}
          source={source.list.products}
        />
        <View style={{position: 'absolute', top: UI.Size.statusBar.height, left: 0}}>
          <Button
            iconName='ios-arrow-back'
            iconSize={24}
            iconColor='black'
            style={{marginRight: 10}}
            position="Left"
            backgroundColor="transparent"
            onPress={() => {
              router.pop()
            }}/>
        </View>
      </View>
    )
  }
}

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


export default connect((state, props) => ({
  product: state.product
}), dispatch => ({
  productActions: bindActionCreators(productActions, dispatch)
}), null, {
  withRef: true
})(VipAlbumProductCards);

