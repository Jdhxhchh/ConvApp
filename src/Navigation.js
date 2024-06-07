import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import ConverterScreen from './screens/ConverterScreen';
import HistoryScreen from './screens/HistoryScreen';

const Stack = createNativeStackNavigator();

export default Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Головна" component={HomeScreen} />
                <Stack.Screen name="Конвертер" component={ConverterScreen} />
                <Stack.Screen name="Історія" component={HistoryScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};