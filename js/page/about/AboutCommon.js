// 组装者模式 公共部分
import {View,Image,Text,Dimensions,StyleSheet} from 'react-native';
import BackPressComponent from '../common/BackPressComponent.js';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import GlobalStyles from '../../res/GlobalStyles.js';
const THEME_COLOR='#678';
export default class AboutCommon{
  constructor(props,updateState) {
    this.updateState=updateState;
    this.props=props;
    this.backPress=new BackPressComponent({backPress:this.onBackPress})
  }
  componentDidMount() {
     this.backPress.componentDidMount();
     fetch("./github_config.json")
     .then(response=>{
       if(response.ok){
         return response.json()
       }
       throw new Error("NetWork")
       .then(config=>{
         if(config){
           this.updateState({
              data:config
           })
         }
       })
       .catch(e=>{
         console.log(e);
         
       })
     })
  }
  onShare(){

  }
  componentWillUnmount() {
     this.backPress.componentWillUnmount();
  }
  onBackPress() {
        NavigationUtil.resetBack(this.props.navigation);
        return true;
  }
  getParallaxRenderConfig(params){
    let config={};

    //取出头像 不是对象（string） 要封装一下 
    let avatar=typeof(params.avatar)==="string"
    ?{uri:params.avatar}:params.avatar
    // 背 景设计
    config.renderBackground=()=>{
       <View key="background">
                <Image source={{uri: params.backgroundImg,
                                width: window.width,
                                height: PARALLAX_HEADER_HEIGHT}}/>
                <View style={{position: 'absolute',
                              top: 0,
                              width: window.width,
                              backgroundColor: 'rgba(0,0,0,.4)',
                              height: PARALLAX_HEADER_HEIGHT}}/>
              </View>
    }


    // 前 景设计
    config.renderForeground=() => {
              <View key="parallax-header" style={ styles.parallaxHeader }>
                <Image style={ styles.avatar } source={avatar}/>
                <Text style={ styles.sectionSpeakerText }>
                    {params.name}
                  </Text>
                <Text style={ styles.sectionTitleText }>
                    {params.description}
                </Text>
              </View>
      }
    
    //悬停 区域
     config.renderStickyHeader=() => (
              <View key="sticky-header" style={styles.stickySection}>
                <Text style={styles.stickySectionText}>{params.name}</Text>
              </View>
            )

    //固定 区域
     config.renderFixedHeader=() => (
              <View key="fixed-header" style={styles.fixedSection}>
                {ViewUtil.getLeftButton(()=>NavigationUtil.resetBack(this.props.navigation))}
                {ViewUtil.getShareButton(()=>this.onShare())}
              </View>
            )

    return config;
  }

  render(contentView,params){
    const renderConfig=this.getParallaxRenderConfig(params);
    return(
      <ParallaxScrollView
      backgroundColor={THEME_COLOR}
      contentBackgroundColor={GlobalStyles.backgroundColor}
      parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}
      stickyHeaderHeight={STICKY_HEIGHT}
      backgroundScrollSpeed={10}
      {...renderConfig}
     >
      {contentView}
    </ParallaxScrollView>
    )
  }
}
const window = Dimensions.get('window');
const AVATAR_SIZE=90;
const PARALLAX_HEADER_HEIGHT=270;
const STICKY_HEIGHT=(Platform.OS==="ios")?GlobalStyles.nav_bar_height_ios+20:
GlobalStyles.nav_bar_height_and;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: window.width,
    height: PARALLAX_HEADER_HEIGHT
  },
  stickySection: {
    height: STICKY_HEADER_HEIGHT,
    width: 300,
    justifyContent: 'flex-end'
  },
  stickySectionText: {
    color: 'white',
    fontSize: 20,
    margin: 10
  },
  fixedSection: {
    position: 'absolute',
    bottom: 10,
    right: 10
  },
  fixedSectionText: {
    color: '#999',
    fontSize: 20
  },
  parallaxHeader: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    paddingTop: 100
  },
  avatar: {
    marginBottom: 10,
    borderRadius: AVATAR_SIZE / 2
  },
  sectionSpeakerText: {
    color: 'white',
    fontSize: 24,
    paddingVertical: 5
  },
  sectionTitleText: {
    color: 'white',
    fontSize: 18,
    paddingVertical: 5
  },
  row: {
    overflow: 'hidden',
    paddingHorizontal: 10,
    height: ROW_HEIGHT,
    backgroundColor: 'white',
    borderColor: '#ccc',
    borderBottomWidth: 1,
    justifyContent: 'center'
  },
  rowText: {
    fontSize: 20
  }
});