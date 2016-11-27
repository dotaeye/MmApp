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


class Register extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showPassword: false,
      disabledSubmit: true,
      telVerifyCodeSecond: 0
    };
  }

  onRegister() {
    const {user:{loggingIn}, userActions}=this.props;
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
      telVerifyCode: this.state.telVerifyCode,
      loginPassword: this.state.loginPassword,
      success: this.registerSuccess.bind(this)
    };
    userActions.register(data)
  }

  registerSuccess() {
    const {router}=this.props;
    router.replace(ViewPages.login())
  }

  componentWillUnmount() {
    this.timer && clearInterval(this.timer);
  }

  onGetSmsCode() {
    const {userActions}=this.props;
    const {telVerifyCodeSecond, telephone}=this.state;

    if (!validPhone(telephone)) {
      Toast.info('输入的手机号码不正确');
      return;
    }

    if (telVerifyCodeSecond > 0) return;
    userActions.verificationCode(telephone);
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
    const {telVerifyCode, loginPassword}=this.state;
    this.setState({
      telephone,
      disabledSubmit: _.isEmpty(telephone) || _.isEmpty(telVerifyCode) || _.isEmpty(loginPassword)
    })
  }

  onSmsCodeChange(telVerifyCode) {
    const {telephone, loginPassword}=this.state;
    this.setState({
      telVerifyCode,
      disabledSubmit: _.isEmpty(telephone) || _.isEmpty(telVerifyCode) || _.isEmpty(loginPassword)
    })
  }

  onPasswordChange(loginPassword) {
    const {telephone, telVerifyCode}=this.state;
    this.setState({
      loginPassword,
      disabledSubmit: _.isEmpty(telephone) || _.isEmpty(telVerifyCode) || _.isEmpty(loginPassword)
    })
  }

  render() {
    const {router}=this.props;
    const {registering}=this.props.user;
    const {showPassword, telVerifyCodeSecond, disabledSubmit}=this.state;
    return (
      <View style={[UI.CommonStyles.container,UI.CommonStyles.columnContainer,{
        justifyContent:'flex-start'
      }]}>
        <View style={[UI.CommonStyles.logoText]}>
          <Text style={{fontSize:UI.Size.font.lg}}>手机号注册</Text>
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
              autoCorrect={false}
              keyboardType={'numeric'}
              maxLength={11}
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
          <View style={UI.CommonStyles.formItem}>
            <View style={[UI.CommonStyles.formLabel]}>
              <Text>密码</Text>
            </View>
            <TextInput
              style={UI.CommonStyles.formItemInput}
              placeholder={'请设置登陆密码（6到16位）'}
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
          <View style={[UI.CommonStyles.formButton,(registering||disabledSubmit)&&{opacity:0.6}]}>
            <TouchableHighlight
              onPress={this.onRegister.bind(this)}
              disabled={registering||disabledSubmit}
              underlayColor={UI.Colors.transparent}
              style={UI.CommonStyles.formButtonTouch}>
              <Text
                style={UI.CommonStyles.formButtonText}>{registering ? '注册中....' : '注册'}</Text>
            </TouchableHighlight>
          </View>
        </View>
        {/*
         <View style={styles.other}>
         <View style={styles.otherContent}>
         <Text style={{fontSize:13,color:UI.Colors.grayFont}}>轻触上面“注册”按钮，即表示您同意</Text>
         <View style={styles.otherBottom}>
         <TouchableOpacity onPress={()=>{}}>
         <Text style={{fontSize:13,color:UI.Colors.link, marginRight:15}}>《服务协议》</Text>
         </TouchableOpacity>
         <TouchableOpacity onPress={()=>{}}>
         <Text style={{fontSize:13,color:UI.Colors.link, marginRight:15}}>《隐私政策》</Text>
         </TouchableOpacity>
         </View>
         </View>
         </View>


         */}

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
  },
  other: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0
  },

  otherContent: {
    flex: 1,
    flexDirection: 'column',
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 25
  },

  otherBottom: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5
  }
});

export default connect((state, props) => ({
  user: state.user
}), dispatch => ({
  userActions: bindActionCreators(userActions, dispatch)
}), null, {
  withRef: true
})(Register);
