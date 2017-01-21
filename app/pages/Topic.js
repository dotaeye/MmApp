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
import WebViewBridge from 'react-native-webview-bridge';
import BridgeScripts from '../components/bridge';

const injectScript = `(${BridgeScripts.toString()}());`;

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
        onPress: () => {
          router.pop();
        }
      }],
      Center: [{
        text: '麦盟介绍',
        isText: true
      }],
      Right: []
    };

    return (
      <NavBar options={nav} style={UI.CommonStyles.bb}/>
    )
  }


  onBridgeMessage(message) {
    const {router}=this.props;
    const getParam = (str, index = 1) => str.split('|')[index];
    const command = getParam(message, 0);
    const include = (str) => command.indexOf(str) > -1;
    const getJsonParam = (str) => JSON.parse(getParam(str));
    if (include('goToVip')) {
      router.push(ViewPages.list());
    }
  }

  render() {
    return (
      <View style={[UI.CommonStyles.container, UI.CommonStyles.columnContainer, {
        backgroundColor: UI.Colors.gray,
        justifyContent: 'flex-start'
      }]}>
        {this.renderNav()}
        <WebViewBridge
          source={{uri: 'http://www.lm123.cc/home/topic'}}
          scalesPageToFit={false}
          javaScriptEnabled={true}
          onBridgeMessage={this.onBridgeMessage.bind(this)}
          mediaPlaybackRequiresUserAction={true}
          injectedJavaScript={injectScript}
          renderError={() => {
            return (
              <ActivityIndicator
                animating={true}
                style={[{height: 80}]}
                size="large"
              />)
          }}
        />
      </View>
    )
  }

}

export default Topic