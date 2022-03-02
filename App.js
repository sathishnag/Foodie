import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native'
import { Restaurant, OrderDelivery } from './screens'
import {MainLayout} from './screens'
import {Home} from './screens'
import {HotelList} from './screens'
import {HotelDetail} from './screens'
import { configureStore } from './store/store';
import { Provider } from 'react-redux';
import { Cart } from './screens'
import { PhoneSignIn } from './screens'
import RNOtpVerify from 'react-native-otp-verify';
import { OtpVerification } from './components';
import { Login } from './screens';

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
                    headerShown: true
                }}
                initialRouteName={'Login'}
            >
                <Stack.Screen name="Login" options={{headerShown: false}} component={Login} />
                <Stack.Screen name="OtpVerification" component={OtpVerification} />

                <Stack.Screen name="PhoneSignIn" component={PhoneSignIn} />

                <Stack.Screen name="Foodie" component={MainLayout} />
                <Stack.Screen name="Hotel List" component={HotelList} />
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="OrderDelivery" component={OrderDelivery} />
                <Stack.Screen name="Hotel Detail" component={HotelDetail} />
                <Stack.Screen name="cart" component={Cart} />
            </Stack.Navigator>
        </NavigationContainer>
        </Provider>
    )
}

export default App;