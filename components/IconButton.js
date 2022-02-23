import {
    TouchableOpacity, image, Text
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { COLORS } from '../constants';

const IconButton = ({containerStyle, icon, iconStyle, onPress}) => {
    return (
        <TouchableOpacity
            style = {{
                ...containerStyle
            }}
            onPress={onPress}
        >
          <Text>
              <Icon name={icon} size={16} style={{width:15, height:15, ...iconStyle}}  color={COLORS.white}></Icon>
          </Text>

        </TouchableOpacity>
    )
}
export default IconButton;