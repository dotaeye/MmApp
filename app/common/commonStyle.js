import { StyleSheet, PixelRatio, Platform } from 'react-native';

export const colors = {
  mainColor: "#F0F0F0",
  secondColor: '#F0F0F0',
  background: '#80BD01',
  backGray: '#E5E5E5',
  textGray: '#9A9A9A',
  textBlack: '#333333',
  purple: '#9966CC',
  red: '#f61d4b',
  backWhite: '#F2F2F2',
  textGold: '#BC7233',
  borderColor: '#E2E2E2',
  black: '#586872',
  blue: '#4078c0',
  white: "white"
};

export const Size = {
  minSize: 1 / PixelRatio.get(),
  navBarHeight:44,
  statusBarHeight: Platform.OS === 'ios' ? 20 : 0,
};

const commonStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shadowLine: {
    shadowColor: '#999999',
    shadowOpacity: 0.8,
    shadowRadius: 1,
    shadowOffset: {
      height: 2,
      width: 1
    }
  },
  sepLine: {
    backgroundColor: colors.backGray,
    height: 0.5,
  },
  textInput: {
    fontSize: 15,
    borderWidth: 1,
    height: 38,
    marginTop: 5,
    marginBottom: 10,
    borderRadius: 4,
    padding: 3,
    borderColor: colors.blue,
  },
  btn: {
    borderWidth: 1,
    height: 38,
    marginLeft: 20,
    marginRight: 20,
    justifyContent: "center",
    borderColor: colors.blue,
    backgroundColor: colors.blue,
    borderRadius: 6,
    marginTop: 20
  }
});

export default commonStyle;