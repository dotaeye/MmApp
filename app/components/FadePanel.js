import React, {Component, PropTypes} from 'react';
import {
  View,
  Animated,
  Easing,
  TouchableWithoutFeedback
} from 'react-native';

import UI from '../common/UI';

class FadePanel extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fade: new Animated.Value(0),
      backFade: new Animated.Value(0),
      visible: false
    }
  }

  open() {
    if (!this.state.visible) {
      this.setState({
        visible: true
      });
      const {duration}=this.props;
      Animated.parallel([
        Animated.timing(this.state.fade, {
            toValue: 1,
            duration: duration
          },
        ),
        Animated.timing(this.state.backFade, {
          toValue: 0.5,
          duration: duration
        })
      ]).start()
    }
  }

  close() {
    if (this.state.visible) {
      const {duration}=this.props;
      Animated.parallel([
        Animated.timing(this.state.fade, {
            toValue: 0,
            duration: duration
          },
        ),
        Animated.timing(this.state.backFade, {
          toValue: 0,
          duration: duration
        })
      ]).start(()=>{
        this.setState({
          visible: false
        });
      });
    }
  }

  onLayout(event) {
    const {height} = event.nativeEvent.layout;
    this.container.setNativeProps({
      style: {
        height: height
      }
    });
    this.background.setNativeProps({
      style: {
        height: UI.Size.window.height - height - this.props.top
      }
    })
  }


  render() {
    const {visible}=this.state;
    if (!visible) return <View/>;
    return (
      <TouchableWithoutFeedback
        onPress={()=>{
          this.close()
        }}
      >
        <View style={[UI.CommonStyles.fadePanel]}>
          <View style={[UI.CommonStyles.fadePanel_top_overlay,{height:this.props.top}]}/>
          <Animated.View
            ref={ref=>this.container=ref}
            style={[UI.CommonStyles.fadePanel_back,{top:this.props.top},{opacity:this.state.fade}]}>
            <View onLayout={this.onLayout.bind(this)} style={this.props.style}>
              {this.props.children}
            </View>
          </Animated.View>
          <Animated.View
            ref={ref=>this.background=ref}
            style={[UI.CommonStyles.fadePanel_bottom_overlay,{opacity:this.state.backFade}]}/>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}
const propTypes = {
  duration: PropTypes.number
};

FadePanel.propTypes = propTypes;

FadePanel.defaultProps = {
  duration: 400
};


export default FadePanel
