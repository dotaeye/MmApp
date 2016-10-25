import {
  StyleSheet,
  PixelRatio,
  Platform,
  Dimensions
} from 'react-native';

const {width, height}=Dimensions.get('window');

const Colors = {
  primary: 'rgba(60, 177, 158, 1)',
  danger: 'rgba(199, 85, 74, 1)',
  warning: 'rgba(216, 196, 128, 1)',
  success: 'rgba(69, 190, 174, 1)',
  white: 'rgba(255, 255, 255, 1)',
  light: 'rgba(255, 255, 255, 0.6)',
  muted: 'rgba(0, 0, 0, 0.4)',
  gray: 'rgb(233,234,235)',
  dark: 'rgba(0, 0, 0, 0.7)',
  black: 'rgba(0, 0, 0, 0.8)'
};

const Size = {
  getPercent: (width, percent)=> {
    return width * percent / 100;
  },
  border: {
    size: 1 / PixelRatio.get(),
    radius: 2
  },
  navBar: {
    height: 44
  },
  statusBar: {
    height: Platform.OS === 'ios' ? 20 : 0
  },
  window: {
    height: height,
    width: width
  },
  font: {
    eg: 24,
    lg: 20,
    md: 18,
    sm: 16,
    xs: 14,
    ms: 12
  },
  space: {
    eg: 30,
    lg: 25,
    md: 20,
    sm: 15,
    xs: 10,
    ms: 5,
    min: 0
  },
  lineHeight: {
    lg: 36,
    md: 26,
    sm: 24
  },
  icon: {
    lg: 36,
    md: 22
  },
  avatar: {
    lg: 60,
    sm: 20
  },

  homeSwiper: {
    //高宽比
    scale: 240 / 670
  }

};

const CommonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    flexDirection: 'column'
  },

  columnContainer: {
    backgroundColor: Colors.white,
    flexDirection: 'column',
    justifyContent: 'center'
  },

  rowContainer: {
    backgroundColor: Colors.white,
    flexDirection: 'row'
  },

  nowrap_list: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'nowrap'
  },

  wrap_list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    width: Size.window.width
  },

  /***************
   * scrollNavs  *
   ***************/

  scroll_nav: {
    backgroundColor: Colors.white,
    height: 145,
    marginBottom: 15
  },

  scroll_nav_item: {
    height: 145,
    width: Size.getPercent(Size.window.width, 30),
    justifyContent: 'center',
    alignItems: 'center',
    borderRightColor: Colors.gray,
    borderRightWidth: Size.border.size
  },
  scroll_nav_img: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    width: Size.getPercent(Size.window.width, 25)
  },

  /***************
   * swiper      *
   ***************/
  swiper_dot: {
    backgroundColor: Colors.white,
    height: 2.5,
    width: 5,
    marginLeft: 2,
    marginRight: 2,
    marginTop: 2
  },

  swiper_dot_active: {
    backgroundColor: Colors.danger,
    width: 15
  },

  /************
   * six_box
   *************/

  six_box: {
    height: 230,
    marginBottom: 15,
    backgroundColor: Colors.white
  },
  six_box_title: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    borderBottomColor: Colors.gray,
    borderBottomWidth: Size.border.size
  },

  six_box_title_text: {
    color: Colors.danger,
    fontSize: Size.font.md
  },

  six_box_item: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    height: 95,
    width: Size.getPercent(Size.window.width, 33.33),
    borderRightColor: Colors.gray,
    borderRightWidth: Size.border.size,
    borderBottomColor: Colors.gray,
    borderBottomWidth: Size.border.size
  },

  six_box_item_img: {
    height: 70,
    width: 70
  },

  six_box_item_text: {
    height: 25,
    width: Size.getPercent(Size.window.width, 33.33),
    justifyContent: 'center',
    alignItems: 'center',
  },

  flex_1: {
    flex: 1
  },
  flex_2: {
    flex: 2
  },
  flex_3: {
    flex: 3
  },
  flex_4: {
    flex: 4
  }
});

export default {
  Colors,
  Size,
  CommonStyles
};
