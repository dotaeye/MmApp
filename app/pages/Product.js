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
import ScrollableTabView from 'react-native-scrollable-tab-view';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomTabBar from '../components/CustomTabBar';
import Button from '../components/Button';
import Loading from '../components/Loading';
import SwiperBox from '../components/SwiperBox';
import Modal from 'react-native-modalbox';
import ImageBox from '../components/ImageBox';
import CheckBoxList from '../components/CheckBoxList';
import Stepper from '../components/Stepper';
import ViewPages from '../components/ViewPages';
import UI from '../common/UI';
import {getImageUrl} from '../utils';
import * as productActions from '../actions/product';
import * as shopCartActions from '../actions/shopCart';

class Product extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedId: null,
      number: 1,
      attributeValues: {}
    };
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
      success: ()=> {
        this.setDefaultAttribute();
      }
    })
  }

  setDefaultAttribute() {
    const {entity}=this.props;
    const attributeValues = {};
    entity.productAttributes.forEach(item=> {
      attributeValues[item.id] = item.values[0].id;
    });
    this.setState({
      attributeValues
    });
  }

  /**
   * 获取选中属性的数组
   * @returns {Array}
   */
  getSelectedAttribute() {
    const {entity}=this.props;
    const {attributeValues}=this.state;
    const selectAttributes = [];
    entity.productAttributes.forEach(item=> {
      let attributeValue;
      //当有选择属性并且,有选中的属性
      if (attributeValues[item.id]) {
        attributeValue = item.values.find(x=>x.id == attributeValues[item.id]);
      } else {
        attributeValue = item.values[0];
      }
      selectAttributes.push(attributeValue);
    });
    return selectAttributes;
  }

  /***
   * 获取产品总价,需要算出选中的属性
   * @returns {number}
   */
  getPrice() {
    const {number}=this.state;
    return this.getUnitPrice() * number;
  }

  /***
   * 获取产品单价,需要算出选中的属性
   * @returns {number}
   */
  getUnitPrice() {
    const {user, entity}=this.props;
    let price = (user.user && user.user.userRoleId > 2 ) ? entity.vipPrice : entity.price;
    const selectedAttribute = this.getSelectedAttribute();
    selectedAttribute.forEach(attibute=> {
      price += attibute.priceAdjustment;
    });
    return price;
  }

  /**
   * 获取选中产品属性的名字的数组
   * @returns {Array}
   */
  getAttributeValues() {
    const selectedAttribute = this.getSelectedAttribute();
    return selectedAttribute.map(x=>x.name);
  }

  onChangeNum(number) {
    this.setState({
      number
    })
  }

  onAttributeChange() {
    const {entity}=this.props;
    const attributeValues = {};
    entity.productAttributes.forEach(attribute=> {
      attributeValues[attribute.id] = this.refs[`attribute_${attribute.id}`].getValue();
    });
    this.setState({
      attributeValues
    })
  }

  addToShopCart() {
    const {entity, shopCartActions, router, user}=this.props;
    if (!user.user) {
      router.push(ViewPages.login());
    } else {
      const selectedAttributes = this.getSelectedAttribute();
      const formData = {
        productId: entity.id,
        name: entity.name,
        imageUrl: entity.imageUrl.split(',')[0],
        ownerId: entity.ownerId,
        unitPrice: this.getUnitPrice(),
        quantity: this.state.number,
        price: this.getPrice(),
        attributesXml: selectedAttributes.map(x=>x.name).join(' '),
        attributesIds: selectedAttributes.map(x=>x.id).join(',')
      };
      shopCartActions.addShopCart({
        data: formData,
        success: ()=> {
          router.push(ViewPages.shopCart());
        }
      })
    }
  }

  renderBannerRow(item, index) {
    return (
      <Image
        key={index}
        source={{uri:item.uri}}
        style={{
          width:UI.Size.window.width,
          height:UI.Size.window.width*UI.Size.homeSwiper.scale
        }}/>
    )
  }

  renderProduct() {
    const {entity}=this.props;
    const imageUrls = entity.imageUrl.split(',').map((uri, index)=> {
      return {
        uri: getImageUrl(uri, {mid: true}),
        id: index
      }
    });
    return (
      <ScrollView
        key={1}
        tabLabel='商品'
        style={UI.CommonStyles.product_tab}>
        <SwiperBox
          height={UI.Size.window.width*UI.Size.homeSwiper.scale}
          renderRow={this.renderBannerRow.bind(this)}
          source={imageUrls}
        />
        <View style={UI.CommonStyles.product_title}>
          <Text>{entity.name}</Text>
          <Text style={UI.CommonStyles.product_price}>￥
            <Text style={UI.CommonStyles.product_price_number}>{this.getUnitPrice()}</Text>
          </Text>
        </View>
        <TouchableOpacity
          style={UI.CommonStyles.product_select}
          onPress={()=>{
            this.modal.open()
          }}
        >
          <Text style={UI.CommonStyles.product_select_label}>已选</Text>
          <Text
            style={UI.CommonStyles.product_select_text}>{this.getAttributeValues().join('、')} {this.state.number}件</Text>
          <View style={UI.CommonStyles.product_select_button}>
            <Icon name='ios-more' size={24}/>
          </View>
        </TouchableOpacity>
        <View style={UI.CommonStyles.product_desc}>
          <View style={UI.CommonStyles.product_desc_row}>
            <View style={UI.CommonStyles.product_desc_row_item}>
              <Icon style={UI.CommonStyles.product_desc_row_item_icon} name='ios-checkmark-circle-outline'
                    color={UI.Colors.success} size={16}/>
              <Text style={UI.CommonStyles.product_desc_row_item_text}>原装正品</Text>
            </View>
            <View style={UI.CommonStyles.product_desc_row_item}>
              <Icon style={UI.CommonStyles.product_desc_row_item_icon} name='ios-checkmark-circle-outline'
                    color={UI.Colors.success} size={16}/>
              <Text style={UI.CommonStyles.product_desc_row_item_text}>渠道认证</Text>
            </View>
            <View style={UI.CommonStyles.product_desc_row_item}>
              <Icon style={UI.CommonStyles.product_desc_row_item_icon} name='ios-checkmark-circle-outline'
                    color={UI.Colors.success} size={16}/>
              <Text style={UI.CommonStyles.product_desc_row_item_text}>售后保障</Text>
            </View>
          </View>
          <View style={UI.CommonStyles.product_desc_row}>
            <View style={UI.CommonStyles.product_desc_row_item}>
              <Icon style={UI.CommonStyles.product_desc_row_item_icon} name='ios-car' color={UI.Colors.success}
                    size={16}/>
              <Text style={UI.CommonStyles.product_desc_row_item_text}>支持配送</Text>
            </View>
            <View style={UI.CommonStyles.product_desc_row_item}>
              <Icon style={UI.CommonStyles.product_desc_row_item_icon} name='ios-briefcase'
                    color={UI.Colors.success} size={16}/>
              <Text style={UI.CommonStyles.product_desc_row_item_text}>支持货到付款</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    )
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

  renderDetail() {
    const {entity}=this.props;
    return (
      <ScrollView
        key={2}
        tabLabel='详情'
        style={UI.CommonStyles.product_tab}>
        {entity.detailUrl.split(',').map((url, index)=> {
          return (
            <ImageBox
              key={index}
              style={UI.CommonStyles.product_details_img}
              width={UI.Size.window.width}
              source={{uri:getImageUrl(url,{max:true})}}
            />
          )
        })}
      </ScrollView>
    )
  }

  renderModal() {
    const {entity}=this.props;
    const {attributeValues}  =this.state;
    return (
      <Modal
        ref={ref=>this.modal=ref}
        style={UI.CommonStyles.product_modal}
        swipeToClose={false}
        position="bottom"
      >
        <View style={UI.CommonStyles.product_modal_header}>
          <Text style={UI.CommonStyles.product_modal_header_price}>￥ {this.getUnitPrice()}</Text>
          <Text style={UI.CommonStyles.product_modal_header_num}>商品编号:{entity.id}</Text>
          <TouchableOpacity
            style={UI.CommonStyles.product_modal_close}
            onPress={()=>{
                this.modal.close();
              }}
          >
            <Icon name="ios-close" size={22} color={UI.Colors.black}/>
          </TouchableOpacity>
        </View>

        <View style={UI.CommonStyles.product_focus_box}>
          <Image
            source={{uri:getImageUrl(entity.imageUrl.split(',')[0])}}
            resizeMode="cover"
            style={UI.CommonStyles.product_focus_img}
          />
        </View>

        <ScrollView>
          <View style={UI.CommonStyles.product_attr_box}>
            {entity.productAttributes.map((item, index)=> {
              let defaultValues;
              const productValues = item.values.map((value, vIndex)=> {
                if (attributeValues[item.id]) {
                  defaultValues = attributeValues[item.id];
                } else if (vIndex == 0) {
                  defaultValues = value.id
                }
                return {
                  label: value.name,
                  value: value.id
                }
              });
              return (
                <View key={index}
                      style={{
                      marginBottom:20
                    }}>
                  <Text>{item.name}</Text>
                  <CheckBoxList
                    ref={`attribute_${item.id}`}
                    value={defaultValues}
                    options={productValues}
                    onChange={this.onAttributeChange.bind(this)}
                  />
                </View>
              )
            })}
          </View>
          <View style={UI.CommonStyles.product_number_box}>
            <Text style={UI.CommonStyles.product_number_label}>数量</Text>
            <Stepper
              onChange={this.onChangeNum.bind(this)}
              value={this.state.number}
              max={30}/>
          </View>
        </ScrollView>
        <TouchableOpacity
          style={UI.CommonStyles.product_modal_button}
          onPress={this.addToShopCart.bind(this)}
        >
          <Text style={UI.CommonStyles.product_modal_button_text}>加入购物车</Text>
        </TouchableOpacity>
      </Modal>
    )
  }

  renderFooter() {
    return (
      <View style={UI.CommonStyles.product_tool}>
        <View style={UI.CommonStyles.product_tool_price}>
          <Text style={UI.CommonStyles.product_tool_price_text}>￥
            <Text style={UI.CommonStyles.product_tool_price_text_number}>{this.getPrice()}</Text></Text>
        </View>
        <View style={UI.CommonStyles.product_tool_car}>
          <Icon name="ios-cart-outline" size={24}/>
        </View>
        <TouchableOpacity
          style={UI.CommonStyles.product_tool_add}
          onPress={this.addToShopCart.bind(this)}
        >
          <Text style={UI.CommonStyles.product_tool_add_text}>加入购物车</Text>
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    const {router, entity}=this.props;
    if (!entity) return <Loading/>;
    return (
      <View style={styles.container}>
        <ScrollableTabView
          style={{paddingTop:UI.Size.statusBar.height}}
          renderTabBar={() =>
              <CustomTabBar
                style={{height:44}}
                tabStyle={{ paddingBottom: 0}}
                textStyle={{ fontSize: 16 }}
                tabBarContainerWidth={200}
              />
            }
          tabBarBackgroundColor="#fcfcfc"
          tabBarUnderlineStyle={{ backgroundColor: 'black', height: 2 }}
          tabBarActiveTextColor="black"
          tabBarInactiveTextColor="black"
        >

          {this.renderProduct()}
          {this.renderDetail()}
        </ScrollableTabView>
        <View style={{position:'absolute',top:UI.Size.statusBar.height,left:0}}>
          <Button
            iconName='ios-arrow-back'
            iconSize={24}
            iconColor='black'
            style={{marginRight:10}}
            position="Left"
            backgroundColor="transparent"
            onPress={()=>{
              router.pop()
            }}/>
        </View>
        {this.renderFooter()}
        {this.renderModal()}
      </View>
    )
  }
}

export default connect((state, props) => ({
  entity: state.product.entity,
  user: state.user
}), dispatch => ({
  productActions: bindActionCreators(productActions, dispatch),
  shopCartActions: bindActionCreators(shopCartActions, dispatch)
}), null, {
  withRef: true
})(Product);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFF'
  }
});