import React from 'react';
import {TouchableOpacity, Text, Image, Dimensions, View} from 'react-native';
import { SIZES, COLORS, FONTS, constants, icons, images} from "../constants";

const {width: widthScreen, height: heightScreen} = Dimensions.get('screen');

const HotelCard = ({
  bgColour,
  borderColour,
  image,
  title,
  onPress,navigation
}) => {
  return (
    <TouchableOpacity
      onPress={() => onPress()}
      style={{
        width: widthScreen * 0.8,
        height: heightScreen * 0.14,
        borderWidth: 4.0,
        marginHorizontal : SIZES.padding - 6,
        marginBottom: SIZES.base,
        marginTop: SIZES.base,
        justifyContent: 'center',
        borderRadius: 18.0,
        borderColor: 'white',
        backgroundColor: '#ffeee6',
        shadowColor: '#52006A',
        elevation: 4,
        shadowColor: '#52006A',
      }}>
          <View style={{alignItems:'center', justifyContent:'ceter'}}>
            <Image resizeMode="contain" style={{marginLeft:'auto',marginRight:'auto', flex:1}} source={images.burger_restaurant_1}></Image>
          </View>
          <View style={{flex:1}}>
            <Text>Kadothkajsdasdasdaddddddddddddddan</Text>
          </View>
    </TouchableOpacity>
  );
};

export default HotelCard;
