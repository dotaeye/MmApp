import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity
} from 'react-native';

import _ from 'lodash';
import Icon from 'react-native-vector-icons/Ionicons';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import UI from '../../common/UI';
import NavBar from '../NavBar';

class Home extends Component {

  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  onParallaxViewScroll(e) {
    if (e.nativeEvent.contentOffset.y + e.nativeEvent.layoutMeasurement.height + 20 > e.nativeEvent.contentSize.height) {
      if (!this.overThreshold) {
        this.props.onListEndReached && this.props.onListEndReached();
        this.overThreshold = true;
      }
    } else {
      if (this.overThreshold) {
        this.overThreshold = false
      }
    }
  }

  renderParallaxScrollComponent() {
    return (
      <ScrollView
        refreshControl={ this.props.refreshControl }
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
      </ScrollView>
    )
  }

  renderParallaxBackground() {
    return (
      <View>

      </View>
    )
  }

  renderParallaxForeground() {
    return (
      <View style={{
        width:UI.Size.window.width,
        height:UI.Size.window.width*UI.Size.homeSwiper.scale
      }}>
        {this.props.renderParallaxForeground()}
        <View
          style={{
          width:30,
          height:30,
          borderRadius:15,
          borderColor:UI.Colors.gray,
          borderWidth:UI.Size.border.size,
          position:'absolute',
          backgroundColor:UI.Colors.danger,
          top:10+UI.Size.statusBar.height,
          left:10,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Icon
            name='ios-search'
            size={12}
          />
        </View>
      </View>
    )
  }

  renderSearchView() {
    return (
      <View style={UI.CommonStyles.search_box}>
        <Icon
          style={UI.CommonStyles.search_box_icon}
          name="ios-search"
          size={16}
          color={UI.Colors.grayFont}
        />
        <TextInput
          underlineColorAndroid={'transparent'}
          autoCapitalize={'none'}
          autoCorrect={false}
          placeholder="搜索"
          style={UI.CommonStyles.search_box_input}
        />
      </View>
    )
  }

  renderParallaxStickyHeader() {

    const nav = {
      Left: [{
        source: require('../../images/icon/back@2x.png'),
        style: {
          width: 13,
          height: 15
        },
        onPress: ()=> {
          router.pop();
        }
      }],
      Right: [{
        source: require('../../images/icon/shopCar@2x.png'),
        style: {
          width: 20,
          height: 20
        },
        onPress: ()=> {
          this.panel.open();
          // router.push(ViewPage.product());
        }
      }]
    };
    return (
      <NavBar
        options={nav}
      >
        {this.renderSearchView()}
      </NavBar>
    );
  }

  render() {
    return (
      <ParallaxScrollView
        ref={(view)=>{this.parallaxView = view}}
        headerBackgroundColor={UI.Colors.transparent}
        parallaxHeaderHeight={ UI.Size.window.width*UI.Size.homeSwiper.scale }
        stickyHeaderHeight={ UI.Size.navBar.height+UI.Size.statusBar.height }
        onScroll={(e) => this.onParallaxViewScroll(e) }
        renderScrollComponent={()=> this.renderParallaxScrollComponent()}
        renderForeground={() => this.renderParallaxForeground()}
        renderStickyHeader={() => this.renderParallaxStickyHeader()}>
        { this.props.children }
      </ParallaxScrollView>
    );
  }
}


export default Home;