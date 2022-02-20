import React from 'react';
import {TouchableOpacity, Text, Image, Dimensions, View} from 'react-native';
import { SIZES, COLORS, FONTS, constants, icons } from "../constants";

const {width: widthScreen, height: heightScreen} = Dimensions.get('screen');

const CategoryCard = ({
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
        width: widthScreen * 0.29,
        height: heightScreen * 0.14,
        borderWidth: 4.0,
        marginHorizontal : SIZES.padding - 6,
        marginBottom: SIZES.base,
        marginTop: SIZES.base,
        justifyContent: 'space-between',
        borderRadius: 18.0,
        borderColor: 'white',
        backgroundColor: '#ffeee6',
        shadowColor: '#52006A',
        elevation: 4,
        shadowColor: '#52006A',
      }}>
          <View style={{flex:1}}>
            <Text style={{textAlign:'center',fontSize:10 , marginLeft:8, marginRight:8,...FONTS.body5}}>veg & Non veg</Text>
            <Image resizeMode="contain" style={{marginLeft:'auto',marginRight:'auto', flex:1}} source={icons.donut}></Image>
          </View>
    </TouchableOpacity>
  );
};

export default CategoryCard;
