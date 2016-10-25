import React, {Component} from 'react';
import {
  Dimensions,
  Image,
  InteractionManager,
  ScrollView,
  ListView,
  TouchableOpacity,
  View
} from 'react-native';

import _ from 'lodash';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import * as BannerAction from '../actions/banner';
import SwiperBox from '../components/SwiperBox';
import ScrollNavs from '../components/home/ScrollNavs';
import SixBox from '../components/home/SixBox';
import UI from '../common/UI';

class Home extends Component {

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  renderRow(item, index) {
    console.log(UI);
    return (
      <Image key={index} source={item.uri}
             style={{width:UI.Size.window.width,height:UI.Size.window.width*240/670}}/>
    )
  }

  renderBanners() {
    return (
      <SwiperBox
        height={UI.Size.window.width*UI.Size.homeSwiper.scale}
        renderRow={this.renderRow.bind(this)}
        source={[
              {uri:require('../images/banner/1.jpg'),id:1},
              {uri:require('../images/banner/2.jpg'),id:2},
              {uri:require('../images/banner/3.jpg'),id:3},
              {uri:require('../images/banner/4.jpg'),id:4}]}
      />
    )
  }

  render() {
    const navs = [
      {uri: require('../images/scrollNavs/1.png'), id: 1},
      {uri: require('../images/scrollNavs/2.png'), id: 2},
      {uri: require('../images/scrollNavs/3.png'), id: 3},
      {uri: require('../images/scrollNavs/4.png'), id: 4}];

    const products = [
      {uri: require('../images/products/1.png'), id: 1},
      {uri: require('../images/products/2.png'), id: 2},
      {uri: require('../images/products/3.png'), id: 3},
      {uri: require('../images/products/4.png'), id: 4},
      {uri: require('../images/products/5.png'), id: 5},
      {uri: require('../images/products/6.png'), id: 6}];

    return (
      <View style={[UI.CommonStyles.container,{backgroundColor:UI.Colors.gray}]}>
        <ScrollView>
          {this.renderBanners()}
          <ScrollNavs navs={navs}/>
          <SixBox title="热门商品" rows={products}/>
          <SixBox title="热门品牌" rows={products}/>
          <View style={{flex:1}}></View>
        </ScrollView>
      </View>
    )
  }

}

export default connect((state, props) => ({
  banner: state.banner
}), dispatch => ({
  bannerAction: bindActionCreators(BannerAction, dispatch)
}), null, {
  withRef: true
})(Home);