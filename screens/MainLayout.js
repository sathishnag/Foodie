import React from "react";
import { View, Text, Image, FlatList } from "react-native";
import Animated, { set } from "react-native-reanimated";
import Header from "../components/Header";
import LinearGradient from "react-native-linear-gradient";
import { SIZES, COLORS, FONTS, constants, icons } from "../constants";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import Cart from "./Cart";
import Home from "./Home";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/FontAwesome';

const TabButton = ({onPress, isFocussed, label}) => {
  return (
    <View
    style={{
      flexDirection: "column",
      width:"40%",
      flex:1,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 25,
    }}
  >
    <TouchableWithoutFeedback onPress={onPress}>
          <Text>
              <Icon name="home" size={20} color={isFocussed ? COLORS.primary:COLORS.black}></Icon>
          </Text>
          <Text style={{...FONTS.h5}}>{label}</Text>
    </TouchableWithoutFeedback>
    </View>
  );
};

  const MainLayout = ({navigation}) => {
  const [selectedTab, setSelectedTab] = React.useState("");
  const flatListRef = React.useRef();

  React.useEffect(() => {
    setSelectedTab('Home');
  }, [])

  React.useEffect(() => {
    if(selectedTab == 'Cart') {
    }
  }, [selectedTab])

  return (
    <Animated.View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >                
      <View
        style={{
          flex: 1,
          backgroundColor: "white"
        }}
      >
        {selectedTab === 'Cart' && <Cart></Cart>}
        {selectedTab === 'Home' && <Home navigation={navigation}></Home>}
      </View>

      <View
        style={{
          height: 60,
          justifyContent: "flex-end",
        }}
      >
        <LinearGradient
          start={{
            x: 0,
            y: 0,
          }}
          end={{ x: 0, y: 4 }}
          colors={[COLORS.transparent, COLORS.black]}
          style={{
            position: "absolute",
            top: -20,
            left: 0,
            right: 0,
            height: 60,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
          }}
        />
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            paddingHorizontal: 1,
            paddingBottom: 10,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            backgroundColor: COLORS.white,
          }}
        >
          <TabButton 
            onPress={() => {setSelectedTab('Home')}}
            isFocussed={selectedTab == 'Home'}
            label='Home'
            />
          <TabButton 
            onPress={() => {setSelectedTab('Cart')}}
            isFocussed={selectedTab == 'Cart'}
            label='Cart'
            />
          <TabButton 
            onPress={() => {navigation.navigate('Restaurant')}}
            isFocussed={selectedTab == 'Dart'}
            label='Dart'
            />
          <TabButton />
          <TabButton />
        </View>
      </View>
    </Animated.View>
  );
};
export default MainLayout;
