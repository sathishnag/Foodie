import {
    TouchableOpacity, image
} from 'react-native';
import { Icon } from 'react-native-vector-icons/Icon';
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
              <Icon name="home" size={20} style={{width:30, height:30, ...iconStyle}}  color={COLORS.white}></Icon>
          </Text>

        </TouchableOpacity>
    )
}
export default IconButton;