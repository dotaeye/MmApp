import React, {Component} from 'react';
import {
  Dimensions,
  Image,
  InteractionManager,
  ScrollView,
  ListView,
  RefreshControl,
  TouchableOpacity,
  View,
  Text,
  StatusBar,
  TextInput,
  PanResponder
} from 'react-native';
import {List, Radio} from 'antd-mobile';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import UI from '../common/UI';
import NavBar from '../components/NavBar'
import FadePanel from '../components/FadePanel';
import SlidePanel from '../components/SlidePanel';
import CheckBoxList from '../components/CheckBoxList'
import Spinner from '../components/Spinner';
import Loading from '../components/Loading';
import EndTag from '../components/EndTag';
import ViewPages from '../components/ViewPages';
import * as productActions from '../actions/product';
import {getImageUrl} from '../utils'

const RadioItem = Radio.RadioItem;
const pageSize = 20;

class ProductList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      categoryId: props.categoryId,
      keywords: props.keywords,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      })
    };
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.canLoadMore = false;
    this.prevLoadMoreTime = 0;
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.fetchData();
    });
  }

  fetchData(options) {
    const {productActions}=this.props;
    const {categoryId, keywords}=this.state;
    const params = Object.assign({}, {
      pageIndex: 0,
      pageSize,
      categoryId,
      keywords
    }, options);
    productActions.searchProduct(params)
  }

  onScroll() {
    if (!this.canLoadMore) {
      this.canLoadMore = true;
    }
  }

  onEndReached() {
    const {product}=this.props;
    const now = Date.parse(new Date()) / 1000;
    if (product.hasMore && this.canLoadMore && now - this.prevLoadMoreTime > 2) {
      this.fetchData({
        pageIndex: product.pageIndex + 1,
        loadMore: true
      });
      this.prevLoadMoreTime = Date.parse(new Date()) / 1000;
      this.canLoadMore = false;
    }
  }

  onRefresh() {
    this.canLoadMore = false;
    this.fetchData({
      refreshing: true
    });
  }

  renderSearchView() {
    const {router}=this.props;
    return (
      <TouchableOpacity
        style={UI.CommonStyles.search_box}
        onPress={()=>{
          router.push(ViewPages.search());
        }}
      >
        <Icon
          style={UI.CommonStyles.search_box_icon}
          name="ios-search"
          size={16}
          color={UI.Colors.grayFont}
        />
        <Text
          style={[UI.CommonStyles.search_box_input,UI.CommonStyles.search_box_input_empty]}
        >搜索</Text>
      </TouchableOpacity>
    )
  }

  renderListRow(product) {
    return (
      <View style={UI.CommonStyles.product_list_cell}>
        <Image source={{uri:getImageUrl(product.imageUrl)}} style={UI.CommonStyles.product_list_img}/>
        <Text
          style={UI.CommonStyles.product_list_name}
          numberOfLines={2}
        >{product.name}</Text>
        <Text style={UI.CommonStyles.product_list_price}>￥{product.price}</Text>
      </View>
    )
  }

  renderListFooter() {
    const {product}=this.props;
    if (product.loadMore) {
      return <Spinner/>;
    }
    if (product.refreshing !== true && product.hasMore !== true && product.list.products.length) {
      return <EndTag/>;
    }
  }


  renderToolBar() {

    return (
      <View style={UI.CommonStyles.list_bar}>
        <TouchableOpacity
          style={UI.CommonStyles.list_bar_item}
          onPress={()=>{
              this.panel.open();
            }}
        >
          <Text>综合</Text>
          <Icon
            style={UI.CommonStyles.list_bar_item_icon}
            name="md-arrow-dropdown"
            size={12}
          />
        </TouchableOpacity>
        <View style={UI.CommonStyles.list_bar_item}>
          <Text>销量</Text>
        </View>
        <View style={UI.CommonStyles.list_bar_item}>
          <Text>价格</Text>
        </View>
        <TouchableOpacity
          style={UI.CommonStyles.list_bar_item}
          onPress={()=>{
              this.slide.open();
            }}
        >
          <Text>筛选</Text>
          <Icon
            style={UI.CommonStyles.list_bar_item_icon}
            name="ios-funnel-outline"
            size={12}
          />
        </TouchableOpacity>
      </View>
    )

  }

  renderOrder() {
    return (
      <FadePanel
        ref={ref=>this.panel=ref}
        top={UI.Size.navBar.height+UI.Size.statusBar.height+40}
      >
        <List >
          <RadioItem
            style={{minHeight:40}}
            checked={true}
          >
            综合排序
          </RadioItem>
          <RadioItem
            style={{minHeight:40}}
          >
            新品优先
          </RadioItem>
        </List>
      </FadePanel>
    )
  }

  renderFilter() {
    return (
      <SlidePanel
        ref={ref=>this.slide=ref}
        style={{
            top:0,
            width:UI.Size.window.width-60,
            height:UI.Size.window.height,
            backgroundColor:UI.Colors.white
          }}
        position={'right'}
        offset={UI.Size.window.width-60}
      >
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
      </SlidePanel>
    )
  }

  render() {
    const {router, product}=this.props;
    const nav = {
      Left: [{
        source: require('../images/icon/back@2x.png'),
        style: {
          width: 13,
          height: 15
        },
        onPress: ()=> {
          router.pop();
        }
      }],
      Right: [{
        source: require('../images/icon/shopCar@2x.png'),
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
      <View style={[UI.CommonStyles.container,{backgroundColor:UI.Colors.gray}]}>
        <NavBar options={nav}>
          {this.renderSearchView()}
        </NavBar>

        {this.renderToolBar()}
        {this.renderOrder()}
        {this.renderFilter()}

        {!product.loaded ? (
          <Loading/>
        ) : (
          <ListView
            ref={(view)=> this.listView = view }
            removeClippedSubviews
            enableEmptySections={ true }
            onEndReachedThreshold={ 30 }
            initialListSize={ 10 }
            pageSize={ 10 }
            pagingEnabled={ false }
            scrollRenderAheadDistance={ 230 }
            onScroll={this.onScroll.bind(this)}
            contentContainerStyle={[UI.CommonStyles.wrap_list]}
            dataSource={ this.state.dataSource.cloneWithRows(product.list.products) }
            renderRow={this.renderListRow.bind(this)}
            renderFooter={this.renderListFooter.bind(this)}
            onEndReached={this.onEndReached.bind(this)}
            refreshControl={
            <RefreshControl
              refreshing={product.refreshing}
              onRefresh={this.onRefresh.bind(this)}
            />
           }
          />
        )}
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
})(ProductList);
