import React from "react";

import TextButton from "./TextButton";
import { FONTS, SIZES, COLORS } from "../constants";
import { View, Text} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { fonts } from "react-native-elements/dist/config";

const FooterTotal = ({on}) => {
    return (
        <View>
            <LinearGradient
                start={{x:0, y:0}}
                end={{ x:0, y:1}}
                colors={[COLORS.transparent, COLORS.grey]}
                style={{
                    position: 'absolute',
                    top: -15,
                    left: 0,
                    right: 0,
                    height: 50,
                    borderTopLeftRadius: 15,
                    borderTopRightRadius: 15
                }}
            >
            </LinearGradient>
            <View 
                style={{
                    padding: SIZES.padding,
                    borderBottomLeftRadius: 20,
                    borderTopRightRadius: 20,
                    backgroundColor: COLORS.white
                }}
            >
                <View
                    style={{
                        flexDirection:"row"
                    }}
                >
                    <Text style={{ flex:1, ...FONTS.body3}}>SubTotal</Text>
                    <Text style={{ ...FONTS.h4}}>5000</Text>
                </View>

                <View
                style={{
                    flexDirection: 'row',
                    marginTop: SIZES.base,
                    marginBottom: SIZES.padding
                }}
                >
                    <Text style={{ flex:1, ...FONTS.body3}}>
                        shipping fee
                    </Text>
                    <Text>
                        1000
                    </Text>
                </View>

                <View
                style={{
                    flexDirection: 'row',
                    marginTop: SIZES.base,
                    marginBottom: SIZES.padding
                }}
                >
                    <Text style={{ flex:1, ...FONTS.h2}}>
                        Total
                    </Text>
                    <Text style={{...FONTS.h2}}>
                        1000
                    </Text>
                </View>

                <TextButton 
                buttonContainerStyle={{
                    height: 60,
                    marginTop: SIZES.padding,
                    borderRadius: SIZES.radius,
                    backgroundColor: COLORS.primary
                }}
                label='Pay your order'
                onPressEve={() => {alert()}}
                >
                </TextButton>

            </View>
        </View>
    )
}
export default FooterTotal;