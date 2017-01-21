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
import Icon from 'react-native-vector-icons/Ionicons';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import SwiperBox from '../components/SwiperBox';
import ScrollNavs from '../components/home/scrollNavs';
import SixBox from '../components/home/SixBox';
import UI from '../common/UI';
import {getImageUrl, isVip} from '../utils';
import SplashScreen from 'react-native-splash-screen'
import Loading from '../components/Loading';
import ViewPages from '../components/ViewPages';


const AnimatedIcon = Animated.createAnimatedComponent(Icon);
const SCROLL_HEIGHT = UI.Size.window.width * UI.Size.homeSwiper.scale - UI.Size.statusBar.height - UI.Size.navBar.height;
const DISTANCE = SCROLL_HEIGHT / 2;

export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      scrollY: new Animated.Value(0)
    };
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  componentDidMount() {
    this.props.homeActions.getHomeList({
      success: this.onLoad.bind(this)
    });
  }

  onLoad() {
    SplashScreen.hide();
  }

  onCategoryPress(categoryId) {
    this.props.router.push(ViewPages.list(), {
      categoryId
    })
  }

  onManufacturePress(manufactureId) {
    this.props.router.push(ViewPages.list(), {
      manufactureId
    })
  }

  onNavPress() {
    const {router, user}=this.props;
    if (isVip(user)) {
      router.push(ViewPages.vipProduct());
    } else {
      router.push(ViewPages.Topic());
    }
  }

  renderBannerRow(item, index) {
    return (
      <Image
        key={index} source={{uri: item.uri}}
        style={{width: UI.Size.window.width, height: UI.Size.window.width * UI.Size.homeSwiper.scale}}/>
    )
  }

  renderBanners(banners) {
    const sources = banners.map(x => {
      return {
        uri: getImageUrl(x.imageUrl),
        id: x.id,
        nativeRoute: x.nativeRoute,
        param: x.url
      }
    });
    return (
      <SwiperBox
        height={UI.Size.window.width * UI.Size.homeSwiper.scale}
        autoplay={true}
        renderRow={this.renderBannerRow.bind(this)}
        source={sources}
      />
    )
  }

  renderNavBarBack() {
    const navOpacity = this.state.scrollY.interpolate({
      inputRange: [0, SCROLL_HEIGHT],
      outputRange: [0, 1]
    });
    return <Animated.View
      style={[UI.CommonStyles.home_nav_back, {opacity: navOpacity}]}/>
  }

  renderNavBar() {
    const navSearchTextColor = this.state.scrollY.interpolate({
      inputRange: [0, DISTANCE],
      outputRange: [UI.Colors.white, UI.Colors.grayFont]
    });
    const navTextOpacity = this.state.scrollY.interpolate({
      inputRange: [0, SCROLL_HEIGHT],
      outputRange: [0.8, 1]
    });
    return (
      <Animated.View style={[UI.CommonStyles.home_nav]}>
        <Animated.View style={[UI.CommonStyles.home_nav_search, {opacity: navTextOpacity, marginHorizontal: 20}]}>
          <TouchableOpacity style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center'
          }} onPress={() => {
            this.props.router.push(ViewPages.search())
          }}>
            <AnimatedIcon
              style={[UI.CommonStyles.home_nav_search_icon, {color: navSearchTextColor}]}
              name="ios-search"
              size={22}
              color={UI.Colors.white}
            />
            <Animated.Text
              style={[UI.CommonStyles.home_nav_search_input, {
                color: navSearchTextColor
              }]}
            >搜索</Animated.Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View >
    )
  }

  render() {
    if (!this.props.home.loaded) {
      return <Loading/>;
    }
    const {
      banners,
      hotCategories,
      hotManufacturers
    }=this.props.home.list;

    const navs = [
      {uri: require('../images/scrollNavs/shouye_08.png'), id: 1},
      {uri: require('../images/scrollNavs/shouye_09.png'), id: 2},
      {uri: require('../images/scrollNavs/shouye_10.png'), id: 3},
      {uri: require('../images/scrollNavs/shouye_11.png'), id: 4}];
    return (
      <View style={[UI.CommonStyles.container, {backgroundColor: UI.Colors.gray}]}>
        <ScrollView
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}]
          )}
        >
          {this.renderBanners(banners)}
          <ScrollNavs
            navs={navs}
            onNavPress={this.onNavPress.bind(this)}
          />
          <SixBox
            title="热门分类"
            rows={hotCategories}
            onItemPress={this.onCategoryPress.bind(this)}
          />
          <SixBox
            title="热门品牌"
            rows={hotManufacturers}
            onItemPress={this.onManufacturePress.bind(this)}
          />
        </ScrollView>
        {this.renderNavBarBack()}
        {this.renderNavBar()}
      </View>
    )
  }
}


