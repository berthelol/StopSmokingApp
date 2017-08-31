import React from 'react';
import {TextInput,View,Text} from 'react-native';

const Input = ({label,value,onChangeText,placeholder,secureTextEntry,onTop}) => {
  return (
    <View style={[styles.containerStyle,onTop==true?{justifyContent:'space-between',alignItems:'flex-start',marginTop:15,marginBottom:15}:{flexDirection:"row"}]}>
      <Text numberOfLines={1} style={styles.labelStyle}>{label}</Text>
      <TextInput secureTextEntry={secureTextEntry} autoCorrect={false} placeholder={placeholder} style={styles.inputStyle} value={value} onChangeText={onChangeText} autoCapitalize = 'none' />
    </View>
  );
};

const styles = {
  inputStyle : {
    color : "#000",
    paddingRight:5,
    paddingLeft:5,
    fontSize:15,
    lineHeight:23,
    flex:1,
    width:'100%',
    paddingLeft:10,
  },
  labelStyle:{
    fontSize:15,
    paddingLeft:10,
    width:'auto',
    flex:1
  },
  containerStyle:{
    height:40,
    flex:1,
    flexDirection:"row",
    alignItems:'center'
  }
}
export {Input};
