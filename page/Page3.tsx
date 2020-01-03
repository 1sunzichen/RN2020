
import React,{Component} from 'react';
import _ from 'lodash';
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
  TextInput
} from 'react-native';              
 class Page3 extends Component{
  render(){
    const {navigation}=this.props;
    const {state,setParams}=navigation;
    const {params}=state;
    const showText=params&&params.mode==="edit"?"正在编辑":"编辑完成"
    return(
      <View style={{flexDirection:"column",flexWrap:"wrap",backgroundColor:"#ff0",height:500
      ,alignItems:"flex-end"}}>
        <View style={{backgroundColor:"darkcyan",width:50,height:50,margin:5}}>
        <Text>
          Page3{showText}
        </Text>
        <TextInput
            style={styles.input}
            onChangeText={
              text=>{
                setParams({title:text})
                  }
                }
        />
        </View>
      </View>
    )
  }
} 
const styles=StyleSheet.create({
  container:{
    flex:1
  },
  welcome:{
    fontSize:20,
    textAlign:"center",
    margin:10
  },
  input:{
    height:50,
    borderWidth:1,
    marginTop:10,
    borderColor:"blue"
  }

})

export default Page3;