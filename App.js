import React from 'react';
import { createStackNavigator,  CardStyleInterpolators } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native'
import {Home} from './screens'
import { configureStore } from './store/store';
import { Provider } from 'react-redux';
import RNOtpVerify from 'react-native-otp-verify';
import { OtpVerification } from './screens';
import { LoginQkzie } from './screens';
import { SplashScreen } from './screens'

const Stack = createStackNavigator();
const App = () => {
    const store = configureStore();
    RNOtpVerify.getHash()
    .then(hash => {
      console.log('Use this hash to construct otp message', hash);
      console.log('A sample message -');
      console.log(`
        <#> Dear User,
        1091 is your OTP for logging into Ingo-MMT. (Remaining Time: 10 minutes and 0 seconds)
         ${hash[0]}
      `);
    })
    .catch(error => console.log(error));

    return (
        <Provider store={store}>
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: true,
                    gestureDirection: "horizontal",
                    gestureEnabled: false,
                 cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                }}
                
                initialRouteName={'SplashScreen'}
            >
                <Stack.Screen name="SplashScreen" options={{headerShown: false,  headerLeft: null}} component={SplashScreen} />
                <Stack.Screen name="LoginQkzie" options={{headerShown: false,  headerLeft: null}} component={LoginQkzie} />
                <Stack.Screen name="OtpVerification" options={{headerShown: false,  headerLeft: null}} component={OtpVerification} />
                <Stack.Screen name="Home" options={{headerShown: true,  headerLeft: null}} component={Home} />
               
            </Stack.Navigator>
        </NavigationContainer>
        </Provider>
    )
}

export default App;