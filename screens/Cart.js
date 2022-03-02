import React from "react";
import { View, Text, Image, FlatList, Dimensions, StyleSheet } from "react-native"
import Header from "../components/Header";
import HotelCard from "../components/HotelCard";
import { SIZES, COLORS, FONTS, constants, icons, images } from "../constants";
import { TouchableOpacity, TouchableWithoutFeedback } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { color } from "react-native-reanimated";
import StepperInput from "../components/StepperInput";
import FooterTotal from "../components/FooterTotal";
import RazorpayCheckout from 'react-native-razorpay';

const Cart = ({navigation}) => {

    const ui_array = [
        {id: 0, label:'Krishna'},
        {id: 1,label:'Ramalingam'},
        {id: 2, label:'Ananda bhavan'},
        {id: 3,label:'Anna poorani'}
      ];

    function renderList() {
        return (
            <View style={{paddingHorizontal : SIZES.base,backgroundColor:'white', flex:1}}>
            <FlatList
          data={ui_array}
          keyExtractor={(item) => item.id.toString()}
          scrollEnabled={true}
          renderItem={({item}) => {
            return (
               <View
               style={{
                  height:80,
                  backgroundColor: COLORS.lightGray2,
                  ...styles.cartItemContainer 
               }}
               >
                   <View
                        style={{
                            width: 90,
                            height: 70,
                        }}
                    >
                        <Image source={images.crispy_chicken_burger}
                        resizeMode="contain"
                        style={{
                            top: 8,
                            width: "90%",
                            height: "80%"
                        }}
                        >
                        </Image>
                   </View>
                   <View style={{flex:1}}
                   >
                       <Text style={{...FONTS.body4}}>Biriyanisdfsdffff fdsf</Text>
                       <Text style={{...FONTS.h5, color:COLORS.primary}}>23</Text>
                   </View>
                   <StepperInput containerStyle={{
                       color:'white'
                   }}>
                    </StepperInput>
               </View>
            );
          }}
        />
            </View>
        )
    }

    return(
        <View style={{backgroundColor:'white', flex:1}}>
           {renderList()}
           <FooterTotal></FooterTotal>
         </View>
         )
}

const styles = StyleSheet.create({
    cartItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: SIZES.radius - 20,
        paddingHorizontal: SIZES.radius - 20,
        borderRadius: SIZES.radius - 20
    }
})
export default Cart;