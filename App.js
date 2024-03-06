
import * as React from 'react';
import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoadingScreen from './screens/LoadingScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import HomeScreen from './screens/HomeScreen';
const Stack = createNativeStackNavigator();
LogBox.ignoreLogs([
  "Setting a timer",
  "AsyncStorage has been extracted from react-native core and will be removed in a future release.",
]);
export default function App() {
  return (
    <NavigationContainer>
       <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='LoadingScreen' component={LoadingScreen} options={{headerShown:false}} /> 
      <Stack.Screen name='LoginScreen' component={LoginScreen} options={{headerShown:false}}/> 
      <Stack.Screen name='SignUpScreen' component={SignUpScreen} options={{headerShown:true}} /> 
      <Stack.Screen name='HomeScreen' component={HomeScreen} options={{headerShown:false}} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}