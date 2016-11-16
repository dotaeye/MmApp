import React, {Component} from 'react';
import {
  Dimensions,
  Image,
  Animated,
  InteractionManager,
  ScrollView,
  ListView,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';

import _ from 'lodash';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {Picker, List, InputItem} from 'antd-mobile';
import {createForm} from 'rc-form';
import UI from '../common/UI';
import NavBar from '../components/NavBar'
import ViewPages from '../components/ViewPages'
import * as addressActions from '../actions/address';
import * as cityActions from '../actions/city';

class Address extends Component {

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    this.props.cityActions.getCities({})
  }

  onSave() {

  }

  renderNav() {
    const {router}=this.props;
    const nav = {
      Left: [{
        iconName: 'ios-arrow-back',
        iconSize: 20,
        iconColor: UI.Colors.black,
        onPress: ()=> {
          router.pop();
        }
      }],
      Center: [{
        text: '新建地址',
        isText: true
      }],
      Right: [{
        text: '保存',
        onPress: ()=> {
          this.onSave.bind(this)
        }
      }]
    };

    return (
      <NavBar options={nav}/>
    )
  }

  renderForm() {
    const {city}=this.props;
    const {getFieldProps} = this.props.form;
    return (
      <View style={[UI.CommonStyles.container,UI.CommonStyles.columnContainer,
      {
        justifyContent:'flex-start'
      }]}>
        <List>
          <InputItem
            {...getFieldProps('name')}
          >姓名</InputItem>

          <InputItem
            type="number"
            {...getFieldProps('phoneNumber')}
          >手机</InputItem>

          <Picker data={[{
            label:'123',
            value:'123'
          },{
            label:'234',
            value:'234'
          }]} col={1} {...getFieldProps('district3')} >
            <List.Item arrow="horizontal">省市区</List.Item>
          </Picker>

          <InputItem
            {...getFieldProps('street')}
          >地址</InputItem>

        </List>
      </View>
    )
  }

  render() {
    return (
      <View style={[
      UI.CommonStyles.container,
      UI.CommonStyles.columnContainer,
      {
        justifyContent:'flex-start'
      }]}>
        {this.renderNav()}
        {this.renderForm()}
      </View>
    )
  }

}

Address = createForm()(Address);

export default connect((state, props) => ({
  address: state.address,
  city: state.city
}), dispatch => ({
  addressActions: bindActionCreators(addressActions, dispatch),
  cityActions: bindActionCreators(cityActions, dispatch)
}), null, {
  withRef: true
})(Address);
