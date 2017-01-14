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
import _ from 'lodash';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import ScrollableTabView, {DefaultTabBar} from 'react-native-scrollable-tab-view';
import Icon from 'react-native-vector-icons/Ionicons';
import NavBar from '../components/NavBar';
import UI from '../common/UI';
import ProductTab from '../components/ProductTab'
import VipAlbumCateTab from '../components/VipAlbumCateTab'
import * as productActions from '../actions/product'
import {productStatus} from '../common/productStatus';


class VipProduct extends Component {

  constructor(props) {
    super(props);
    this.state = {
      status: props.status || 1
    }
  }

  renderNav() {
    const {router}=this.props;
    const nav = {
      Left: [{
        iconName: 'ios-arrow-back',
        iconSize: 20,
        iconColor: UI.Colors.black,
        onPress: () => {
          router.pop();
        }
      }],
      Center: [{
        text: '盟友专享',
        isText: true
      }],
      Right: []
    };

    return (
      <NavBar options={nav}/>
    )
  }

  renderTabs() {
    const {product, productActions}=this.props;
    return productStatus.filter(x => x.status >= 0).map((tab, index) => {
      const ComponentTab = tab.status == 1 ? ProductTab : VipAlbumCateTab;
      return (
        <ComponentTab
          router={this.props.router}
          status={tab.status}
          tabLabel={tab.name}
          product={product}
          productActions={productActions}
          key={index}
        />
      )
    })
  }

  render() {
    const {status}=this.state;
    const initialPage = _.indexOf(productStatus, productStatus.find(x => x.status == status));
    return (
      <View style={[UI.CommonStyles.container, UI.CommonStyles.columnContainer, {
        backgroundColor: UI.Colors.gray
      }]}>
        {this.renderNav()}
        <ScrollableTabView
          renderTabBar={() =>
            <DefaultTabBar
              style={[{height: 30}, UI.CommonStyles.bb]}
              tabStyle={{paddingBottom: 0}}
              textStyle={{fontSize: 14}}
            />
          }
          initialPage={initialPage}
          tabBarBackgroundColor={UI.Colors.white}
          tabBarUnderlineStyle={{
            backgroundColor: UI.Colors.danger,
            height: 2,
            paddingHorizontal: 15,
            width: UI.Size.window.width / 2 - 30,
            marginLeft: 15
          }}
          tabBarActiveTextColor={UI.Colors.danger}
          tabBarInactiveTextColor={UI.Colors.black}
        >
          {this.renderTabs()}
        </ScrollableTabView>
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
})(VipProduct);

