import React, {Component} from 'react';
import {
  Dimensions,
  Image,
  InteractionManager,
  ScrollView,
  ListView,
  TouchableOpacity,
  View,
  Text,
  PanResponder
} from 'react-native';

import _ from 'lodash';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Modal from 'react-native-modalbox';
import UI from '../common/UI';
import list from '../data/list.json';
import NavBar from '../components/NavBar'
import SlidePanel from '../components/SlidePanel';

class SelectCar extends Component {

  constructor(props) {
    super(props);
    const getSectionData = (dataBlob, sectionId) => {
      return dataBlob[sectionId];
    };
    const getRowData = (dataBlob, sectionId, rowId) => {
      return dataBlob[rowId];
    };
    const dataSource = new ListView.DataSource({
      getRowData: getRowData,
      getSectionHeaderData: getSectionData,
      rowHasChanged: (row1, row2) => row1 !== row2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2
    });
    const data = this._getData();
    const dataBlob = {};
    const sectionIds = _.uniq(data.map(d=>d.pinyin[0]).sort());
    const rowIds = [];
    sectionIds.forEach((p, sectionIndex)=> {
      dataBlob[p] = p;
      const rows = data.filter(d=>d.pinyin[0] === p);
      rowIds[sectionIndex] = [];
      rows.forEach((r, rowIndex)=> {
        let rowId = p + '_' + rowIndex;
        rowIds[sectionIndex].push(rowId);
        dataBlob[rowId] = r.name;
      })
    });
    this.letterHeight = UI.Size.getPercent(UI.Size.window.height - UI.Size.navBar.height - UI.Size.statusBar.height,
      1 / sectionIds.length * 100);
    this.state = {
      sectionIds,
      rowIds,
      dataSource: dataSource.cloneWithRowsAndSections(dataBlob, sectionIds, rowIds)
    };
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  componentWillMount() {

    const scroll = (evt, gestureState)=> {
      const y = evt.nativeEvent.pageY;
      const first = this.getFirstLetterPosition();
      const index = Math.floor((y - first ) / this.letterHeight);
      this.setState({
        letterIndex: index,
        visible: true
      });
      this.scrollTo(index)
    };
    this._panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: ()=>true,
      onPanResponderGrant: scroll,
      onPanResponderMove: scroll,
      onPanResponderRelease: (evt, gestureState) => {
        this.setState({
          visible: false
        })
      }
    })
  }

  getFirstLetterPosition() {
    return UI.Size.navBar.height + UI.Size.statusBar.height;
  }

  _getData() {
    return list.filter(l=>l.zip.length === 3);
  }

  scrollTo(sectionIndex) {
    const sectionItemHeight = 24;
    const rowItemHeight = 50;
    const {sectionIds, rowIds}=this.state;
    let position = sectionItemHeight * sectionIndex;
    let listHeight = sectionItemHeight * sectionIds.length;
    for (var i = 0; i < sectionIds.length; i++) {
      if (i < sectionIndex) {
        position += rowIds[i].length * rowItemHeight
      }
      listHeight += rowIds[i].length * rowItemHeight
    }
    if (position + this.visibleListHeight > listHeight) {
      position = listHeight - this.visibleListHeight;
    }
    // scroll
    this._listView.scrollTo({
      y: position,
      animated: false
    });
  }

  onCarItemPress() {
    this.slider.open()
  }

  onCarGroupPress() {
    this.modal.open();
  }

  onScroll() {
    this.slider.close();
  }

  setVisibleListHeight(offset) {
    this.visibleListHeight = UI.Size.getPercent(100, UI.Size.navBar.height) - offset;
  }

  renderRow(rowData, sectionId, rowId) {
    return (
      <TouchableOpacity
        style={UI.CommonStyles.select_car_row}
        onPress={this.onCarItemPress.bind(this)}
      >
        <View style={UI.CommonStyles.select_car_row_img_container}>
          <Image source={require('../images/car/car@2x.png')} style={UI.CommonStyles.select_car_row_img}/>
        </View>
        <View style={UI.CommonStyles.select_car_row_right}>
          <Text style={UI.CommonStyles.select_car_row_text}>
            {rowData}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }

  renderSectionHeader(sectionData, sectionId) {
    return (
      <View style={UI.CommonStyles.select_car_section}>
        <Text style={UI.CommonStyles.select_car_section_text}>
          {sectionData}
        </Text>
      </View>
    );
  }

  renderHot() {
    const hots = list.filter(l=>l.zip.length === 3 && l.hot);
    return (
      <View style={UI.CommonStyles.select_car_hot}>
        <View style={UI.CommonStyles.select_car_hot_title}>
          <Text style={UI.CommonStyles.select_car_hot_title_text}>热门</Text>
        </View>
        <View style={UI.CommonStyles.wrap_list}>
          {hots.map((h, index)=> {
            return (
              <View key={index} style={UI.CommonStyles.select_car_hot_item}>
                <Text style={UI.CommonStyles.select_car_hot_item_text}>{h.name}</Text>
              </View>
            )
          })}
        </View>
      </View>
    )
  }

  renderLetters(letter, index) {
    return (
      <View key={index} style={[UI.CommonStyles.select_car_letter_item,{height:this.letterHeight}]}>
        <Text style={UI.CommonStyles.select_car_letter_item_text}>{letter}</Text>
      </View>
    );
  }

  render() {
    const {router}=this.props;
    const {sectionIds, letterIndex, visible}=this.state;
    const nav = {
      Left: [{
        source: require('../images/icon/back@2x.png'),
        style: {
          width: 13,
          height: 15
        },
        onPress: ()=> {
          router.pop();
        }
      }],
      Center: [{
        isText: true,
        text: '选择你的爱车'
      }]
    };

    const childScheme = [{
      name: '奥迪',
      data: [{
        name: 'A3'
      }, {
        name: 'A4'
      }, {
        name: 'A5'
      }, {
        name: 'A6'
      }]
    }, {
      name: '奥迪进口',
      data: [{
        name: 'Q3'
      }, {
        name: 'Q4'
      }, {
        name: 'Q5'
      }, {
        name: 'Q6'
      }]
    }, {
      name: '奥迪',
      data: [{
        name: 'A3'
      }, {
        name: 'A4'
      }, {
        name: 'A5'
      }, {
        name: 'A6'
      }]
    }, {
      name: '奥迪进口',
      data: [{
        name: 'Q3'
      }, {
        name: 'Q4'
      }, {
        name: 'Q5'
      }, {
        name: 'Q6'
      }]
    }, {
      name: '奥迪',
      data: [{
        name: 'A3'
      }, {
        name: 'A4'
      }, {
        name: 'A5'
      }, {
        name: 'A6'
      }]
    }, {
      name: '奥迪进口',
      data: [{
        name: 'Q3'
      }, {
        name: 'Q4'
      }, {
        name: 'Q5'
      }, {
        name: 'Q6'
      }]
    }, {
      name: '奥迪',
      data: [{
        name: 'A3'
      }, {
        name: 'A4'
      }, {
        name: 'A5'
      }, {
        name: 'A6'
      }]
    }, {
      name: '奥迪进口',
      data: [{
        name: 'Q3'
      }, {
        name: 'Q4'
      }, {
        name: 'Q5'
      }, {
        name: 'Q6'
      }]
    }];

    const carItems = [{
      name: '2014-标准版'
    }, {
      name: '2014-标准版'
    }, {
      name: '2014-标准版'
    }, {
      name: '2014-标准版'
    }, {
      name: '2014-标准版'
    }, {
      name: '2014-标准版'
    }, {
      name: '2014-标准版'
    }, {
      name: '2014-标准版'
    }, {
      name: '2014-标准版'
    }, {
      name: '2014-标准版'
    }];

    return (
      <View style={[UI.CommonStyles.container,{backgroundColor:UI.Colors.gray}]}>
        <NavBar options={nav}/>
        <View style={UI.CommonStyles.container}>
          <ListView
            ref={ref=>this._listView=ref}
            dataSource={this.state.dataSource}
            renderSectionHeader={this.renderSectionHeader}
            renderRow={this.renderRow.bind(this)}
            onScroll={this.onScroll.bind(this)}
            initialListSize={20}
            scrollRenderAheadDistance={500}
            onLayout={({ nativeEvent: { layout: { y: offset } } }) => this.setVisibleListHeight(offset)}
          />
          <View style={UI.CommonStyles.select_car_letter} {...this._panResponder.panHandlers}>
            {sectionIds.map((letter, index) => this.renderLetters(letter, index))}
          </View>
          {visible && (
            <View style={UI.CommonStyles.select_car_section_modal}>
              <Text style={UI.CommonStyles.select_car_section_modal_text}>
                {sectionIds[letterIndex]}
              </Text>
            </View>
          )}
          <SlidePanel
            ref={ref=>this.slider=ref}
            style={[{
              top:0,
              width:UI.Size.window.width-50,
              height:UI.Size.window.height-UI.Size.navBar.height-UI.Size.statusBar.height,
              backgroundColor:UI.Colors.white
            },UI.CommonStyles.select_car_panel]}
            position={'right'}
            offset={UI.Size.window.width-50}
          >
            <ScrollView>
              {childScheme.map((group, gIndex)=> {
                return (
                  <View style={UI.CommonStyles.select_car_panel_group} key={gIndex}>
                    <View style={UI.CommonStyles.select_car_panel_group_title}>
                      <Text>{group.name}</Text>
                    </View>
                    <View style={UI.CommonStyles.select_car_panel_group_child}>
                      {group.data.map((dataItem, dataIndex)=> {
                        return (
                          <TouchableOpacity
                            key={dataIndex}
                            style={UI.CommonStyles.select_car_panel_group_item}
                            onPress={this.onCarGroupPress.bind(this)}
                          >
                            <Text>{dataItem.name}</Text>
                          </TouchableOpacity>
                        )
                      })}
                    </View>
                  </View>
                )
              })}
            </ScrollView>
          </SlidePanel>
        </View>
        <Modal
          ref={ref=>this.modal=ref}
          style={UI.CommonStyles.select_car_modal}
          swipeToClose={false}
          position="bottom"
        >
          <View style={UI.CommonStyles.select_car_modal_title}>
            <Text style={UI.CommonStyles.select_car_modal_title_left}>已选车型</Text>
            <Text style={UI.CommonStyles.select_car_modal_title_right}>奥迪-奥迪进口-Q5-2.0T-2014年</Text>
          </View>
          <ScrollView>
            {carItems.map((car, index)=> {
              return (
                <View
                  key={index}
                  style={UI.CommonStyles.select_car_modal_item}>
                  <Text>{car.name}</Text>
                </View>
              )
            })}
          </ScrollView>
        </Modal>
      </View>
    )
  }

}


export default connect((state, props) => ({}), dispatch => ({}), null, {
  withRef: true
})(SelectCar);
