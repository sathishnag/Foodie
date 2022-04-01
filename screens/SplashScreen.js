
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Image,
  StatusBar,
} from "react-native";
import { images } from "../constants";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from "react-native-safe-area-context";

const SplashScreen = ({ navigation }) => {
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);    
      AsyncStorage.getItem("acessToken").then((value) => {
        navigation.replace(
          value === null ? "LoginQkzie" : "LoginQkzie"
        )
      }
      );
    }, 1000);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor="white"
        barStyle="default"
        showHideTransition="none"
        hidden={false}
      />
      <Image
        source={images.qkzieVertical}
        resizeMode="contain"
        style={{
          width: "90%",
          height: 100,
          backgroundColor: "white",
        }}
      />
    </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  activityIndicator: {
    alignItems: "center",
    height: 80,
  },
});
