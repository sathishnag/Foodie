import React from "react";
import { View, Text, Image, FlatList, Dimensions } from "react-native"
import Header from "../components/Header";
import HotelCard from "../components/HotelCard";
import { SIZES, COLORS, FONTS, constants, icons, images } from "../constants";
import { TouchableOpacity, TouchableWithoutFeedback } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { color } from "react-native-reanimated";

const {width: widthScreen, height: heightScreen} = Dimensions.get('screen');
const ui_array = [
    {id: 0, label:'Krishna'},
    {id: 1,label:'Ramalingam'},
    {id: 2, label:'Ananda bhavan'},
    {id: 3,label:'Anna poorani'},
    {id: 4},
    {id: 5},
    {id: 6},
    {id: 7},
  ];

const HotelList = ({navigation}) => {

    function renderHeader() {
        return(
            <Header 
          containerStyle={{
            height:50,
            marginTop : 20,
            alignItems:'center',
            paddingHorizontal:SIZES.padding
          }} 
          leftComponent={
            <TouchableOpacity 
            onPress={() => {navigation.goBack()}}
            style={{width: 40,
                height:40, 
                alignItems:'center', 
                justifyContent:'center',
                borderWidth:1,
                borderColor: COLORS.lightGray2,
                borderRadius: SIZES.radius
                }}>

            <Text>
                <Icon name="chevron-left" size={20} light></Icon>
            </Text>
           </TouchableOpacity>
                          }
              title={'Pure Veg Restaurants '}  
                          />          
        );
    }

    function rederDetail() {
        return(
            <View style={{paddingHorizontal : SIZES.base,backgroundColor:'white'}}>
            <FlatList
          data={ui_array}
          keyExtractor={(item) => item.id.toString()}
          scrollEnabled={true}
          renderItem={({item}) => {
            return (
                <TouchableWithoutFeedback key={item.id} onPress = {() => {navigation.navigate('Hotel Detail')}}
                style={{
                  width: widthScreen * 0.94,
                  height: heightScreen * 0.14,
                  borderWidth: 4.0,
                  marginHorizontal : SIZES.padding - 6,
                  marginBottom: SIZES.base,
                  marginTop: SIZES.base,
                  flexDirection:'row',
                  justifyContent: 'center',
                  borderRadius: 18.0,
                  borderColor: 'white',
                  backgroundColor: 'white',
                  shadowColor: '#52006A',
                  elevation: 4,
                  shadowColor: '#52006A',
                }}>
                    <View style={{padding:8}}>
                      <Image style={{marginLeft:'auto',marginRight:'auto'}} source={images.burger_restaurant_2}></Image>
                    </View>
                    <View style={{flex:1, marginLeft:20}}>
                      <Text style={{...FONTS.h5}}>{item.label}</Text>
                      <Text style={{...FONTS.body5, color:COLORS.grey}}>South indian</Text>
                    </View>
              </TouchableWithoutFeedback>
            );
          }}
        />
            </View>
        )
    }

    return(
        <View style={{backgroundColor:'white'}}>
            {rederDetail()}

         </View>)
         
}
export default HotelList;