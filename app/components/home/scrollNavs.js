import React, {Component} from 'react';
import {
  Image,
  ScrollView,
  ListView,
  TouchableOpacity,
  View,
  Text
} from 'react-native';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import UI from '../../common/UI';


export default class ScrollNavs extends Component {

  constructor(props) {
    super(props);
    this.renderRow = this.renderRow.bind(this);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      })
    };
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  renderRow(nav) {
    return (
      <TouchableOpacity
        style={UI.CommonStyles.scroll_nav_item}
        activeOpacity={0.75}
      >
        <View style={UI.CommonStyles.columnContainer}>
          <Text>麦呗商城</Text>
          <Text>有保障 放心买</Text>
        </View>
        <Image
          source={nav.uri}
          resizeMode="cover"
          style={UI.CommonStyles.scroll_nav_img}
        />
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View style={UI.CommonStyles.scroll_nav}>
        <ListView
          horizontal={true}
          dataSource={this.state.dataSource.cloneWithRows(this.props.navs)}
          renderRow={this.renderRow}
          contentContainerStyle={[UI.CommonStyles.nowrap_list,UI.CommonStyles.scroll_nav]}
          enableEmptySections={true}
          initialListSize= {4}
        />
      </View>

    )
  }
}
