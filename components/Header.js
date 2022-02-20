import React from "react";
import {View, Text } from 'react-native';
import { SIZES,FONTS, COLORS} from '../constants';
import LinearGradient from "react-native-linear-gradient";

const Header = ({leftComponent, rightComponent, containerStyle, title}) => {
    return (
        
        <View style={{flexDirection: 'row', shadowColor:'black', shadowOffset:{width:0, height:2}, shadowOpacity: 0.8, position: 'relative', ...containerStyle}}>
            <View>
                {leftComponent}
            </View>
            <View style={{flex: 1}}>
                <Text style={{...FONTS.h3, color:'orange'}}>{title}</Text>
            </View>
            <View>
                {rightComponent}
            </View>
        </View>
    )
}
export default Header;