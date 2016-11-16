import React, { Component } from 'react';
import {
  View,
  NetInfo,
  Navigator,
  StatusBar
} from 'react-native';
import { connect } from 'react-redux';
import Router from './components/Router';
import StatusHeader from './components/StatusHeader';
import ViewPages from './components/ViewPages';
import UI from './common/UI';

const defaultRoute = ViewPages.main();

class App extends Component {

  constructor(props) {
    super(props);
  }

  renderScene(route, navigator) {
    this.router = this.router || new Router(navigator);
    let Component = route.component;
    if (Component) {
      return <Component {...route.props}
        navigator={ navigator }
        router={this.router}
        ref={(view)=> { route.sceneRef = view } }/>
    }
  }

  onDidFocus(route){
    if(route.sceneRef.getWrappedInstance){
      const wrappedComponent = route.sceneRef.getWrappedInstance();
      if(wrappedComponent){
        wrappedComponent.componentDidFocus &&
        wrappedComponent.componentDidFocus();
      }
    }
    route.sceneRef.componentDidFocus &&  route.sceneRef.componentDidFocus();
  }

  configureScene(route) {
    if (route.sceneConfig) {
      return route.sceneConfig
    }
    return Navigator.SceneConfigs.PushFromRight
  }

  render() {
    return (
      <View style={ UI.CommonStyles.container }>
        <StatusBar
          barStyle="default"
        />
        <Navigator
          initialRoute={ defaultRoute }
          configureScene={ this.configureScene.bind(this) }
          renderScene={ this.renderScene.bind(this) }
          onDidFocus={ this.onDidFocus.bind(this) }/>
      </View>
    )
  }
}

export default connect(state => ({
}), dispatch => ({
}), null, {
  withRef: true
})(App);
