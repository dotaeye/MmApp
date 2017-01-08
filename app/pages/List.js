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
import {sortStatus} from '../common/sortStatus';

const pageSize = 20;

class ProductList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      categoryId: props.categoryId,
      orderBy: sortStatus.Position,
      keywords: props.keywords,
      carId: props.carId,
      specs: {},
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
    const {categoryId, keywords, orderBy, carId}=this.state;
    const params = Object.assign({}, {
      pageIndex: 0,
      pageSize,
      categoryId,
      keywords,
      orderBy,
      carId,
      specs: this.getSpecs()
    }, options);
    productActions.searchProduct(params)
  }

  getSpecs() {
    const {specs}=this.state;
    const {filteredItems}=this.props.product.list;
    const specsAttr = [];
    filteredItems.forEach(item => {
      if (specs[item.specificationAttributeId]) {
        specsAttr.push(specs[item.specificationAttributeId]);
      }
    });
    return specsAttr.join(',');
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

  onResetFilter() {
    const {filteredItems}=this.props.product.list;
    filteredItems.forEach(item => {
      this.refs[`attribute_${item.specificationAttributeId}`].reset();
    });
    this.setState({
      specs: {}
    })
  }

  onFilter() {
    this.slide.close();
    InteractionManager.runAfterInteractions(() => {
      this.fetchData({
        specs: this.getSpecs()
      });
    });
  }

  onOrderBy(orderBy) {
    if (this.state.orderBy !== orderBy) {
      if ([sortStatus.CreatedOn, sortStatus.Position].includes(orderBy)) {
        this.panel.close();
      }
      InteractionManager.runAfterInteractions(() => {
        this.setState({
          orderBy
        }, () => {
          this.fetchData({
            pageIndex: 0,
            orderBy
          });
        })
      });
    }
  }

  onSpecsChange() {
    const {filteredItems}=this.props.product.list;
    const specs = {};
    filteredItems.forEach(item => {
      specs[item.specificationAttributeId] = this.refs[`attribute_${item.specificationAttributeId}`].getValue();
    });
    this.setState({
      specs
    })
  }

  renderSearchView() {
    const {router}=this.props;
    return (
      <TouchableOpacity
        style={UI.CommonStyles.search_box}
        onPress={() => {
          router.replace(ViewPages.search());
        }}
      >
        <Icon
          style={UI.CommonStyles.search_box_icon}
          name="ios-search"
          size={16}
          color={UI.Colors.grayFont}
        />
        <Text
          style={[UI.CommonStyles.search_box_input, UI.CommonStyles.search_box_input_empty]}
        >{this.state.keywords ? this.state.keywords : '搜索'}</Text>
      </TouchableOpacity>
    )
  }

  renderListRow(product) {
    const {router}=this.props;
    return (
      <TouchableOpacity
        style={UI.CommonStyles.product_list_cell}
        onPress={() => {
          router.push(ViewPages.product(), {
            id: product.id
          })
        }}
      >
        <Image source={{uri: getImageUrl(product.imageUrl)}} style={UI.CommonStyles.product_list_img}/>
        <Text
          style={UI.CommonStyles.product_list_name}
          numberOfLines={2}
        >{product.name}</Text>
        <Text style={UI.CommonStyles.product_list_price}>￥{product.price}</Text>
      </TouchableOpacity>
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
    const {orderBy}=this.state;
    return (
      <View style={UI.CommonStyles.list_bar}>
        <TouchableOpacity
          style={UI.CommonStyles.list_bar_item}
          onPress={() => {
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
        <TouchableOpacity
          style={UI.CommonStyles.list_bar_item}
          onPress={this.onOrderBy.bind(this, sortStatus.SoldCount)}
        >
          <Text style={[orderBy == sortStatus.SoldCount && {color: UI.Colors.danger}]}>销量</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={UI.CommonStyles.list_bar_item}
          onPress={this.onOrderBy.bind(this, sortStatus.PriceDesc == orderBy ? sortStatus.PriceAsc : sortStatus.PriceDesc)}
        >
          <Text
            style={[[sortStatus.PriceDesc, sortStatus.PriceAsc].includes(orderBy) && {color: UI.Colors.danger}]}>价格</Text>
          {[sortStatus.PriceDesc, sortStatus.PriceAsc].includes(orderBy) && (
            <Icon
              style={UI.CommonStyles.list_bar_item_icon}
              color={UI.Colors.danger}
              name={`md-arrow-${sortStatus.PriceDesc == orderBy ? 'dropdown' : 'dropup'}`}
              size={12}
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={UI.CommonStyles.list_bar_item}
          onPress={() => {
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

    const isPosition = sortStatus.Position == this.state.orderBy;
    const isCreateOn = sortStatus.CreatedOn == this.state.orderBy;
    return (
      <FadePanel
        ref={ref => this.panel = ref}
        top={UI.Size.navBar.height + UI.Size.statusBar.height + 40}
      >
        <View style={[UI.CommonStyles.columnContainer]}>
          <TouchableOpacity
            onPress={this.onOrderBy.bind(this, sortStatus.Position)}
            style={[UI.CommonStyles.rowContainer, {
              paddingHorizontal: 10,
              height: 35,
              justifyContent: 'space-between',
              alignItems: 'center'
            }]}>
            <Text style={[isPosition && {color: UI.Colors.danger}]}>综合排序</Text>
            {isPosition && (
              <Icon
                style={UI.CommonStyles.list_bar_item_icon}
                name="ios-checkmark"
                color={UI.Colors.danger}
                size={20}
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.onOrderBy.bind(this, sortStatus.CreatedOn)}
            style={[UI.CommonStyles.rowContainer, {
              paddingHorizontal: 10,
              height: 35,
              justifyContent: 'space-between',
              alignItems: 'center'
            }]}>
            <Text style={[isCreateOn && {color: UI.Colors.danger}]}>新品优先</Text>
            {isCreateOn && (
              <Icon
                style={UI.CommonStyles.list_bar_item_icon}
                name="ios-checkmark"
                color={UI.Colors.danger}
                size={20}
              />
            )}
          </TouchableOpacity>
        </View>
      </FadePanel>
    )
  }

  renderFilter() {
    const {filteredItems}=this.props.product.list;
    const {specs}=this.state;
    return (
      <SlidePanel
        ref={ref => this.slide = ref}
        style={{
          top: 0,
          width: UI.Size.window.width - 60,
          height: UI.Size.window.height,
          backgroundColor: UI.Colors.white
        }}
        position={'right'}
        offset={UI.Size.window.width - 60}
      >
        <View
          style={{
            paddingTop: UI.Size.statusBar.height + 20,
            paddingHorizontal: 15
          }}>
          {filteredItems.map((item, index) => {
            let defaultValues;
            const checkOptions = item.specificationOptions.map(option => {
              if (specs[item.specificationAttributeId]) {
                defaultValues = specs[item.specificationAttributeId];
              }
              return {
                label: option.specificationAttributeOptionName,
                value: option.specificationAttributeOptionId
              }
            });
            return (
              <View key={index} style={{marginBottom: 20}}>
                <Text>{item.specificationAttributeName}</Text>
                <CheckBoxList
                  ref={`attribute_${item.specificationAttributeId}`}
                  value={defaultValues}
                  onChange={this.onSpecsChange.bind(this)}
                  options={checkOptions}
                />
              </View>
            )
          })}
        </View>
        <View style={[UI.CommonStyles.columnContainer,
          {
            position: 'absolute',
            left: 0,
            bottom: 0,
            right: 0,
            height: 40,
            alignItems: 'stretch',
            justifyContent: 'center',
            flexDirection: 'row'
          }]}>
          <TouchableOpacity
            style={{
              backgroundColor: UI.Colors.gray,
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1
            }}
            onPress={this.onResetFilter.bind(this)}
          >
            <Text>重置</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: UI.Colors.danger,
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1
            }}
            onPress={this.onFilter.bind(this)}
          >
            <Text style={{
              color: UI.Colors.white
            }}>筛选</Text>
          </TouchableOpacity>
        </View>
      </SlidePanel>
    )
  }

  render() {
    const {router, product, carId, carName}=this.props;
    const nav = {
      Left: [{
        source: require('../images/icon/back@2x.png'),
        style: {
          width: 13,
          height: 15
        },
        onPress: () => {
          router.pop();
        }
      }],
      Right: [{
        source: require('../images/icon/shopCar@2x.png'),
        style: {
          width: 20,
          height: 20
        },
        onPress: () => {
          // this.panel.open();
          router.push(ViewPages.shopCart());
        }
      }]
    };

    return (
      <View style={[UI.CommonStyles.container, {backgroundColor: UI.Colors.gray}]}>
        <NavBar options={nav}>
          {this.renderSearchView()}
        </NavBar>
        {this.renderToolBar()}

        {carId && (
          <View style={[UI.CommonStyles.bt, UI.CommonStyles.bb, {
            padding: 5,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: UI.Colors.white
          }]}>
            <Text style={{color: UI.Colors.grayFont, fontSize: UI.Size.font.ms}}>车型:
              <Text style={{color: UI.Colors.black, fontSize: UI.Size.font.ms}}>{carName}</Text>
            </Text>
          </View>
        )}

        {!product.loaded ? (
          <Loading/>
        ) : (
          <ListView
            ref={(view) => this.listView = view }
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
        {this.renderOrder()}
        {this.renderFilter()}
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
