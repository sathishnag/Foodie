import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, ActivityIndicator, Image } from "react-native";
import RNOtpVerify from "react-native-otp-verify";
import { SIZES, COLORS, images, env, FONTS} from "../../constants";
import { BackHandler } from 'react-native';

import { GenericStyles } from "../../styles/GenericStyles";
import {
  CustomScreenContainer,
  CustomText,
  CustomTextInput,
  CustomButton,
  FullButtonComponent,
} from "../../components";
import colors from "../../common/colors";
import { isAndroid, logErrorWithMessage } from "../../utilities/helperFunctions";
import TimerText from "./TimerText";
import auth from "@react-native-firebase/auth";
import Loader from "../../components/Loader";
import AsyncStorage from '@react-native-async-storage/async-storage';

const RESEND_OTP_TIME_LIMIT = 30; // 30 secs
const AUTO_SUBMIT_OTP_TIME_LIMIT = 4; // 4 secs

let resendOtpTimerInterval;
let autoSubmitOtpTimerInterval;

const OtpVerification = function (props) {
  const { otpRequestData, attempts } = props;

  const [loading, setLoading] = useState(false);

  const [confirm, setConfirm] = useState(null);

  const [code, setCode] = useState("");

  const [ otpToken, setOtpToken] = useState('');

  const [attemptsRemaining, setAttemptsRemaining] = useState(attempts);
  const [otpArray, setOtpArray] = useState(["", "", "", "", "", "", ""]);
  const [submittingOtp, setSubmittingOtp] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isError, setIsError] = useState(false);

  // in secs, if value is greater than 0 then button will be disabled
  const [resendButtonDisabledTime, setResendButtonDisabledTime] = useState(
    RESEND_OTP_TIME_LIMIT
  );

  // 0 < autoSubmitOtpTime < 4 to show auto submitting OTP text
  const [autoSubmitOtpTime, setAutoSubmitOtpTime] = useState(
    AUTO_SUBMIT_OTP_TIME_LIMIT
  );

  // TextInput refs to focus programmatically while entering OTP
  const firstTextInputRef = useRef(null);
  const secondTextInputRef = useRef(null);
  const thirdTextInputRef = useRef(null);
  const fourthTextInputRef = useRef(null);
  const fifthTextInputRef = useRef(null);
  const sixthTextInputRef = useRef(null);

  // a reference to autoSubmitOtpTimerIntervalCallback to always get updated value of autoSubmitOtpTime
  const autoSubmitOtpTimerIntervalCallbackReference = useRef();

  // async function confirmCode() {
  //   try {
  //     confirm.confirm(code);
  //     console.log("Correct code.");
  //     props.navigation.navigate("Foodie");
  //   } catch (error) {
  //     props.navigation.navigate("Foodie");
  //     console.log("Invalid code.");
  //   }
  // }

  function handleBackButtonClick() {
    props.navigation.replace('LoginQkzie');
    return true;
  }

   async function twoFactorAuth(id) {
     console.log("sdasdsad"+id);
    const payload = {
      "token": id
    };
    fetch(`${env.IDENTITY_URL}/vendor/users/two-factor-auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then(async (res) => {
        try {
          setLoading(false);
          const jsonRes = await res.json();
          if (res.status !== 200) {
            console.log("failure - twofactor auth");
          } else {
            console.log(jsonRes.token);
            AsyncStorage.setItem('acessToken',jsonRes.token);
            props.navigation.replace('Home');
            console.log('sucess twofactor auth');
          }
        } catch (err) {
          console.log(err);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  
  }

  async function confirmCode() {
    const refreshToken = await AsyncStorage.getItem('refreshToken');
    const payload = {
      "id": refreshToken,
      "otp": otpArray.join('')
    };
    setLoading(true);
    fetch(`${env.IDENTITY_URL}/otp/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then(async (res) => {
        try {
          const jsonRes = await res.text();
          if (res.status !== 200) {
            setLoading(false);
            console.log(jsonRes);
            setErrorMessage('Enter valid code');
          } else {
            await twoFactorAuth(JSON.parse(jsonRes).token);
          }
        } catch (err) {
          console.log(err);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  
  }

  // useEffect(() => {
  //   autoSubmitOtpTimerIntervalCallbackReference.current =
  //     autoSubmitOtpTimerIntervalCallback;
  //   async function fetchData() {
  //     setLoading(true)
  //     const phoneNum = `+91${props.route.params.phone}`;
  //     const confirmation = await auth().signInWithPhoneNumber(phoneNum);
  //     setConfirm(confirmation);
  //     setLoading(false);
  //   }
  //   fetchData();
  // });

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    };
  }, []);

  useEffect(() => {
    startResendOtpTimer();

    return () => {
      if (resendOtpTimerInterval) {
        clearInterval(resendOtpTimerInterval);
      }
    };
  }, [resendButtonDisabledTime]);

  // useEffect(() => {
  //   RNOtpVerify.getOtp()
  //     .then((p) =>
  //       RNOtpVerify.addListener((message) => {
  //         try {
  //           if (message) {
  //             const messageArray = message.split(" ");
  //             if (messageArray[0]) {
  //               const otp = messageArray[0];
  //               if (otp.length === 6) {
  //                 setOtpArray(otp.split(""));
  //                 setCode(otp);
  //                 setAutoSubmitOtpTime(AUTO_SUBMIT_OTP_TIME_LIMIT);
  //                 startAutoSubmitOtpTimer();
  //               }
  //             }
  //           }
  //         } catch (error) {
  //           logErrorWithMessage(
  //             error.message,
  //             "RNOtpVerify.getOtp - read message, OtpVerification"
  //           );
  //         }
  //       })
  //     )
  //     .catch((error) => {
  //       logErrorWithMessage(
  //         error.message,
  //         "RNOtpVerify.getOtp, OtpVerification"
  //       );
  //     });

  //   // remove listener on unmount
  //   return () => {
  //     RNOtpVerify.removeListener();
  //   };
  // }, []);

  const startResendOtpTimer = () => {
    if (resendOtpTimerInterval) {
      clearInterval(resendOtpTimerInterval);
    }
    resendOtpTimerInterval = setInterval(() => {
      if (resendButtonDisabledTime <= 0) {
        clearInterval(resendOtpTimerInterval);
      } else {
        setResendButtonDisabledTime(resendButtonDisabledTime - 1);
      }
    }, 1000);
  };

  const autoSubmitOtpTimerIntervalCallback = () => {
    if (autoSubmitOtpTime <= 0) {
      clearInterval(autoSubmitOtpTimerInterval);
      onSubmitButtonPress();
    }
    setAutoSubmitOtpTime(autoSubmitOtpTime - 1);
  };

  const startAutoSubmitOtpTimer = () => {
    if (autoSubmitOtpTimerInterval) {
      clearInterval(autoSubmitOtpTimerInterval);
    }
    autoSubmitOtpTimerInterval = setInterval(() => {
      autoSubmitOtpTimerIntervalCallbackReference.current();
    }, 1000);
  };

  const refCallback = (textInputRef) => (node) => {
    textInputRef.current = node;
  };

  const onResendOtpButtonPress = () => {
    // clear last OTP
    if (firstTextInputRef) {
          setOtpArray(["", "", "", "","",""]);
          firstTextInputRef.current.focus();
      }

    // setResendButtonDisabledTime(RESEND_OTP_TIME_LIMIT);
    // startResendOtpTimer();

    // resend OTP Api call
    // todo
   // const confirmation = auth().signInWithPhoneNumber(props.phone);
    // setConfirm(confirmation);

    console.log("todo: Resend OTP");
  };

  const onSubmitButtonPress = () => {
    // API call
    // todo
    confirmCode();
    console.log("todo: Submit OTP");
  };

  // this event won't be fired when text changes from '' to '' i.e. backspace is pressed
  // using onOtpKeyPress for this purpose
  const onOtpChange = (index) => {
    return (value) => {
      if (isNaN(Number(value))) {
        // do nothing when a non digit is pressed
        return;
      }
      const otpArrayCopy = otpArray.concat();
      otpArrayCopy[index] = value;
      setOtpArray(otpArrayCopy);

      // auto focus to next InputText if value is not blank
      if (value !== "") {
        if (index === 0) {
          secondTextInputRef.current.focus();
        } else if (index === 1) {
          thirdTextInputRef.current.focus();
        } else if (index === 2) {
          fourthTextInputRef.current.focus();
        } else if (index === 3) {
          fifthTextInputRef.current.focus();
        } else if (index === 4) {
          sixthTextInputRef.current.focus();
        }
      }
    };
  };

  // only backspace key press event is fired on Android
  // to have consistency, using this event just to detect backspace key press and
  // onOtpChange for other digits press
  const onOtpKeyPress = (index) => {
    return ({ nativeEvent: { key: value } }) => {
      // auto focus to previous InputText if value is blank and existing value is also blank
      if (value === "Backspace" && otpArray[index] === "") {
        if (index === 1) {
          firstTextInputRef.current.focus();
        } else if (index === 2) {
          secondTextInputRef.current.focus();
        } else if (index === 3) {
          thirdTextInputRef.current.focus();
        } else if (index === 4) {
          fourthTextInputRef.current.focus();
        } else if (index === 5) {
          fifthTextInputRef.current.focus();
        }

        /**
         * clear the focused text box as well only on Android because on mweb onOtpChange will be also called
         * doing this thing for us
         * todo check this behaviour on ios
         */
        if (isAndroid && index > 0) {
          const otpArrayCopy = otpArray.concat();
          otpArrayCopy[index - 1] = ""; // clear the previous box which will be in focus
          setOtpArray(otpArrayCopy);
        }
      }
    };
  };

  return (
    <CustomScreenContainer>
      <Loader loading={loading} />
      <View style={styles.container}>
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
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
            paddingTop: 32,
            paddingLeft: 16,
          }}
        >
          <CustomText>
            Enter OTP sent to your{" "}
            {otpRequestData.email_id ? "email" : "mobile number"}{" "}
          </CustomText>
          <View style={[GenericStyles.row, GenericStyles.mt12 ,GenericStyles.p8]}>
            {[
              firstTextInputRef,
              secondTextInputRef,
              thirdTextInputRef,
              fourthTextInputRef,
              fifthTextInputRef,
              sixthTextInputRef,
            ].map((textInputRef, index) => (
              <CustomTextInput
                containerStyle={[GenericStyles.fill]}
                value={otpArray[index]}
                onKeyPress={onOtpKeyPress(index)}
                onChangeText={onOtpChange(index)}
                keyboardType={"numeric"}
                maxLength={1}
                style={[styles.otpText, GenericStyles.centerAlignedText]}
                autoFocus={index === 0 ? true : undefined}
                refCallback={refCallback(textInputRef)}
                key={index}
              />
            ))}
          </View>
          {errorMessage ? (
            <CustomText
              style={[
                GenericStyles.negativeText,
                GenericStyles.mt12,
                GenericStyles.centerAlignedText,
              ]}
            >
              {errorMessage}
            </CustomText>
          ) : null}
          {resendButtonDisabledTime > 0 ? (
            <TimerText text={"Resend OTP in"} time={resendButtonDisabledTime} />
          ) : (
            <CustomButton
              type={"link"}
              text={"Resend OTP"}
              buttonStyle={styles.otpResendButton}
              textStyle={styles.otpResendButtonText}
              onPress={onResendOtpButtonPress}
            />
          )}
          <View style={GenericStyles.fill} />
          <CustomButton
            type={"fill"}
            text={"Submit"}
            textStyle={styles.submitButtonText}
            onPress={onSubmitButtonPress}
            buttonContainerStyle={{
              width: "100%",
              alignItems: "center",
              ...FONTS.body3,
              justifyContent:'center'
            }}
            disabled={submittingOtp}
          />
        </View>
      </View>
    </CustomScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  submitButtonText: {
    color: COLORS.primary,
    fontFamily: "Roboto-Regular",
     fontSize: SIZES.h4, 
     lineHeight: 22
  },
  otpResendButton: {
    alignItems: "center",
    width: "100%",
    marginTop: 16,
  },
  otpResendButtonText: {
    color: colors.ORANGE,
    textTransform: "none",
    textDecorationLine: "underline",
  },
  otpText: {
    fontWeight: "bold",
    color: COLORS.primary,
    fontSize: 18,
    width: "100%",
    backgroundColor: "white",
  },
});

OtpVerification.defaultProps = {
  attempts: 5,
  otpRequestData: {
    username: "varunon9",
    email_id: false,
    phone_no: true,
  },
};

OtpVerification.propTypes = {
  otpRequestData: PropTypes.object.isRequired,
  attempts: PropTypes.number.isRequired,
};

export default OtpVerification;
