import React, { useState, useRef } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import {
  COLORS,
  FONTS,
  images,
  env,
} from "../constants";
import TextButton from "../components/TextButton";
import PhoneInput from "../components/phoneInput/lib"
import Loader from "../components/Loader";
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from "../common/colors";

const LoginQkzie = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const phoneInput = useRef(null);
  const [valid, setValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userType, setUserType] = useState("owner");
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");


  const onSubmitHandler = (checkValid) => {
    setIsError(false);
    setMessage("");
    if (!phoneNumber) {
      setMessage("Enter valid phone number");
      setIsError(true);
      return;
    }
    if (!checkValid) {
      setMessage("Enter valid phone number");
      setIsError(true);
      return;
    }
    const payload = {
      userType: userType,
      phone: phoneNumber,
    };
    console.log("payload" + JSON.stringify(payload));
    setLoading(true);

    fetch(`${env.IDENTITY_URL}/vendor/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then(async (res) => {
        try {
          const jsonRes = await res.json();
          setLoading(false);
          if (res.status !== 200) {
            console.log("failure");
            console.log(jsonRes);
            setIsError(true);
          } else {
            AsyncStorage.setItem('refreshToken', jsonRes.validationKey);
            console.log(jsonRes);
            setIsError(false);
            navigation.replace("OtpVerification");
          }
        } catch (err) {
          console.log(err);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Loader loading={loading} />
      <View
        style={{
          flex: 0.7,
          backgroundColor: "white",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          source={images.qkzieVertical}
          resizeMode="contain"
          style={{
            width: 150,
            height: 150,
            backgroundColor: "white",
          }}
        />
      </View>
      
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.primary,
          borderTopRightRadius: 40,
          borderTopLeftRadius: 40,
        }}
      >
        <View>
        <Text style={{marginLeft:'5%', marginTop:'5%', ...FONTS.body3, color:COLORS.white}}>Welcome to Qkzie!</Text>
      </View>
        <View
          style={{
            marginTop:'5%',
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <PhoneInput
            ref={phoneInput}
            placeholder="Enter Your Mobile Number"
            defaultValue={phoneNumber}
            layout="second"
            renderDropdownImage={false}
            onChangeText={(text) => {
              setPhoneNumber(text);
                        }}
            flagButtonStyle={{
              width: "20%",
              color: COLORS.grey,
              fontSize: 4,
              backgroundColor: COLORS.lightGray,
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: 10,
            }}
            textInputStyle={{
              backgroundColor: "white",
              color: COLORS.grey,
              height: 50,
              width: "50%",
              top: 5,
              ...FONTS.body4,
            }}
            textContainerStyle={{
              paddingTop: 6,
              paddingLeft: 0,
              borderTopRightRadius: 6,
              paddingRight: 0,
            }}
            codeTextStyle={{
              color: COLORS.grey,
              ...FONTS.body4
            }}
            containerStyle={{
              justifyContent: "center",
              height: 50,
              backgroundColor: "white",
              borderRadius: 10,
              paddingRight: 8,
              borderTopRadius: 5,
              paddingTop: 0,
            }}
            withDarkTheme
            withShadow
            autoFocus
          />
          {isError ? (
            <Text style={{color:colors.ORANGE}}>{message}</Text>
          ) : (
            <Text style={{ ...FONTS.body3 }}></Text>
          )}
          <TextButton
            label="Continue"
            onPressEve={() => {
              const checkValid = phoneInput.current?.isValidNumber(phoneNumber);
              setPhoneNumber(phoneNumber);
              setValid(checkValid ? checkValid : false);
              onSubmitHandler(checkValid);
            }}
            labelStyle={{
              color: colors.primary,
              ...FONTS.h5,
            }}
            buttonContainerStyle={{
              width: 140,
              height: 40,
              backgroundColor: "white",
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
          ></TextButton>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: "80%",
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  lottie: {
    width: 100,
    height: 100,
  },
});

export default LoginQkzie;
