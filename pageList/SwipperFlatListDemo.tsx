import React, {Component} from 'react';
import {Colors} from 'react-native/Libraries/NewAppScreen';

interface Person {}
import {
  View,
  Text,
  StyleSheet,
  RefreshControl,
  ActivityIndicator,
  TouchableHighlight,
  Alert,
} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
const cityData = [
  '北京',
  '上海',
  '四川',
  '云南',
  '吉林',
  'heilongjiang',
  '1212',
  '1212',
];
class SwipperFlatListDemo extends Component<Person> {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      dataArray: cityData,
    };
  }
  loadData(refreshing) {
    if (refreshing) {
      this.setState({
        isLoading: true,
      });
    }
    setTimeout(() => {
      let dataArr = [];
      if (refreshing) {
        for (let index = cityData.length - 1; index > 0; index--) {
          const element = cityData[index];
          dataArr.push(element);
        }
      } else {
        dataArr = this.state.dataArray.concat(cityData);
      }
      this.setState({
        dataArray: dataArr,
        isLoading: false,
      });
    }, 2000);
  }
  _renderItem(data) {
    return (
      <View style={stylesItem.itemStyle}>
        <Text style={stylesItem.itemText}>{data.item}</Text>
      </View>
    );
  }
  getIndic() {
    return (
      <View style={stylesItem.indicatorContainer}>
        <ActivityIndicator size={'large'} animating={true} />
        <Text>正在加载更多...</Text>
      </View>
    );
  }
  render() {
    return (
      <View>
        <Text>123</Text>
        <SwipeListView
          data={this.state.dataArray}
          renderItem={data => this._renderItem(data)}
          refreshing={this.state.isLoading}
          onRefresh={() => {
            this.loadData();
          }}
          onRowOpen={(rowKey, rowMap) => {
            if (rowMap[1] !== undefined) {
              setTimeout(() => {
                rowMap[rowKey].closeRow();
              }, 2000);
            }
          }}
          renderHiddenItem={() => (
            <View style={stylesItem.rowBack}>
              <View style={stylesItem.leftWrap}>
                <TouchableHighlight
                  onPress={_ => {
                    //rowMap[`${secId}${rowId}`].closeRow();
                    Alert.alert('nini1');
                  }}>
                  <Text style={stylesItem.rowBackLeft}>置顶</Text>
                </TouchableHighlight>
              </View>
              <View>
                <TouchableHighlight
                  onPress={() => {
                    Alert.alert('删除');
                  }}>
                  <Text style={stylesItem.rowBackRight}>删除</Text>
                </TouchableHighlight>
              </View>
            </View>
          )}
          leftOpenValue={75}
          rightOpenValue={-75}
          refreshControl={
            <RefreshControl
              title={'Loading'}
              colors={['red']}
              tintColor={['red']}
              refreshing={this.state.isLoading}
              onRefresh={() => {
                this.loadData(true);
              }}
            />
          }
          ListFooterComponent={() => this.getIndic()}
          onEndReached={() => {
            this.loadData();
          }}
        />
      </View>
    );
  }
}

const stylesItem = StyleSheet.create({
  rowBack: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'red',
    margin: 5,
  },
  leftWrap: {
    backgroundColor: 'blue',
  },
  rowBackLeft: {
    textAlign: 'center',
    fontSize: 30,
    lineHeight: 100,
    height: 100,
    width: 75,
  },
  indicatorContainer: {
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
  itemStyle: {
    backgroundColor: 'darkcyan',
    margin: 5,
    height: 100,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  itemText: {
    fontSize: 22,
    textAlign: 'center',
    lineHeight: 100,
  },
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default SwipperFlatListDemo;
