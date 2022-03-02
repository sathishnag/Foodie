import React from "react";

import TextButton from "./TextButton";
import { FONTS, SIZES, COLORS } from "../constants";
import { View, Text} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { fonts } from "react-native-elements/dist/config";
import RazorpayCheckout from 'react-native-razorpay';

const FooterTotal = ({onPress}) => {
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
                onPressEve={() => {
                    var options = {
                    description: 'Credits towards consultation',
                    image: 'https://i.imgur.com/3g7nmJC.png',
                    currency: 'INR',
                    key: 'rzp_test_kciDCmV3IqJl3h',
                    amount: '5000',
                    name: 'Acme Corp',
                    order_id: 'order_J112uAWw89vOAq',//Replace this with an order_id created using Orders API.
                    prefill: {
                      email: 'sathish.auttpc@gmqil.com',
                      contact: '9191919191',
                      name: 'Gaurav Kumar'
                    },
                    theme: {color: '#FC6D3F'}
                  }
                  RazorpayCheckout.open(options).then((data) => {
                    // handle success
                    alert(`Success: ${data.razorpay_payment_id}`);
                  }).catch((error) => {
                    // handle failure
                    alert(`Error: ${error.code} | ${error.description}`);
                  });
                }}
                >
                </TextButton>

            </View>
        </View>
    )
}
export default FooterTotal;