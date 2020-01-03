
import React,{Component} from 'react';
interface Person{
  name:string,
  age:number
}
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
} from 'react-native';      
// 打开侧边栏吗
import { DrawerActions } from 'react-navigation-drawer';        
 class Page4 extends Component{
  render(){
    const {navigation}=this.props;
    return(
      <View style={{flexDirection:"column",flexWrap:"wrap",backgroundColor:"#ff0",height:500
      ,alignItems:"flex-end"}}>
        <View style={{backgroundColor:"darkcyan",width:"100%",height:50,margin:5}}>
        <Text>
          Page4
        </Text>
        <Button title={"打开侧边栏"} onPress={()=>{
          return navigation.dispatch(DrawerActions.openDrawer());
          }
        }/>
        <Button title={"关闭侧边栏"} onPress={()=>
        {
          return   navigation.dispatch(DrawerActions.closeDrawer());
          }
       

        }/>
        <Button title={"打开/关闭侧边栏"} onPress={()=>{
          return navigation.dispatch(DrawerActions.toggleDrawer());
          }

        }/>
       
        </View>

 
  
     
   
  

      </View>
    )
  }
} 

export default Page4;