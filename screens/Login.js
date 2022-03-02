import React, { useState } from 'react';
import { View, Text, Image, FlatList , TextInput, StyleSheet} from "react-native";
import {TouchableOpacity } from "react-native-gesture-handler";
import { SIZES, COLORS, FONTS, constants, icons } from "../constants";
import CategoryCard from "../components/CategoryCard";
import Icon from 'react-native-vector-icons/FontAwesome'
import Header from "../components/Header";
import TextButton from "../components/TextButton";

const Login = ({navigation}) => {

    const [confirm, setConfirm] = useState(null);

    const [code, setCode] = useState('');

    return(
        <View style={{flex:1, backgroundColor:'white'}}>
                 <View style={{flex:0.4,justifyContent:'center',alignItems:'center'}}>
                     <Text style={{color:COLORS.primary, ...FONTS.h1, marginTop:32}}>Satz</Text>
                 </View>
                 <View style={{alignItems:'center'}}>
                 <Text style={{color:COLORS.primary, ...FONTS.h5, marginTop:32}}>Login with phoneNumber</Text>
                 </View>
                 <View style={{flex:1, backgroundColor:'white', flexDirection:'row'}}>
                <Text style={{top:18, left:8, ...FONTS.h5, color:COLORS.primary}}>+91</Text>
                 <TextInput 
                    value={code} onChangeText={text => setCode(text)}
                    keyboardType={'phone-pad'}
                    style={styles.input}
                    placeholder="Phone number">
                    </TextInput>
                 </View>
                 <TextButton 
                buttonContainerStyle={{
                    height: 60,
                    marginTop: SIZES.padding,
                    borderRadius: SIZES.radius,
                    backgroundColor: COLORS.primary
                }}
                label='Login'
                onPressEve={() => navigation.navigate('OtpVerification',{
                    phone: '7358882516' 
                })}
                >
                </TextButton>
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
      height: 40,
      width:"80%",
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
  });
  
export default Login;