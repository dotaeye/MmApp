import React, {Component, PropTypes} from 'react';
import {
  View,
  Animated,
  Easing
} from 'react-native';
import UI from '../common/UI';

class SlidePanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: new Animated.Value(-props.offset)
    }
  }

  componentWillReceiveProps(nextProps) {
    this.state.offset.setValue(-nextProps.offset);
  }


  open() {
    if(!this.state.visible){
      this.setState({
        visible:true
      })
      const {duration}=this.props;
      Animated.timing(this.state.offset, {
          toValue: 0,
          duration: duration
        },
      ).start();
    }
  }

  close() {
    if(this.state.visible){
      this.setState({
        visible:false
      })
      const {duration, offset}=this.props;
      Animated.timing(this.state.offset, {
          toValue: -offset,
          duration: duration
        },
      ).start();
    }
  }

  getStyles() {
    const style = {};
    const {position}=this.props;
    const {offset}=this.state;
    style[position] = offset;
    return style;
  }

  render() {
    return (
      <Animated.View style={[UI.CommonStyles.slidePanel,this.props.style,this.getStyles()]}>
        {this.props.children}
      </Animated.View>
    )
  }
}
const propTypes = {
  position: PropTypes.string,
  duration: PropTypes.number,
  offset: PropTypes.number
};

SlidePanel.propTypes = propTypes;

SlidePanel.defaultProps = {
  position: 'right',
  duration: 200
};


export default SlidePanel;

