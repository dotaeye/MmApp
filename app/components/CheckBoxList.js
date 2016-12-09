import React, {PropTypes, Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';

import UI from '../common/UI';

const propTypes = {
  allowEmpty: PropTypes.bool
};


class CheckBoxList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: props.value
    };
  }

  onOptionPress(option) {
    const {allowEmpty}=this.props;
    const {value}=this.state;
    if (option.value === value && allowEmpty) {
      this.setState({
        value: null
      })
    } else {
      this.setState({
        value: option.value
      }, ()=> {
        this.props.onChange && this.props.onChange(option.value)
      })
    }
  }

  reset() {
    this.setState({
      value: null
    })
  }

  getValue() {
    return this.state.value;
  }

  render() {
    const {options}=this.props;
    const {value}=this.state;
    return (
      <View style={UI.CommonStyles.check_box_list}>
        {options.map((option, index)=> {
          return (
            <TouchableOpacity
              key={index}
              onPress={this.onOptionPress.bind(this,option)}
              style={[UI.CommonStyles.check_box_item,option.value==value&&UI.CommonStyles.check_box_item_selected]}
            >
              <Text
                style={[UI.CommonStyles.check_box_item_text,option.value==value&&UI.CommonStyles.check_box_item_text_selected]}
              >{option.label}</Text>
            </TouchableOpacity>
          )
        })}
      </View>
    )
  }
}

export  default CheckBoxList


