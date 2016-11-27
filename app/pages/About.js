import React, {Component} from 'react';
import {
  Dimensions,
  Image,
  Animated,
  InteractionManager,
  ScrollView,
  ListView,
  TouchableOpacity,
  View,
  RefreshControl,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import UI from '../common/UI';
import NavBar from '../components/NavBar'


class About extends Component {

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
        text: '关于我们',
        isText: true
      }],
      Right: []
    };

    return (
      <NavBar options={nav}/>
    )
  }

  renderHeader() {
    return (
      <View style={[UI.CommonStyles.rowContainer,{
        marginBottom:10,
        justifyContent:'center',
        backgroundColor:UI.Colors.transparent
      }]}>
        <Image source={require('../images/logo/180x180.png')} style={{
          height:80,
          width:80,
          marginHorizontal:20
        }}/>
      </View>
    )
  }

  renderBody() {
    return (
      <View style={{
        borderRadius:2,
        borderWidth:UI.Size.border.size,
        borderColor:UI.Colors.border,
        margin:10,
        padding:10
      }}>
        <Text style={{
          lineHeight:UI.Size.font.md
        }}>绿麦(上海)汽车科技有限公司(www.360mb.cc)由几位汽车行业专业人士在09年开始筹办，致力于改变一些汽车后市场传统市场上的消费弊端，斥资数千万来开发了各种以ARM+CRM+ERP等数据系统服务平台，创立了麦呗
          麦盟等消费服务品牌平台，仅仅几年时间，已成为全国访问量最高、覆盖最广、信息量最大的专业汽车售后一站式服务平台商。连续被多家专业市场调研机构和投资机构评为“最佳O2O汽车服务电商”、“最佳汽车社区”、“最具发展潜力汽车服务平台商”。绿麦汽车科技从成立的第一天，就把用户（汽车消费者和车主）的价值放在第一位，我们成长的动力就是如何为用户创造出更多的价值，并永远坚持这一原则。</Text>
      </View>
    )
  }

  renderCopyRight() {
    return (
      <View style={[
        UI.CommonStyles.columnContainer,
        {
          alignItems:'center',
          flex:1,
          backgroundColor:UI.Colors.transparent,
          justifyContent:'flex-end'
        }
      ]}>
        <Text style={{
          marginBottom:10,
          color:UI.Colors.grayFont
        }}>Copyright @2009-2016</Text>
        <Text style={{
          marginBottom:15,
          color:UI.Colors.grayFont
        }}>绿麦(上海)汽车科技有限公司</Text>
      </View>
    )
  }

  render() {
    return (
      <View style={[UI.CommonStyles.container,UI.CommonStyles.columnContainer,{
        backgroundColor:UI.Colors.gray,
        justifyContent:'flex-start'
      }]}>
        {this.renderNav()}
        {this.renderHeader()}
        {this.renderBody()}
        {this.renderCopyRight()}

      </View>
    )
  }

}

export default About