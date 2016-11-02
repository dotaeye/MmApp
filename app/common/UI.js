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
    scale: 435 / 750
  }

};

const CommonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
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

  /*****
   * navbar
   ******/
  navBarContainer: {
    height: Size.navBar.height + Size.statusBar.height,
    width: width,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Size.statusBar.height
  },
  navBarText: {
    fontSize: Size.font.md,
    color: Colors.black
  },
  navBarWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },

  navBarWrapperRight: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },

  navBarWrapperLeft: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },

  navBarWrapperCenter: {
    flex: 2
  },

  /************
   * TabBar
   ************/
  tabBar: {
    backgroundColor: Colors.white
  },

  tabBarText: {
    color: Colors.gray
  },

  tabBarTextSelected: {
    color: Colors.danger
  },

  tabBarIcon: {
    width: 24,
    height: 24
  },

  tabBarIconPlus: {
    width: 50,
    height: 40,
    marginBottom: -8
  },


  /************
   * Button
   ************/

  btnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 14,
    height: Size.navBar.height
  },

  btnPositionLeft: {
    justifyContent: 'flex-start'
  },
  btnPositionRight: {
    justifyContent: 'flex-end'
  },
  btnPositionCenter: {
    justifyContent: 'center'
  },

  btnImg: {},
  btnIcon: {},
  btnText: {
    color: Colors.black
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

  /******
   * SlidePanel
   */

  slidePanel: {
    position: 'absolute'
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
    alignItems: 'center'
  },

  /********
   * select car
   ********/

  select_car_hot: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    height: 50
  },

  select_car_hot_title: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 20
  },

  select_car_hot_title_text: {},

  select_car_hot_container: {},

  select_car_hot_item: {},
  select_car_hot_item_text: {},
  select_car_row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: Size.window.width,
    backgroundColor: Colors.white
  },
  select_car_row_img_container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 40
  },
  select_car_row_img: {
    height: 24,
    width: 24
  },
  select_car_row_right: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    flex: 1,
    height: 50,
    marginLeft: 10,
    marginRight: Size.getPercent(Size.window.width, 8),
    borderBottomColor: Colors.gray,
    borderBottomWidth: Size.border.size
  },
  select_car_row_text: {
    color: Colors.danger,
    fontSize: Size.font.small
  },
  select_car_section: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: Colors.gray,
    height: 24
  },
  select_car_section_text: {
    color: Colors.black,
    paddingHorizontal: 8
  },
  select_car_section_modal: {
    position: 'absolute',
    height: 60,
    width: 60,
    top: (Size.window.height - Size.navBar.height - 60) / 2,
    left: (Size.window.width - 60) / 2,
    backgroundColor: Colors.black,
    opacity: 0.6,
    justifyContent: 'center',
    alignItems: 'center'
  },
  select_car_section_modal_text: {
    color: Colors.white,
    fontSize: Size.font.eg
  },

  select_car_letter: {
    position: 'absolute',
    height: Size.window.height - Size.navBar.height - Size.statusBar.height,
    width: Size.getPercent(Size.window.width, 6),
    top: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center'
  },

  select_car_letter_item: {
    justifyContent: 'center',
    alignItems: 'center',
    width: Size.getPercent(Size.window.width, 6)
  },

  select_car_letter_item_text: {
    textAlign: 'center',
    fontSize: Size.font.ms
  },

  select_car_panel: {
    flex: 1,
    borderTopWidth: Size.border.size,
    borderTopColor: Colors.gray,
    borderLeftWidth: Size.border.size,
    borderLeftColor: Colors.gray,
    borderBottomWidth: Size.border.size,
    borderBottomColor: Colors.gray
  },

  select_car_panel_group: {},

  select_car_panel_group_title: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: Colors.gray,
    height: 24,
    paddingLeft: 10
  },

  select_car_panel_group_child: {},

  select_car_panel_group_item: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: 40,
    paddingLeft: 20,
    borderBottomWidth: Size.border.size,
    borderBottomColor: Colors.gray
  },

  select_car_modal: {
    height: 260
  },

  select_car_modal_title: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 40,
    paddingLeft: 10,
    borderBottomWidth: Size.border.size,
    borderBottomColor: Colors.gray
  },

  select_car_modal_title_left: {
    color: Colors.muted,
    paddingHorizontal: 10
  },

  select_car_modal_title_right: {
    color: Colors.gray
  },

  select_car_modal_item: {
    paddingLeft: 20,
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: 36,
    borderBottomWidth: Size.border.size,
    borderBottomColor: Colors.gray
  },

  /********
   * search_box
   */
  search_box: {
    backgroundColor: Colors.gray,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
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
