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

  renderSearchView() {
    return (
      <View style={UI.CommonStyles.search_box}>
        <Icon
          style={UI.CommonStyles.search_box_icon}
          name="ios-search"
          size={16}
          color={UI.Colors.grayFont}
        />
        <TextInput
          underlineColorAndroid={'transparent'}
          autoCapitalize={'none'}
          autoCorrect={false}
          placeholder="搜索"
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
          {search.hot.map((hotItem, index)=> {
            return (
              <View
                key={index}
                style={UI.CommonStyles.search_hot_item}>
                <Text style={UI.CommonStyles.search_hot_item_text}>
                  {hotItem.name}
                </Text>
              </View>
            )
          })}
        </View>
      </View>

    )

  }

  renderList(){
    const {search}=this.props;

    return (
      <View style={UI.CommonStyles.columnContainer}>

        <View style={UI.CommonStyles.search_history_title}>
          <Text style={UI.CommonStyles.search_history_title_text}>搜索历史</Text>
        </View>
        {search.list.map((item, index)=> {
          return (
            <View
              key={index}
              style={UI.CommonStyles.search_item}>
              <Text style={UI.CommonStyles.search_item_text}>
                {item.name}
              </Text>
            </View>
          )
        })}
      </View>

    )

  }


  render() {
    const {router, search}=this.props;

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
        text: '搜索',
        style: {
          width: 20,
          height: 20
        },
        onPress: ()=> {
          // router.push(ViewPage.product());
        }
      }]
    };

    return (
      <View style={[UI.CommonStyles.container,{backgroundColor:UI.Colors.gray}]}>
        <NavBar options={nav}>
          {this.renderSearchView()}
        </NavBar>

        {search.listLoaded ? (
          <ScrollView>
            {this.renderHot()}
            {this.renderList()}
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
