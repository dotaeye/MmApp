import React, {
  NetInfo
} from 'react-native';

// import CodePush from 'react-native-code-push';

// check the code-push doc:
// https://github.com/Microsoft/react-native-code-push#getting-started

export function getNetStatus() {
  return NetInfo.fetch().then((netinfo=> {
    return netinfo.toUpperCase() == 'WIFI';
  }));
}

export function callCodePush(){

  //隐式更新
  // CodePush.sync();

  // CodePush.sync({
  //   deploymentKey: 'RGOUfyINiLicZnld67aD0nrbRvyLV1Ifekvul',
  //   updateDialog: {
  //     optionalIgnoreButtonLabel: '稍后',
  //     optionalInstallButtonLabel: '后台更新',
  //     optionalUpdateMessage: 'iReading有新版本了，是否更新？',
  //     title: '更新提示'
  //   },
  //   installMode: CodePush.InstallMode.ON_NEXT_RESTART
  // });
}

export function update() {
  getNetStatus().done((status)=>status && callCodePush());
}