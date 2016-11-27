import React, {Component, PropTypes} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Dimensions,
  ScrollView,
  PixelRatio
} from 'react-native';
import _ from 'lodash';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as userActions from '../actions/user';
import {Toast} from 'antd-mobile';
import {validPhone, validPassword} from '../utils/Validator';
import ViewPages from '../components/ViewPages';
import UI from '../common/UI';


class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showPassword: false,
      disabledSubmit: true
    };
  }


  onLogin() {
    const {user:{loggingIn}}=this.props;
    const {disabledSubmit}=this.state;
    if (loggingIn || disabledSubmit) return;
    if (!validPhone(this.state.telephone)) {
      Toast.info('输入的手机号码不正确');
      return;
    }
    if (!validPassword(this.state.loginPassword)) {
      Toast.info('请输入6-16位密码');
      return;
    }
    let data = {
      telephone: this.state.telephone,
      telVerifyCode: '',
      loginPassword: this.state.loginPassword,
      success: this.loginSuccess.bind(this)
    };
    this.props.userActions.login(data)
  }

  loginSuccess() {
    this.props.router.resetTo(ViewPages.main())
  }


  onUserNameChange(telephone) {
    const {loginPassword}=this.state;
    this.setState({
      telephone,
      disabledSubmit: _.isEmpty(telephone) || _.isEmpty(loginPassword)
    })
  }

  onPasswordChange(loginPassword) {
    const {telephone}=this.state;
    this.setState({
      loginPassword,
      disabledSubmit: _.isEmpty(telephone) || _.isEmpty(loginPassword)
    })
  }

  render() {
    const {user:{loggingIn}, router}=this.props;

    const {showPassword, disabledSubmit}=this.state;
    return (
      <View style={[UI.CommonStyles.container,UI.CommonStyles.columnContainer,{
        justifyContent:'flex-start'
      }]}>

        <View style={UI.CommonStyles.logo}>
          <Image style={UI.CommonStyles.logo_img} source={require('../images/logo/180x180.png')}/>
        </View>

        <View style={UI.CommonStyles.form}>
          <View style={UI.CommonStyles.formItem}>
            <View style={[UI.CommonStyles.formLabel,UI.CommonStyles.br]}>
              <Text>+86</Text>
            </View>
            <TextInput
              style={UI.CommonStyles.formItemInput}
              placeholder={'手机号'}
              underlineColorAndroid={'transparent'}
              autoCapitalize={'none'}
              keyboardType={'numeric'}
              maxLength={11}
              autoCorrect={false}
              onChangeText={this.onUserNameChange.bind(this)}
            />
          </View>

          <View style={UI.CommonStyles.formItem}>
            <View style={[UI.CommonStyles.formLabel,UI.CommonStyles.br]}>
              <Text>密码</Text>
            </View>
            <TextInput
              style={UI.CommonStyles.formItemInput}
              placeholder={'密码'}
              underlineColorAndroid={'transparent'}
              secureTextEntry={!showPassword}
              autoCapitalize={'none'}
              autoCorrect={false}
              onChangeText={this.onPasswordChange.bind(this)}
            />
            <TouchableOpacity
              style={{paddingHorizontal:5,paddingVertical:8}}
              onPress={()=>{
                this.setState({
                  showPassword:!this.state.showPassword
                })
              }}
            >
              {this.state.showPassword ? (
                <Image style={{width:18,height:12}} source={require('../images/icon/eye_on.png')}/>
              ) : (
                <Image style={{width:18,height:12}} source={require('../images/icon/eye.png')}/>
              )}

            </TouchableOpacity>
          </View>
          <View style={[UI.CommonStyles.formButton,(disabledSubmit||loggingIn)&&{opacity:0.6}]}>
            <TouchableHighlight
              disabled={disabledSubmit||loggingIn}
              onPress={this.onLogin.bind(this)}
              underlayColor={UI.Colors.transparent}
              style={UI.CommonStyles.formButtonTouch}>
              <Text style={UI.CommonStyles.formButtonText}>{loggingIn ? '登录中....' : '登录'}</Text>
            </TouchableHighlight>
          </View>

          <View style={[UI.CommonStyles.linkButton,{justifyContent:'space-between'}]}>
            <TouchableOpacity
              onPress={()=>{
                router.push(ViewPages.register())
              }}
              style={UI.CommonStyles.linkButtonTouch}>
              <Text style={UI.CommonStyles.linkButtonText}>注册</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={()=>{
                router.push(ViewPages.codeLogin())
              }}
              style={UI.CommonStyles.linkButtonTouch}>
              <Text style={UI.CommonStyles.linkButtonText}>验证码登录</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.close}>
          <TouchableOpacity
            style={styles.button}
            onPress={()=>{
              router.pop();
            }}
          >
            <Image style={styles.closeIcon} source={require('../images/icon/close.png')}/>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({

  close: {
    position: 'absolute',
    top: 28,
    left: 7
  },

  closeIcon: {
    width: 15,
    height: 15
  },

  button: {
    padding: 15
  }

});


export default connect((state, props) => ({
  user: state.user
}), dispatch => ({
  userActions: bindActionCreators(userActions, dispatch)
}), null, {
  withRef: true
})(Login);
