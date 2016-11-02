import React, {PropTypes} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';

import UI from '../common/UI';

const propTypes = {
  onPress: PropTypes.func,
  disabled: PropTypes.bool,
  iconName: PropTypes.string,
  iconSize: PropTypes.number,
  iconColor: PropTypes.string,
  text: PropTypes.string,
  textButton: PropTypes.bool,
  source: PropTypes.number,
  position: PropTypes.string,
  style: View.propTypes.style,
  containerStyle: View.propTypes.style,
  textStyle: Text.propTypes.style
};

const Button = ({
  onPress,
  disabled,
  iconName,
  iconSize,
  iconColor,
  text,
  textButton,
  source,
  position,
  style,
  containerStyle,
  textStyle
}) => (
  <TouchableOpacity
    style={[UI.CommonStyles.btnContainer, UI.CommonStyles['btnPosition'+position], containerStyle]}
    onPress={onPress}
    disabled={disabled}
  >
    {source && <Image style={[UI.CommonStyles.btnImg,style]} source={source}/>}
    {iconName && <Icon style={[UI.CommonStyles.btnIcon,style]} name={iconName} size={iconSize} color={iconColor}/>}
    {text && <Text style={[UI.CommonStyles.btnText, textStyle]}>{text}</Text>}
  </TouchableOpacity>
);

Button.propTypes = propTypes;

Button.defaultProps = {
  onPress() {
  },
  disabled: false,
  position: 'Center'
};

export default Button;
