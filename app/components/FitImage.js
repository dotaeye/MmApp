import React, {
  Component,
  PropTypes
} from 'react';
import  {
  Image,
} from 'react-native';

const propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
  onLayout: PropTypes.func,
  source: PropTypes.object.isRequired,
  style: Image.propTypes.style,
  children: PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.node),
    React.PropTypes.node,
  ])
};

class FitImage extends Component {
  constructor(props) {
    super(props);
    const {height, width}=props;
    this.state = {
      height: height ? height : 0,
      width: width ? width : 0,
      resized: false,
      layoutByWidth: !!width
    };
  }

  componentDidMount() {
    const {width, height, layoutByWidth}=this.state;
    Image.getSize(this.props.source.uri, (originalWidth, originalHeight) => {
      let newWidth = 0, newHeight = 0;
      if (layoutByWidth) {
        newWidth = width;
        newHeight = originalHeight * newWidth / originalWidth;
      } else {
        newHeight = height;
        newWidth = originalWidth * newHeight / originalHeight;
      }
      this.setState({
        height: newHeight,
        width: newWidth,
        resized: true
      });
    });
  }

  onLayout(event) {
    const {resized}=this.state;
    if (resized && this.props.onLayout) {
      this.props.onLayout(event)
    }
  }

  render() {
    return (
      <Image
        source={this.props.source}
        style={[
          { height: this.state.height,width:this.state.width },
          this.props.style
        ]}
        onLayout={this.onLayout.bind(this)}
      >
        {this.props.children}
      </Image>
    );
  }
}

FitImage.propTypes = propTypes;

export default FitImage;