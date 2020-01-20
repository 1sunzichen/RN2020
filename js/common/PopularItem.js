import React,{Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity,TextInput, Button,
Image} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
class PopularItem extends Component{
render(){
     const {item}=this.props;
     let favoriteButton=<TouchableOpacity
      style={{padding:6}}
      onPress={()=>{

      }}
      underlayColor={"transparent"}
     >
        <FontAwesome
          name={'star-o'}
          size={26}
          style={{color:"red",
          lineHeight:26}}
        />
        
     </TouchableOpacity>;

     if(!item||!item.owner) return null;
     return(
           <TouchableOpacity
            onPress={()=>{
              this.props.onSelect
            }}
           >
            <View style={styles.cell_container}>
              <Text style={styles.title}>
                {item.full_name}
              </Text>
              <Text>
                {item.description}
              </Text>
              <View style={{display:"flex",flexDirection:'row',justifyContent:"space-between"}}> 
                <View style={{flexDirection:'row',justifyContent:"space-between",
                paddingTop:10}}>
                  <Text>Author:</Text>
                  <Image
                    style={{height:22,width:22}}
                    source={{uri:item.owner.avatar_url}}
                  />
                </View>
                <View style={{flexDirection:'row',justifyContent:"space-between",
                paddingTop:10}}>
                  <Text>star:</Text>
                  <Text>{item.stargazers_count}</Text>
                </View>
                <View>
                <View style={{flexDirection:'row',justifyContent:"space-between"}}>
                 {favoriteButton}
                </View>
                </View>
              </View>
            </View>
           </TouchableOpacity>
            )
         }
}
const styles=StyleSheet.create({
  cell_container:{
    backgroundColor:'white',
    marginVertical:3,
    padding:10,
    marginLeft:5,
    borderColor:'#dddddd',
    borderWidth:0.5,
    borderRadius:2,
    shadowColor:'gray',
    shadowOffset:{width:0.5,height:0.5},
    shadowRadius:1,
    elevation:2
  },
  row:{
    justifyContent:"space-between",
    flexDirection:'row',
    alignItems:"center"
  },
  title:{

  }
})
export default PopularItem;