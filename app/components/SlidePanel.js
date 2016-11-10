import React, {Component, PropTypes} from 'react';
import {
  View,
  Animated,
  Easing,
  TouchableWithoutFeedback
} from 'react-native';
import UI from '../common/UI';

class SlidePanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: new Animated.Value(-props.offset),
      backOffset: new Animated.Value(0),
      backFade: new Animated.Value(0)
    }
  }

  componentWillReceiveProps(nextProps) {
    this.state.offset.setValue(-nextProps.offset);
  }


  open() {
    if (!this.state.visible) {
      this.setState({
        visible: true
      });
      const {duration, offset}=this.props;
      Animated.parallel([
        Animated.timing(this.state.offset, {
            toValue: 0,
            duration: duration
          },
        ),
        Animated.timing(this.state.backFade, {
          toValue: 0.6,
          duration: duration
        }),
        Animated.timing(this.state.backOffset, {
          toValue: UI.Size.window.width - offset,
          duration: duration
        })
      ]).start();
    }
  }

  close() {
    if (this.state.visible) {
      const {duration, offset}=this.props;
      Animated.parallel([
        Animated.timing(this.state.offset, {
            toValue: -offset,
            duration: duration
          },
        ),
        Animated.timing(this.state.backFade, {
          toValue: 0,
          duration: duration
        }),
        Animated.timing(this.state.backOffset, {
          toValue: 0,
          duration: duration
        })
      ]).start(()=> {
        this.setState({
          visible: false
        });
      });
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
    const {modal}=this.props;
    if (!modal) {
      return (
        <Animated.View style={[UI.CommonStyles.slidePanel_content,this.props.style,this.getStyles()]}>
          {this.props.children}
        </Animated.View>
      )
    } else {
      if (!this.state.visible) return <View/>;
      return (

        <View style={UI.CommonStyles.slidePanel}>
          <TouchableWithoutFeedback
            onPress={()=>{
              this.close()
            }}
          >
            <Animated.View
              style={[UI.CommonStyles.slidePanel_back,{opacity:this.state.backFade,right:this.state.backOffset}]}>
            </Animated.View>
          </TouchableWithoutFeedback>
          <Animated.View style={[UI.CommonStyles.slidePanel_content,this.props.style,this.getStyles()]}>
            {this.props.children}
          </Animated.View>
        </View>

      )
    }

  }
}
const propTypes = {
  position: PropTypes.string,
  duration: PropTypes.number,
  offset: PropTypes.number,
  modal: PropTypes.bool
};

SlidePanel.propTypes = propTypes;

SlidePanel.defaultProps = {
  position: 'right',
  modal: true,
  duration: 300
};


export default SlidePanel;

