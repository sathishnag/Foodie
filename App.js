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

const Stack = createStackNavigator();
const App = () => {

    const store = configureStore();

    return (
        <Provider store={store}>
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: true
                }}
                initialRouteName={'Foodie'}
            >
                <Stack.Screen name="Foodie" component={MainLayout} />
                <Stack.Screen name="Hotel List" component={HotelList} />
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="OrderDelivery" component={OrderDelivery} />
                <Stack.Screen name="Hotel Detail" component={HotelDetail} />
            </Stack.Navigator>
        </NavigationContainer>
        </Provider>
    )
}

export default App;