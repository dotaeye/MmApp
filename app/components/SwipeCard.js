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
import SwipeCards from 'react-native-swipe-cards';
import Icon from 'react-native-vector-icons/Ionicons';
import UI from '../common/UI';


class SwipeCard extends Component {
  constructor() {
    super();
    const simgs = [1, 2, 3, 4, 5];
    const cards = simgs.map(function (elem, index) {
      return {
        index,
        id: "sc" + index,
        img: simgs[4 - index],
        top: index * 40,
        width: UI.Size.window.width,
      }
    });

    this.state = {
      cards,
    };
  }

  handleYup() {
    this.props.next();
  }

  handleNope() {
    this.props.next()
  }

  renderCard(card) {
    return (
      <View key={card.id} style={{
        justifyContent: 'flex-start',
        flexDirection: 'column',
        backgroundColor: UI.Colors.transparent,
        height: UI.Size.window.height - this.state.cards.length * 40,
        width: UI.Size.window.width,
        position: 'absolute',
        left: 0,
        top: 0
      }}>
        <Image style={{
          width: UI.Size.window.width,
          height: UI.Size.window.height - this.state.cards.length * 40,
        }}
               source={require('../images/products/product.jpg')}/>
        <View style={{height: 40, backgroundColor: UI.Colors.black}}>
          <Text style={{color: UI.Colors.white}}>Cart {card.index+1}</Text>
        </View>
      </View>
    )
  }

  render() {
    return (
      <SwipeCards
        containerStyle={{flex: 1}}
        cards={this.state.cards}
        renderCard={this.renderCard.bind(this)}
        handleYup={() => this.handleYup()}
        handleNope={() => this.handleNope()}
        showYup={false}
        showNope={false}
      />
    )
  }
}

export default SwipeCard;