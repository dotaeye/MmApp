import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  PixelRatio,
  ScrollView,
  Dimensions
} from 'react-native';
import {connect} from 'react-redux';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomTabBar from '../components/CustomTabBar';
import Button from '../components/Button';
import SwiperBox from '../components/SwiperBox';
import Modal from 'react-native-modalbox';
import ImageBox from '../components/ImageBox';
import CheckBoxList from '../components/CheckBoxList';
import Stepper from '../components/Stepper';
import UI from '../common/UI';

class Product extends Component {

  renderBannerRow(item, index) {
    return (
      <Image
        key={index}
        source={item.uri}
        style={{
          width:UI.Size.window.width,
          height:UI.Size.window.width*UI.Size.homeSwiper.scale
        }}/>
    )
  }

  renderProduct() {
    return (
      <ScrollView
        key={1}
        tabLabel='商品'
        style={UI.CommonStyles.product_tab}>
        <SwiperBox
          height={UI.Size.window.width*UI.Size.homeSwiper.scale}
          renderRow={this.renderBannerRow.bind(this)}
          source={[
              {uri:require('../images/banner/1.jpg'),id:1},
              {uri:require('../images/banner/2.jpg'),id:2},
              {uri:require('../images/banner/3.jpg'),id:3}
              ]}
        />
        <View style={UI.CommonStyles.product_title}>
          <Text>新款秋冬棉衣 欧美潮流 pu 皮衣男士棉衣外套皮外套连帽M141236 黑色</Text>
          <Text style={UI.CommonStyles.product_price}>￥
            <Text style={UI.CommonStyles.product_price_number}>298.00</Text>
          </Text>
        </View>

        <TouchableOpacity
          style={UI.CommonStyles.product_select}
          onPress={()=>{
                this.modal.open()
              }}
        >
          <Text style={UI.CommonStyles.product_select_label}>已选</Text>
          <Text style={UI.CommonStyles.product_select_text}>黑色、L 1件</Text>
          <TouchableOpacity style={UI.CommonStyles.product_select_button}>
            <Icon name='ios-more' size={24}/>
          </TouchableOpacity>
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
        {this.renderProductSuggest()}
      </ScrollView>
    )
  }

  renderProductSuggest(){
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
    return (
      <ScrollView
        key={2}
        tabLabel='详情'
        style={UI.CommonStyles.product_tab}>
        <ImageBox
          style={UI.CommonStyles.product_details_img}
          width={UI.Size.window.width}
          source={{uri:'http://img10.360buyimg.com/imgzone/jfs/t2341/28/1801594863/78423/643e2593/56dbceb8Nfdaaea82.jpg'}}
        />
        <ImageBox
          style={UI.CommonStyles.product_details_img}
          width={UI.Size.window.width}
          source={{uri:'http://img10.360buyimg.com/imgzone/jfs/t2575/79/1447561600/75420/d4060786/56dbceb8N63592aad.jpg'}}
        />
        <ImageBox
          style={UI.CommonStyles.product_details_img}
          width={UI.Size.window.width}
          source={{uri:'http://img10.360buyimg.com/imgzone/jfs/t2326/105/2468346852/265503/4551709c/56dbceb9Nc81f3a33.jpg'}}
        />
      </ScrollView>
    )
  }

  renderModal() {
    return (
      <Modal
        ref={ref=>this.modal=ref}
        style={UI.CommonStyles.product_modal}
        swipeToClose={false}
        position="bottom"
      >

        <View style={UI.CommonStyles.product_modal_header}>

          <Text style={UI.CommonStyles.product_modal_header_price}>￥298.00</Text>
          <Text style={UI.CommonStyles.product_modal_header_num}>商品编号:2519522</Text>
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
            source={require('../images/products/product.jpg')}
            resizeMode="cover"
            style={UI.CommonStyles.product_focus_img}
          />
        </View>

        <ScrollView>
          <View style={UI.CommonStyles.product_attr_box}>
            <Text style={UI.CommonStyles.product_attr_label}>颜色</Text>
            <CheckBoxList
              ref="attribute"
              value={1}
              options={[{
                  label:'红色',
                  value:1
                },{
                  label:'黄色',
                  value:2
                },{
                  label:'蓝色',
                  value:3
                },{
                  label:'黑色',
                  value:4
                },{
                  label:'特别长的啊舍得离开家啊收到',
                  value:11
                },{
                  label:'特别长的啊舍得离开家啊收到',
                  value:22
                },{
                  label:'看不见',
                  value:33
                }]}
            />
          </View>
          <View style={UI.CommonStyles.product_number_box}>
            <Text style={UI.CommonStyles.product_number_label}>数量</Text>
            <Stepper
              value={1}
              max={3}/>
          </View>
        </ScrollView>

        <TouchableOpacity style={UI.CommonStyles.product_modal_button}>
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
            <Text style={UI.CommonStyles.product_tool_price_text_number}>298.00</Text></Text>
        </View>
        <View style={UI.CommonStyles.product_tool_car}>
          <Icon name="ios-cart-outline" size={24}/>
        </View>
        <View style={UI.CommonStyles.product_tool_add}>
          <Text style={UI.CommonStyles.product_tool_add_text}>加入购物车</Text>
        </View>
        <View style={UI.CommonStyles.product_tool_checkout}>
          <Text style={UI.CommonStyles.product_tool_checkout_text}>立即支付</Text>
        </View>
      </View>
    )
  }

  render() {
    const {router}=this.props;
    return (
      <View style={styles.container}>
        <ScrollableTabView
          renderTabBar={() =>
              <CustomTabBar
                style={{height:44}}
                tabStyle={{ paddingBottom: 0 }}
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
        <View style={{position:'absolute',top:0,left:0}}>
          <Button
            iconName='ios-arrow-back'
            iconSize={24}
            iconColor='black'
            style={{marginRight:10}}
            position="Left"
            backgroundColor="transparent"
            onPress={()=>{
              console.log('....LeftClick')
            }}/>
        </View>
        {this.renderFooter()}
        {this.renderModal()}
      </View>
    )
  }
}

export default connect((state, props) => ({}), dispatch => ({}), null, {
  withRef: true
})(Product);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFF'
  }
});