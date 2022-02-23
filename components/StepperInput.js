import React from 'react';
import {
    TouchableOpacity, image, View, Text
} from 'react-native';
import {FONTS,COLORS, icons, SIZES } from '../constants';
import IconButton from './IconButton';

const StepperInput = ({
    containerStyle,
    value = 1,
    onAdd,
    onMinus
}) => {
    return (
        <View
        style = {{
            flexDirection: 'row',
            height: 40,
            width: 150,
            left: 2,
            backgroundColor: COLORS.lightGray2,
            borderRadius: SIZES.radius,
            ...containerStyle
        }}
        >
            <IconButton
                containerStyle={{
                    width: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                icon={'minus'}
                iconStyle = {{
                    height:15,
                    width: 15,
                    color: value > 1 ? COLORS.primary : COLORS.primary,
                }}
                onPress={onMinus}

            />


            <View style={{
                flex:1,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Text style={{...FONTS.h4}}>
                    {value}
                </Text>
            </View>

        <IconButton
                containerStyle={{
                    width: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                icon={'plus'}
                iconStyle = {{
                    height:25,
                    width: 25,
                    color: COLORS.primary ,
                }}
                onPress={onAdd}

            />
            
        </View>
    )
}
export default StepperInput;