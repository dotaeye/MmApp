import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar
} from 'react-native';
import _ from 'lodash';
import Button from '../components/Button';
import UI from '../common/UI';

class NavBar extends Component {

  renderNavBar() {

    const navs = this.props.options || {};

    return ['Left', 'Center', 'Right'].map((position)=> {
      if (position === 'Center' && this.props.children) {
        return this.props.children;
      }
      const navPart = navs[position];
      if (navPart && _.isArray(navPart)) {
        return (
          <View
            key={position}
            style={[UI.CommonStyles.navBarWrapper, UI.CommonStyles['navBarWrapper'+position]]}>
            <StatusBar barStyle="default"/>
            {navPart.map((nav, navIndex)=> {
              if (nav.isView) {
                return nav.View
              } else if (nav.isText) {
                return (
                  <Text style={[UI.CommonStyles.navBarText,UI.CommonStyles['navBar'+position]]} key={navIndex}>
                    {nav.text}
                  </Text>
                )
              } else {
                return (
                  <Button
                    iconName={nav.iconName}
                    iconSize={nav.iconSize||24}
                    iconColor={nav.iconColor||UI.Colors.black}
                    source={nav.source}
                    style={nav.style}
                    containerStyle={nav.containerStyle}
                    position={position}
                    text={nav.text}
                    textStyle={nav.textStyle}
                    onPress={nav.onPress} key={navIndex}
                  />
                );
              }
            })}
          </View>
        )
      }
      return null;
    })
  }

  render() {
    return (
      <View
        style={[UI.CommonStyles.navBarContainer,this.props.style]}>
        {this.renderNavBar()}
      </View>
    )
  }
}

export default NavBar;
