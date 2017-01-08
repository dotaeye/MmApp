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
import Spinner from '../components/Spinner';
import Loading from '../components/Loading';
import EndTag from '../components/EndTag';
import ViewPages from '../components/ViewPages';
import * as searchActions from '../actions/search';

class Search extends Component {

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.canLoadMore = false;
    this.prevLoadMoreTime = 0;
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    this.props.searchActions.searchList({})
  }

  onSearch() {
    if (this.state.keywords) {
      this.replaceToList(this.state.keywords)
    }
  }

  onSearchChange(keywords) {
    this.setState({
      keywords
    })
  }

  replaceToList(keywords) {
    this.props.router.replace(ViewPages.list(), {
      keywords
    });
  }

  renderSearchView() {
    return (
      <View style={[UI.CommonStyles.search_box, {marginLeft: 10}]}>
        <Icon
          style={UI.CommonStyles.search_box_icon}
          name="ios-search"
          size={16}
          color={UI.Colors.grayFont}
        />
        <TextInput
          onChangeText={this.onSearchChange.bind(this)}
          underlineColorAndroid={'transparent'}
          autoCapitalize={'none'}
          autoCorrect={false}
          placeholder="搜索"
          returnKeyType="search"
          enablesReturnKeyAutomatically={true}
          onSubmitEditing={this.onSearch.bind(this)}
          style={UI.CommonStyles.search_box_input}
        />
      </View>
    )
  }

  renderListRow(item) {
    return (
      <View style={UI.CommonStyles.search_item}>
        <Text style={UI.CommonStyles.search_item_text}
        >{item.name}</Text>
      </View>
    )
  }

  renderHot() {
    const {search}=this.props;
    return (
      <View style={UI.CommonStyles.columnContainer}>
        <View style={UI.CommonStyles.search_hot_title}>
          <Text style={UI.CommonStyles.search_hot_title_text}>热门搜索</Text>
        </View>
        <View style={[UI.CommonStyles.search_hot, UI.CommonStyles.wrap_list]}>
          {search.hot.map((hotItem, index) => {
            return (
              <TouchableOpacity
                onPress={this.replaceToList.bind(this, hotItem.name)}
                key={index}
                style={UI.CommonStyles.search_hot_item}>
                <Text style={UI.CommonStyles.search_hot_item_text}>
                  {hotItem.name}
                </Text>
              </TouchableOpacity>
            )
          })}
        </View>
      </View>
    )
  }

  renderList() {
    const {search}=this.props;
    return (
      <View style={UI.CommonStyles.columnContainer}>
        <View style={UI.CommonStyles.search_history_title}>
          <Text style={UI.CommonStyles.search_history_title_text}>搜索历史</Text>
        </View>
        {search.list.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={UI.CommonStyles.search_item}>
              <Text style={UI.CommonStyles.search_item_text}>
                {item.name}
              </Text>
            </TouchableOpacity>
          )
        })}
      </View>
    )
  }


  render() {
    const {router, search}=this.props;

    const nav = {
      Right: [{
        text: '取消',
        style: {
          width: 20,
          height: 20
        },
        onPress: () => {
          router.pop();
        }
      }]
    };

    return (
      <View style={[UI.CommonStyles.container, {backgroundColor: UI.Colors.gray}]}>
        <NavBar options={nav}>
          {this.renderSearchView()}
        </NavBar>
        {search.listLoaded ? (
          <ScrollView>
            {this.renderHot()}
            {/*{this.renderList()}*/}
          </ScrollView>
        ) : (
          <Loading/>
        )}
      </View>
    )
  }
}

export default connect((state, props) => ({
  search: state.search
}), dispatch => ({
  searchActions: bindActionCreators(searchActions, dispatch)
}), null, {
  withRef: true
})(Search);
