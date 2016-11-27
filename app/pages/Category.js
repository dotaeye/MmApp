import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  PixelRatio,
  StatusBar,
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
import {getImageUrl} from '../utils';

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
    if (cate.value != this.state.selectedId) {
      this.setState({
        selectedId: cate.value
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
            const selected = ((index === 0 && selectedId == null) || selectedId == cate.value);
            return (
              <TouchableOpacity
                key={index}
                style={[UI.CommonStyles.category_nav_item,
              selected&&UI.CommonStyles.category_nav_item_selected]}
                onPress={this.onCateNavClick.bind(this,cate)}>
                <Text
                  style={[UI.CommonStyles.category_nav_item_text,selected&&UI.CommonStyles.category_nav_item_text_selected]}>
                  {cate.label}
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
      <TouchableOpacity
        key={index}
        style={[UI.CommonStyles.columnContainer,UI.CommonStyles.category_item]}
        onPress={()=>{
          this.props.router.push(ViewPages.list(),{
            categoryId:cate.value
          })
        }}
      >
        <Image source={{uri:getImageUrl(cate.imageUrl)}} style={UI.CommonStyles.category_item_img}/>
        <Text style={UI.CommonStyles.category_item_text}>
          {cate.label}
        </Text>
      </TouchableOpacity>
    )
  }

  renderList() {
    const {category}=this.props;
    const {selectedId}=this.state;
    let parent = null;
    if (selectedId === null) {
      parent = category.list[0];
    } else {
      parent = category.list.find(x=>x.value == selectedId);
    }
    return (
      <View style={[UI.CommonStyles.columnContainer,UI.CommonStyles.category_list]}>
        <ScrollView>
          <Image style={UI.CommonStyles.category_banner_img} source={{uri:getImageUrl(parent.imageUrl)}}/>
          <View style={UI.CommonStyles.category_line_wrap}>
            <View style={UI.CommonStyles.line_wrap_line}/>
            <View style={UI.CommonStyles.line_wrap_text}>
              <Text>类目商品</Text>
            </View>
            <View style={UI.CommonStyles.line_wrap_line}/>
          </View>
          <View style={[UI.CommonStyles.wrap_list,UI.CommonStyles.category_list_grid]}>
            {parent.children.map((cate, index)=> {
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
        <StatusBar
          barStyle="default"
        />
        {this.renderNav()}
        {category.loaded ? (
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
