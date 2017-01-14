import React, {PropTypes, Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput
} from 'react-native';

import UI from '../common/UI';
import Icon from 'react-native-vector-icons/Ionicons';

const propTypes = {
  max: PropTypes.number,
  min: PropTypes.number
};


class Stepper extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: props.value
    };
  }

  onStepIncreasePress() {
    const {value}=this.state;
    const {max}=this.props;
    if (value + 1 <= max) {
      this.setState({
        value: value + 1
      }, () => {
        this.props.onChange && this.props.onChange(value + 1)
      })
    }
  }

  onStepDecreasePress() {
    const {value}=this.state;
    const {min}=this.props;
    if (value - 1 >= min) {
      this.setState({
        value: value - 1
      }, () => {
        this.props.onChange && this.props.onChange(value - 1)
      })
    }
  }

  onChangeText(number) {
    const {min, max}=this.props;
    if (isNaN(number)) {
      number = min;
    }
    if (number >= min && number <= max) {
      this.setState({
        value: number
      }, () => {
        this.props.onChange && this.props.onChange(number)
      })
    }
  }

  getValue() {
    return this.state.value;
  }

  render() {
    const {value}=this.state;
    return (
      <View style={UI.CommonStyles.stepper}>
        <TouchableOpacity
          style={UI.CommonStyles.stepper_left}
          onPress={this.onStepDecreasePress.bind(this)}
        >
          <Icon name="ios-remove" size={20}/>
        </TouchableOpacity>
        <TextInput
          style={UI.CommonStyles.stepper_input}
          underlineColorAndroid={'transparent'}
          autoCapitalize={'none'}
          autoCorrect={false}
          keyboardType={'numeric'}
          value={value.toString()}
          onChangeText={this.onChangeText.bind(this)}
        />
        <TouchableOpacity
          style={UI.CommonStyles.stepper_right}
          onPress={this.onStepIncreasePress.bind(this)}
        >
          <Icon name="ios-add-outline" size={20}/>
        </TouchableOpacity>
      </View>
    )
  }
}

Stepper.propTypes = propTypes;

Stepper.defaultProps = {
  max: 999,
  min: 1
};

export  default Stepper


