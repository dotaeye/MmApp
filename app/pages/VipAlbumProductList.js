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

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import SwipeCards from 'react-native-swipe-cards';
import UI from '../common/UI';
import NavBar from '../components/NavBar';
import ViewPages from '../components/ViewPages';
import moment from 'moment';
import {getImageUrl} from '../utils';
import Loading from '../components/Loading';
import Button from '../components/Button';
import * as productActions from '../actions/product';
import SwipeCard from '../components/SwipeCard';
import SplashScreen from 'react-native-splash-screen'

class VipAlbumProductList extends Component {

  constructor(props) {
    super(props);
    const cards = [1, 2, 3, 4, 5];
    this.state = {
      cards,
    };
  }

  componentDidMount() {
    SplashScreen.hide();
  }

  _next() {
    const cards = this.state.cards;
    cards.pop();
    this.setState({cards});
  }

  render() {
    const {router}=this.props;
    return (
      <View style={[
        {
          justifyContent: 'flex-start',
          width: UI.Size.window.width,
          height: UI.Size.window.height
        }]}>
        {this.state.cards.map((card, index) => {
          return (
            <View key={card} style={{
              justifyContent: 'flex-start',
              flexDirection: 'column',
              backgroundColor: UI.Colors.transparent,
              height: UI.Size.window.height - this.state.cards.length * 40,
              width: UI.Size.window.width,
              position: 'absolute',
              top: 40 * (this.state.cards.length - index - 1),
              left: 0
            }}>
              <Image style={{
                width: UI.Size.window.width,
                height: UI.Size.window.height - this.state.cards.length * 40,
              }}
                     source={require('../images/products/product.jpg')}/>
              <View style={{height: 40, backgroundColor: UI.Colors.black}}>
                <Text style={{color: UI.Colors.white}}>Cart {this.state.cards.length - index}</Text>
              </View>
            </View>
          )
        })}
        <SwipeCard next={this._next.bind(this)}/>
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


export default connect((state, props) => ({
  product: state.product
}), dispatch => ({
  productActions: bindActionCreators(productActions, dispatch)
}), null, {
  withRef: true
})(VipAlbumProductList);
