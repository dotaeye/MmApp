import {
  StyleSheet,
  PixelRatio,
  Platform,
  Image,
  Dimensions
} from 'react-native';

const {width, height}=Dimensions.get('window');

const Colors = {
  primary: 'rgba(60, 177, 158, 1)',
  danger: 'rgb(230, 50, 54)',
  warning: 'rgb(242, 142, 38)',
  success: 'rgba(69, 190, 174, 1)',
  white: 'rgba(255, 255, 255, 1)',
  light: 'rgba(255, 255, 255, 0.6)',
  muted: 'rgba(0, 0, 0, 0.4)',
  gray: 'rgb(233,234,235)',

  dark: 'rgba(0, 0, 0, 0.7)',
  black: 'rgba(0, 0, 0, 0.8)',
  background: 'rgb(238,242,243)',
  grayFont: 'rgb(150,151,155)'

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
    paddingHorizontal: 10,
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


  /******
   * SlidePanel
   */

  slidePanel: {
    position: 'absolute'
  },

  /****
   * Fade Panel
   */

  fadePanel: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    position: 'absolute',
    backgroundColor: 'transparent'
  },


  fadePanel_top_overlay: {
    top: 0,
    left: 0,
    right: 0,
    height: 0,
    position: 'absolute',
    backgroundColor: 'transparent'
  },

  fadePanel_bottom_overlay: {
    bottom: 0,
    left: 0,
    right: 0,
    height: 0,
    backgroundColor: Colors.black,
    position: 'absolute'
  },

  fadePanel_back: {
    top: 0,
    left: 0,
    right: 0,
    height: 0,
    overflow: 'hidden',
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

  /***
   * product
   */

  product_tab: {
    flex: 1,
    backgroundColor: Colors.background,
    marginBottom: 50
  },

  product_title: {
    paddingHorizontal: 10,
    paddingVertical: 12,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    borderBottomWidth: Size.border.size,
    borderBottomColor: Colors.gray,
    marginBottom: 10,
    backgroundColor: Colors.white
  },

  product_price: {
    color: Colors.danger,
    fontWeight: 'bold',
    marginTop: 10
  },

  product_price_number: {
    fontSize: Size.font.lg
  },

  product_select: {
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: Size.border.size,
    borderTopColor: Colors.gray,
    borderBottomWidth: Size.border.size,
    borderBottomColor: Colors.gray,
    backgroundColor: Colors.white,
    marginBottom: 10,
  },

  product_select_label: {
    color: Colors.grayFont,
    paddingHorizontal: 10
  },

  product_select_text: {
    flex: 1
  },

  product_select_button: {
    paddingHorizontal: 10
  },

  product_desc: {
    padding: 5,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderTopWidth: Size.border.size,
    borderTopColor: Colors.gray,
    borderBottomWidth: Size.border.size,
    borderBottomColor: Colors.gray,
    backgroundColor: Colors.white
  },

  product_desc_row: {
    flexDirection: 'row',
    padding: 5

  },

  product_desc_row_item: {
    flexDirection: 'row',
    paddingHorizontal: 5
  },

  product_desc_row_item_icon: {
    marginRight: 5
  },

  product_desc_row_item_text: {
    color: Colors.grayFont
  },


  product_suggest: {},

  product_suggest_list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    width: Size.window.width,
    backgroundColor: Colors.white
  },

  product_suggest_item: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'column',
    width: Size.getPercent(Size.window.width, 50),
    borderRightColor: Colors.gray,
    borderRightWidth: Size.border.size,
    borderBottomColor: Colors.gray,
    borderBottomWidth: Size.border.size
  },

  product_suggest_item_img_wrap: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: Size.getPercent(Size.window.width, 50)
  },

  product_suggest_item_img: {
    height: 150,
    width: 150
  },

  product_suggest_item_text: {
    padding: 5,
    width: Size.getPercent(Size.window.width, 50)
  },


  product_suggest_item_price: {
    paddingBottom: 5,
    fontWeight: 'bold',
    color: Colors.black
  },


  product_details_img: {
    width: Size.window.width,
    height: 200,
    resizeMode: Image.resizeMode.stretch
  },


  product_tool: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: Size.window.width,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: Colors.white,
    borderTopWidth: Size.border.size,
    borderTopColor: Colors.gray,
  },

  product_tool_price: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 50
  },

  product_tool_price_text: {
    color: Colors.danger,
    fontSize: Size.font.ms
  },

  product_tool_price_text_number: {
    fontSize: Size.font.md
  },

  product_tool_car: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50
  },

  product_tool_add: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    height: 50,
    backgroundColor: Colors.warning
  },

  product_tool_add_text: {
    color: Colors.white,
    fontSize: Size.font.md,
    fontWeight: 'bold'
  },

  product_tool_checkout: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: Colors.danger,
    height: 50
  },

  product_tool_checkout_text: {
    color: Colors.white,
    fontSize: Size.font.lg,
    fontWeight: 'bold'
  },


  product_modal: {
    height: 350
  },

  product_modal_close: {
    position: 'absolute',
    right: 0,
    top: 0,
    alignItems: 'center',
    justifyContent: 'center',
    width: 24,
    height: 24
  },

  product_focus_box: {
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    borderColor: 'rgb(189,189,189)',
    borderWidth: Size.border.size,
    position: 'absolute',
    backgroundColor: Colors.white,
    top: -20,
    left: 10
  },

  product_focus_img: {
    width: 70,
    height: 70
  },

  product_modal_button: {
    height: 50,
    backgroundColor: Colors.danger,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },

  product_modal_button_text: {
    color: Colors.white
  },

  product_modal_header: {
    paddingLeft: 100,
    paddingTop: 20,
    height: 70,
    borderBottomWidth: Size.border.size,
    borderBottomColor: Colors.gray,
  },

  product_modal_header_price: {
    color: Colors.danger,
    fontWeight: 'bold',
    marginBottom: 5
  },

  product_modal_header_num: {
    color: Colors.grayFont
  },

  product_attr_box: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 10,
    borderBottomWidth: Size.border.size,
    borderBottomColor: Colors.gray
  },

  product_attr_label: {
    color: Colors.grayFont
  },

  product_number_box: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: Size.border.size,
    borderBottomColor: Colors.gray,
  },

  product_number_label: {
    color: Colors.grayFont,
    marginBottom: 10
  },

  /********
   * search_box
   */
  search_box: {
    flex: 7,
    backgroundColor: Colors.gray,
    height: 30,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },

  search_box_icon: {
    marginLeft: 10,
    marginRight: 5
  },

  search_box_input: {
    flex: 1,
    fontSize: Size.font.xs
  },

  /***
   * line wrap
   */
  line_wrap: {
    flex: 1,

    flexDirection: 'row',
    height: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },

  line_wrap_line: {
    flex: 2,
    marginHorizontal: 10,
    borderTopColor: Colors.gray,
    borderTopWidth: 1,
    height: 1
  },

  line_wrap_text: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },

  line_wrap_icon: {
    marginRight: 5
  },


  /****
   * check_box_list
   */

  check_box_list: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },

  check_box_item: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderColor: 'rgb(189,189,189)',
    borderWidth: Size.border.size,
    borderRadius: 2,
    marginRight: 10,
    marginTop: 10
  },

  check_box_item_text: {},

  check_box_item_selected: {
    borderColor: Colors.danger
  },

  check_box_item_text_selected: {
    color: Colors.danger
  },


  /***
   * stepper
   */

  stepper: {
    width: 90,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'rgb(189,189,189)',
    borderWidth: Size.border.size,
    borderRadius: 2
  },

  stepper_left: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRightColor: 'rgb(189,189,189)',
    borderRightWidth: Size.border.size
  },

  stepper_right: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderLeftColor: 'rgb(189,189,189)',
    borderLeftWidth: Size.border.size
  },

  stepper_input: {
    height: 25,
    lineHeight: 25,
    fontSize: Size.font.sm,
    width: 30,
    textAlign: 'center'
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
