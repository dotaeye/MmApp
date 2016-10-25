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


export default class SixBox extends Component {

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
        style={UI.CommonStyles.six_box_item}
        activeOpacity={0.75}
      >
        <Image
          source={nav.uri}
          resizeMode="cover"
          style={UI.CommonStyles.six_box_item_img}
        />
        <View style={UI.CommonStyles.six_box_item_text}>
          <Text>名称</Text>
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    const { title, rows}=this.props;
    return (
      <View style={[UI.CommonStyles.columnContainer,UI.CommonStyles.six_box]}>
        <View style={UI.CommonStyles.six_box_title}>
          <Text style={UI.CommonStyles.six_box_title_text}>{title}</Text>
        </View>
        <ListView
          bounces={false}
          horizontal={true}
          dataSource={this.state.dataSource.cloneWithRows(rows)}
          renderRow={this.renderRow}
          contentContainerStyle={[UI.CommonStyles.wrap_list]}
          enableEmptySections={true}
          initialListSize= {6}
        />
      </View>
    )
  }
}
