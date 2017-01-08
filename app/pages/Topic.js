import React, {Component} from 'react';
import {
  WebView,
  Image,
  Animated,
  InteractionManager,
  ScrollView,
  ListView,
  TouchableOpacity,
  View,
  RefreshControl,
  ActivityIndicator,
  Text,
} from 'react-native';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import UI from '../common/UI';
import NavBar from '../components/NavBar'
import ViewPages from '../components/ViewPages';

class Topic extends Component {

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
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
        text: '专题页面',
        isText: true
      }],
      Right: []
    };

    return (
      <NavBar options={nav} style={UI.CommonStyles.bb}/>
    )
  }

  onNavigationChange(event) {
    if (event.url.indexOf('#') > 0) {
      const productId = event.url.substr(event.url.indexOf('#') + 1);
      this.props.router.push(ViewPages.product(), {
        id: productId
      });
    }
  }

  render() {
    return (
      <View style={[UI.CommonStyles.container,UI.CommonStyles.columnContainer,{
        backgroundColor:UI.Colors.gray,
        justifyContent:'flex-start'
      }]}>
        {this.renderNav()}
        <WebView
          source={{uri:'http://www.lm123.cc/home/topic'}}
          scalesPageToFit={false}
          javaScriptEnabled={true}
          mediaPlaybackRequiresUserAction={true}
          onNavigationStateChange={this.onNavigationChange.bind(this)}
          renderError={()=>{return(
            <ActivityIndicator
              animating={true}
              style={[{height: 80}]}
              size="large"
            />)}}
        />
      </View>
    )
  }

}

export default Topic