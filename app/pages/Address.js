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

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {List, InputItem, Toast} from 'antd-mobile';
import Picker from 'react-native-picker'
import {createForm} from 'rc-form';
import UI from '../common/UI';
import NavBar from '../components/NavBar'
import Loading from '../components/Loading';
import * as addressActions from '../actions/address';
import * as cityActions from '../actions/city';
import {getValidErrorMessage} from '../utils/Validator';
import {getCities} from '../utils';

class Address extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pickerShow: false,
      city: []
    };
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.fetchData();
    });
  }

  fetchData() {
    const {cityActions}=this.props;
    cityActions.getCities({
      success: this.onCityLoad.bind(this)
    })
  }

  onCityLoad() {
    const {id, address}=this.props;
    if (id) {
      const entity = address.list.find(x=>x.id == id);
      this.setState({
        city: [entity.province, entity.area, entity.county]
      })
    }
  }

  onSave() {
    const {addressActions, city, router, id, address}=this.props;
    const {validateFields} = this.props.form;
    let entity, cities;
    validateFields((errors, formdata) => {
      if (!!errors) {
        Toast.info(getValidErrorMessage(errors), 1);
        return;
      }
      if (!id && !this.state.city.length) {
        Toast.info('请选择城市');
        return;
      }
      if (id) {
        entity = address.list.find(x=>x.id == id);
        if (this.state.city.length) {
          cities = getCities(city.list, this.state.city);
        }
        const updateData = Object.assign({}, entity,
          formdata, this.state.city.length && {
            province: cities.province.label,
            area: cities.area.label,
            county: cities.county.label,
            cityCode: cities.county.value,
            cityCodeList: cities.province.value + ',' + cities.area.value + ',' + cities.county.value
          }
        );
        console.log(updateData);
        addressActions.updateAddress({
          data: updateData,
          success: ()=> {
            router.pop();
          }
        });
      } else {
        cities = getCities(city.list, this.state.city);
        const postData = Object.assign({},
          formdata, {
            province: cities.province.label,
            area: cities.area.label,
            county: cities.county.label,
            cityCode: cities.county.value,
            cityCodeList: cities.province.value + ',' + cities.area.value + ',' + cities.county.value
          }
        );
        addressActions.addAddress({
          data: postData,
          success: ()=> {
            router.pop();
          }
        });
      }
    })
  }

  onPickerConfirm(city) {
    this.setState({
      city
    })
  }

  onShowPicker() {
    const {pickerShow}=this.state;
    if (pickerShow) {
      Picker.hide();
      this.setState({
        pickerShow: false
      })
    } else {
      let entity;
      const {city, address, id}=this.props;
      let defaultValue = [];
      if (id) {
        entity = address.list.find(x=>x.id == id);
        defaultValue = [entity.province, entity.area, entity.county];
      }
      const pickerData = [];
      city.list.forEach(province=> {
        const provinceItem = {};
        provinceItem[province.label] = [];
        province.children.forEach(area=> {
          const areaItem = {};
          areaItem[area.label] = [];
          area.children.forEach(county=> {
            areaItem[area.label].push(county.label);
          });
          provinceItem[province.label].push(areaItem);
        });
        pickerData.push(provinceItem);
      });

      Picker.init({
        selectedValue: defaultValue,
        pickerData: pickerData,
        onPickerConfirm: this.onPickerConfirm.bind(this)
      });
      Picker.show();
      this.setState({
        pickerShow: true
      })
    }
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
        onPress: this.onSave.bind(this)
      }]
    };

    return (
      <NavBar options={nav}/>
    )
  }

  renderForm() {
    const {city, address, id}=this.props;
    let entity = {};
    if (!city.loaded) return <Loading/>;
    const {getFieldProps} = this.props.form;
    if (id) {
      entity = address.list.find(x=>x.id == id);
    }
    return (
      <View style={[UI.CommonStyles.container,UI.CommonStyles.columnContainer,
      {
        justifyContent:'flex-start'
      }]}>
        <List>
          <InputItem
            {...getFieldProps('name', {
              initialValue: entity.name,
              rules: [{required: true, message: '请输入收货人'}]
            })}
          >姓名</InputItem>

          <InputItem
            type="number"
            {...getFieldProps('phoneNumber', {
              initialValue: entity.phoneNumber,
              rules: [{required: true, message: '请输入手机号码'}]
            })}
          >手机</InputItem>

          <List.Item
            arrow="horizontal"
            extra={<TouchableOpacity
                    onPress={this.onShowPicker.bind(this)}
                  >
                    <Text>{this.state.city.length?this.state.city.join(' '):'请选择'}</Text>
                  </TouchableOpacity>}>省市区</List.Item>

          <InputItem
            {...getFieldProps('detail', {
              initialValue: entity.detail,
              rules: [{required: true, message: '请输入详细地址'}]
            })}
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
