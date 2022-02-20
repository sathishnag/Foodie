import React from "react";
import {
    TouchableOpacity,
    Text
} from 'react-native'

import {FONTS,COLORS} from '../constants';

const TextButton = ({
    buttonContainerStyle,
    onPressEve,
    label,
    labelStyle,
}) => {
    return (
        <TouchableOpacity
            style={{
                alignItems:'center',
                justifyContent:'center',
                ...buttonContainerStyle
            }}
            onPress={onPressEve}
        >
            <Text 
                style={{
                    color: COLORS.white,
                    ...FONTS.h3,
                    ...labelStyle
                }}
            >
                {label}
            </Text>
        </TouchableOpacity>
    );
}
export default TextButton;