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
import {validPhone} from '../utils/Validator';
import ViewPages from '../components/ViewPages';
import UI from '../common/UI';

class CodeLogin extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showPassword: false,
      disabledSubmit: true,
      telVerifyCodeSecond: 0
    };
  }

  onLogin() {
    const {dispatch, user:{loggingIn}}=this.props;
    const {disabledSubmit}=this.state;
    if (loggingIn || disabledSubmit) return;
    if (!validPhone(this.state.telephone)) {
      Toast.info('输入的手机号码不正确');
      return;
    }
    let data = {
      telephone: this.state.telephone,
      telVerifyCode: this.state.telVerifyCode,
      loginPassword: ''
    };
    this.props.userActions.login(data, this.loginSuccess.bind(this))
  }

  loginSuccess() {
    // const { dispatch, navigationState }=this.props;
    // dispatch(nav.navigatePopToKey('MainContainer'));
  }


  componentWillUnmount() {
    this.timer && clearInterval(this.timer);
  }

  onGetSmsCode() {
    const {dispatch}=this.props;
    const {telVerifyCodeSecond, telephone}=this.state;
    if (!validPhone(telephone)) {
      Toast.info('输入的手机号码不正确');
      return;
    }
    if (telVerifyCodeSecond > 0) return;
    dispatch(userActions.verificationCode({
      telephone,
      type: 1
    }));
    this.setState({
      telVerifyCodeSecond: 60
    }, ()=> {
      this.timer = setInterval(()=> {
        if (this.state.telVerifyCodeSecond === 0) {
          clearInterval(this.timer);
        } else {
          this.setState({
            telVerifyCodeSecond: this.state.telVerifyCodeSecond - 1
          });
        }
      }, 1000)
    });
  }

  onUserNameChange(telephone) {
    const {telVerifyCode}=this.state;
    this.setState({
      telephone,
      disabledSubmit: _.isEmpty(telephone) || _.isEmpty(telVerifyCode)
    })
  }

  onSmsCodeChange(telVerifyCode) {
    const {telephone}=this.state;
    this.setState({
      telVerifyCode,
      disabledSubmit: _.isEmpty(telephone) || _.isEmpty(telVerifyCode)
    })
  }

  render() {
    const {router}=this.props;
    const {loggingIn}=this.props.user;
    const {telVerifyCodeSecond, disabledSubmit}=this.state;
    return (
      <View style={[UI.CommonStyles.container,UI.CommonStyles.columnContainer,{
        justifyContent:'flex-start'
      }]}>
        <View style={[UI.CommonStyles.logoText]}>
          <Text style={{fontSize:UI.Size.font.lg}}>使用验证码登录</Text>
        </View>
        <View style={UI.CommonStyles.form}>
          <View style={UI.CommonStyles.formItem}>
            <View style={[UI.CommonStyles.formLabel,UI.CommonStyles.br]}>
              <Text >+86</Text>
            </View>
            <TextInput
              style={UI.CommonStyles.formItemInput}
              placeholder={'请输入手机号'}
              underlineColorAndroid={'transparent'}
              autoCapitalize={'none'}
              keyboardType={'numeric'}
              maxLength={11}
              autoCorrect={false}
              onChangeText={this.onUserNameChange.bind(this)}
            />
          </View>
          <View style={UI.CommonStyles.formItem}>
            <View style={[UI.CommonStyles.formLabel,{paddingRight:0}]}>
              <Text>验证码</Text>
            </View>
            <TextInput
              style={UI.CommonStyles.formItemInput}
              placeholder={'请输入短信验证码'}
              underlineColorAndroid={'transparent'}
              autoCapitalize={'none'}
              autoCorrect={false}
              keyboardType={'numeric'}
              maxLength={6}
              onChangeText={this.onSmsCodeChange.bind(this)}
            />
            <TouchableOpacity
              onPress={this.onGetSmsCode.bind(this)}
            >
              <Text style={telVerifyCodeSecond?{color:UI.Colors.grayFont}:{color:UI.Colors.link}}>
                {telVerifyCodeSecond ? `${telVerifyCodeSecond}秒后再次获取` : '获取'}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={[UI.CommonStyles.formButton,(loggingIn||disabledSubmit)&&{opacity:0.6}]}>
            <TouchableHighlight
              onPress={this.onLogin.bind(this)}
              disabled={loggingIn||disabledSubmit}
              underlayColor={UI.Colors.transparent}
              style={UI.CommonStyles.formButtonTouch}>
              <Text style={UI.CommonStyles.formButtonText}>{loggingIn ? '登录中....' : '登录'}</Text>
            </TouchableHighlight>
          </View>

          <View style={UI.CommonStyles.linkButton}>
            <TouchableOpacity
              onPress={()=>{
                router.push(ViewPages.login())
              }}
              style={UI.CommonStyles.linkButtonTouch}>
              <Text style={UI.CommonStyles.linkButtonText}>使用密码登录</Text>
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
    padding: 8
  }

});


export default connect((state, props) => ({
  user: state.user
}), dispatch => ({
  userActions: bindActionCreators(userActions, dispatch)
}), null, {
  withRef: true
})(CodeLogin);
