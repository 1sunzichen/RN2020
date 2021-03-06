import React, {Component} from 'react';
import {Colors} from 'react-native/Libraries/NewAppScreen';

interface Person {
  name: string;
  age: number;
}
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
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
class FlatListDemo extends Component {
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
      <View style={styles.itemStyle}>
        <Text style={styles.itemText}>{data.item}</Text>
      </View>
    );
  }
  getIndic() {
    return (
      <View style={styles.indicatorContainer}>
        <ActivityIndicator size={'large'} animating={true} />
        <Text>正在加载更多...</Text>
      </View>
    );
  }
  render() {
    return (
      <View>
        <View>
          <FlatList
            data={this.state.dataArray}
            renderItem={data => this._renderItem(data)}
            // refreshing={this.state.isLoading}
            // onRefresh={() => {
            //   this.loadData();
            // }}
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
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

export default FlatListDemo;
