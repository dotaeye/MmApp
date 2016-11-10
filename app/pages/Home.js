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
  TextInput,
  StatusBar,
  Platform
} from 'react-native';

import _ from 'lodash';
import Icon from 'react-native-vector-icons/Ionicons';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import SwiperBox from '../components/SwiperBox';
import ScrollNavs from '../components/home/ScrollNavs';
import SixBox from '../components/home/SixBox';
import UI from '../common/UI';
const AnimatedIcon = Animated.createAnimatedComponent(Icon);

const SCROLL_HEIGHT = UI.Size.window.width * UI.Size.homeSwiper.scale - UI.Size.statusBar.height - UI.Size.navBar.height;

const DISTANCE = SCROLL_HEIGHT / 2;

export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      scrollY: new Animated.Value(0)
    };
    if (Platform.OS == 'ios') {
      this.state.scrollY.addListener(this.onScroll.bind(this));
    }
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  componentDidMount() {
    StatusBar.setBarStyle('light-content', false);
    this.barStyleDefault = false;
  }

  componentWillUnmount() {
    this.state.scrollY.removeAllListeners();
  }

  renderBannerRow(item, index) {
    return (
      <Image key={index} source={item.uri}
             style={{
             width:UI.Size.window.width,
             height:UI.Size.window.width * UI.Size.homeSwiper.scale
             }}/>
    )
  }

  renderBanners() {
    return (
      <SwiperBox
        height={UI.Size.window.width * UI.Size.homeSwiper.scale}
        renderRow={this.renderBannerRow.bind(this)}
        source={[
              {uri:require('../images/banner/2.jpg'),id:2},
              {uri:require('../images/banner/3.jpg'),id:3}
             ]}
      />
    )
  }

  renderNavBarBack() {
    const navOpacity = this.state.scrollY.interpolate({
      inputRange: [0, SCROLL_HEIGHT],
      outputRange: [0, 1]
    });
    return <Animated.View
      style={[UI.CommonStyles.home_nav_back,{opacity:navOpacity}]}/>
  }

  renderNavBar() {

    const navTextColor = this.state.scrollY.interpolate({
      inputRange: [0, DISTANCE],
      outputRange: [UI.Colors.white, UI.Colors.grayFont]
    });


    const navSearchTextColor = this.state.scrollY.interpolate({
      inputRange: [0, DISTANCE],
      outputRange: [UI.Colors.white, UI.Colors.grayFont]
    });

    const navTextOpacity = this.state.scrollY.interpolate({
      inputRange: [0, SCROLL_HEIGHT],
      outputRange: [0.8, 1]
    });

    return (
      <View style={UI.CommonStyles.home_nav}>

        <View style={UI.CommonStyles.home_nav_left}>
          <AnimatedIcon
            style={[UI.CommonStyles.home_nav_icon,{color:navTextColor}]}
            name="ios-person-add-outline"
            size={20}
            color={UI.Colors.white}
          />
          <Animated.Text style={[UI.CommonStyles.home_nav_text,{color:navTextColor}]}>登陆</Animated.Text>
        </View>

        <Animated.View style={[UI.CommonStyles.home_nav_search,{opacity:navTextOpacity}]}>
          <AnimatedIcon
            style={[UI.CommonStyles.home_nav_search_icon,{
              color:navSearchTextColor
            }]}
            name="ios-search"
            size={22}
            color={UI.Colors.white}
          />
          <Animated.Text
            style={[UI.CommonStyles.home_nav_search_input,{
                color:navSearchTextColor
            }]}
          >搜索</Animated.Text>
        </Animated.View>

        <View style={UI.CommonStyles.home_nav_right}>
          <AnimatedIcon
            style={[UI.CommonStyles.home_nav_icon,{color:navTextColor}]}
            name="ios-chatbubbles-outline"
            size={20}
            color={UI.Colors.white}

          />
          <Animated.Text style={[UI.CommonStyles.home_nav_text,{color:navTextColor}]}>消息</Animated.Text>
        </View>
      </View>
    )
  }

  onScroll(scrollY) {
    if (scrollY.value > DISTANCE) {
      if (!this.barStyleDefault) {
        StatusBar.setBarStyle('default', false);
      }
      this.barStyleDefault = true;
    } else {
      if (this.barStyleDefault) {
        StatusBar.setBarStyle('light-content', false);
      }
      this.barStyleDefault = false;
    }
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

        <ScrollView
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}]
          )}
        >
          {this.renderBanners()}
          <ScrollNavs navs={navs}/>
          <SixBox title="热门商品" rows={products}/>
          <SixBox title="热门分类" rows={products}/>
          <SixBox title="热门品牌" rows={products}/>
        </ScrollView>
        {this.renderNavBarBack()}
        {this.renderNavBar()}
      </View>
    )
  }
}


