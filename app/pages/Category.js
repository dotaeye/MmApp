import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  PixelRatio,
  ScrollView,
  Dimensions,
  ListView,
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Icon from 'react-native-vector-icons/Ionicons';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import UI from '../common/UI';
import NavBar from '../components/NavBar'
import Loading from '../components/Loading'
import ViewPages from '../components/ViewPages'
import * as categoryActions from '../actions/category';

class Category extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedId: null
    };
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    this.props.categoryActions.getCategories({})
  }

  onCateNavClick(cate) {
    if (cate.id != this.state.selectedId) {
      this.setState({
        selectedId: cate.id
      })
    }
  }

  renderNav() {
    return (
      <NavBar>
        {this.renderSearchView()}
      </NavBar>
    )
  }

  renderSearchView() {
    const {router}=this.props;
    return (
      <TouchableOpacity
        style={[UI.CommonStyles.search_box,UI.CommonStyles.search_box_category]}
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

  renderCateNav() {
    const {category}=this.props;
    const {selectedId}=this.state;
    return (
      <View
        style={[UI.CommonStyles.columnContainer,UI.CommonStyles.category_nav]}
      >
        <ScrollView>
          {category.list.map((cate, index)=> {
            const selected = ((index === 0 && selectedId === null) || selectedId === cate.id);
            return (
              <TouchableOpacity
                key={index}
                style={[UI.CommonStyles.category_nav_item,
              selected&&UI.CommonStyles.category_nav_item_selected]}
                onPress={this.onCateNavClick.bind(this,cate)}>
                <Text
                  style={[UI.CommonStyles.category_nav_item_text,selected&&UI.CommonStyles.category_nav_item_text_selected]}>
                  {cate.name}
                </Text>
              </TouchableOpacity>
            )
          })}
        </ScrollView>
      </View>
    )
  }

  renderListRow(cate, index) {
    return (
      <View key={index} style={[UI.CommonStyles.columnContainer,UI.CommonStyles.category_item]}>
        <Image source={require('../images/products/product.jpg')} style={UI.CommonStyles.category_item_img}/>
        <Text style={UI.CommonStyles.category_item_text}>
          {cate.name}
        </Text>
      </View>
    )
  }

  renderList() {
    const {category}=this.props;
    const {selectedId}=this.state;
    let data = [];
    if (selectedId === null) {
      data = category.list[0].children;
    } else {
      data = category.list.find(x=>x.id === selectedId).children;
    }
    return (
      <View style={[UI.CommonStyles.columnContainer,UI.CommonStyles.category_list]}>
        <ScrollView>
          <Image style={UI.CommonStyles.category_banner_img} source={require('../images/banner/2.jpg')}/>
          <View style={UI.CommonStyles.category_line_wrap}>
            <View style={UI.CommonStyles.line_wrap_line}/>
            <View style={UI.CommonStyles.line_wrap_text}>
              <Text>类目商品</Text>
            </View>
            <View style={UI.CommonStyles.line_wrap_line}/>
          </View>
          <View style={[UI.CommonStyles.wrap_list,UI.CommonStyles.category_list_grid]}>
            {data.map((cate, index)=> {
              return this.renderListRow(cate, index)
            })}
          </View>
        </ScrollView>
      </View>
    )
  }

  render() {
    const {category}=this.props;
    return (
      <View style={[UI.CommonStyles.container,{backgroundColor:UI.Colors.white}]}>
        {this.renderNav()}
        {category.hasLoaded ? (
          <View style={[UI.CommonStyles.rowContainer,UI.CommonStyles.category]}>
            {this.renderCateNav()}
            {this.renderList()}
          </View>
        ) : (
          <Loading/>
        )}
      </View>
    )
  }

}

export default connect((state, props) => ({
  category: state.category
}), dispatch => ({
  categoryActions: bindActionCreators(categoryActions, dispatch)
}), null, {
  withRef: true
})(Category);
