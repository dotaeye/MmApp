import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  InteractionManager,
  PixelRatio,
  ScrollView,
  Dimensions
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from '../components/Button';
import Loading from '../components/Loading';
import ViewPages from '../components/ViewPages';
import UI from '../common/UI';
import {getImageUrl} from '../utils';
import * as productActions from '../actions/product';
import * as shopCartActions from '../actions/shopCart';

class VipProductDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.fetchData();
    });
  }

  fetchData() {
    this.props.productActions.productDetail({
      id: this.props.id,
      success: () => {
        this.setDefaultAttribute();
      }
    })
  }


  renderProductSuggest() {
    return (
      <View style={UI.CommonStyles.product_suggest}>
        <View style={UI.CommonStyles.line_wrap}>
          <View style={UI.CommonStyles.line_wrap_line}/>
          <View style={UI.CommonStyles.line_wrap_text}>
            <Icon style={UI.CommonStyles.line_wrap_icon} name='ios-heart' color={UI.Colors.success} size={18}/>
            <Text>为你推荐</Text>
          </View>
          <View style={UI.CommonStyles.line_wrap_line}/>
        </View>
        <View style={UI.CommonStyles.product_suggest_list}>
          <TouchableOpacity
            style={UI.CommonStyles.product_suggest_item}
            activeOpacity={0.75}
          >
            <View style={UI.CommonStyles.product_suggest_item_img_wrap}>
              <Image
                source={require('../images/products/product.jpg')}
                resizeMode="cover"
                style={UI.CommonStyles.product_suggest_item_img}
              />
            </View>
            <View style={UI.CommonStyles.product_suggest_item_text}>
              <Text numberOfLines={2}>新款秋冬棉衣 欧美潮流 pu 皮衣男士棉衣外套皮外套连帽M141236 黑色</Text>
            </View>
            <Text style={UI.CommonStyles.product_suggest_item_price}>￥139.00</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={UI.CommonStyles.product_suggest_item}
            activeOpacity={0.75}
          >
            <View style={UI.CommonStyles.product_suggest_item_img_wrap}>
              <Image
                source={require('../images/products/product.jpg')}
                resizeMode="cover"
                style={UI.CommonStyles.product_suggest_item_img}
              />
            </View>
            <View style={UI.CommonStyles.product_suggest_item_text}>
              <Text numberOfLines={2}>新款秋冬棉衣 欧美潮流 pu 皮衣男士棉衣外套皮外套连帽M141236 黑色</Text>
            </View>

            <Text style={UI.CommonStyles.product_suggest_item_price}>￥139.00</Text>

          </TouchableOpacity>
          <TouchableOpacity
            style={UI.CommonStyles.product_suggest_item}
            activeOpacity={0.75}
          >
            <View style={UI.CommonStyles.product_suggest_item_img_wrap}>
              <Image
                source={require('../images/products/product.jpg')}
                resizeMode="cover"
                style={UI.CommonStyles.product_suggest_item_img}
              />
            </View>

            <View style={UI.CommonStyles.product_suggest_item_text}>
              <Text numberOfLines={2}>新款秋冬棉衣 欧美潮流 pu 皮衣男士棉衣外套皮外套连帽M141236 黑色</Text>
            </View>
            <Text style={UI.CommonStyles.product_suggest_item_price}>￥139.00</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={UI.CommonStyles.product_suggest_item}
            activeOpacity={0.75}
          >
            <View style={UI.CommonStyles.product_suggest_item_img_wrap}>
              <Image
                source={require('../images/products/product.jpg')}
                resizeMode="cover"
                style={UI.CommonStyles.product_suggest_item_img}
              />
            </View>
            <View style={UI.CommonStyles.product_suggest_item_text}>
              <Text numberOfLines={2}>新款秋冬棉衣 欧美潮流 pu 皮衣男士棉衣外套皮外套连帽M141236 黑色</Text>
            </View>
            <Text style={UI.CommonStyles.product_suggest_item_price}>￥139.00</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  render() {
    const {router, entity}=this.props;
    if (!entity) return <Loading/>;
    return (
      <View style={styles.container}>
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
  entity: state.product.entity,
  user: state.user,
  shopCart: state.shopCart
}), dispatch => ({
  productActions: bindActionCreators(productActions, dispatch),
  shopCartActions: bindActionCreators(shopCartActions, dispatch)
}), null, {
  withRef: true
})(VipProductDetail);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFF'
  }
});