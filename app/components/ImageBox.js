import React, {Component} from 'react';
import {
  View,
  Image,
  ActivityIndicator
} from 'react-native';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import UI from '../common/UI';

const defaultMaxWidth = UI.Size.window.width;

class ImageBox extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  onImageLoadEnd() {
    const {source, maxWidth = defaultMaxWidth} = this.props;
    this.setState({
      loading: false
    });
    Image.getSize && Image.getSize(source.uri, (width, height)=> {
      if (width >= maxWidth) {
        height = (maxWidth / width) * height;
        width = maxWidth;
      }
      this.image && this.image.setNativeProps({
        style: {
          width: width,
          height: height
        }
      });
    }, () => null);
  }

  render() {
    const {source, style} = this.props;
    return (
      <Image
        ref={ view=>this.image = view }
        source={ {uri: source.uri} }
        style={ style }
        onLoadEnd={ ()=> this.onImageLoadEnd() }>
        {
          this.state.loading ?
            <View style={{
              alignItems: 'center',
              justifyContent:'center',
              flex:1
            }}>
              <ActivityIndicator color={ UI.Colors.danger }/>
            </View>
            : null
        }
      </Image>
    )
  }
}

export default ImageBox;


