import React from 'react';
import {
    TouchableOpacity, image, View
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
            height: 60,
            width: 130,
            backgroundColor: COLORS.grey,
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
                    height:25,
                    width: 25,
                    color: value > 1 ? COLORS.primary : COLORS.grey,
                }}
                onPress={onMinus}

            />


            <View style={{
                flex:1,
                alignItems: 'center',
                justifyContent: '1' 
            }}>
                <Text> style={{...FONTS.h2}}
                    {value}
                </Text>
            </View>

        <IconButton
                containerStyle={{
                    width: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                icon={'minus'}
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