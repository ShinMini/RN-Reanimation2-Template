/**
 * @Author ShinMini
 * @format ts, react native
 */

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import * as React from 'react'
import Colors from '../constants/Colors'
import DetailScreen from '../screens/DetailScreen'
import HomeScreen from '../screens/HomeScreen'
import MakeBidScreen from '../screens/MakeBidScreen'
import HorizontalScreen from '../screens/HorizontalScreen'
import { RootStackParamList } from '../../types'
import { Platform } from 'react-native'
import Spacing from '../constants/Spacing'

export default function Navigation() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  )
}
const Stack = createNativeStackNavigator<RootStackParamList>()

function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: Colors.onBackground,
        },
      }}>
      <Stack.Screen name='Home' component={HomeScreen} />
      <Stack.Screen name='DetailScreen' component={DetailScreen} />
      <Stack.Screen name='MakeBidScreen' component={MakeBidScreen} />
      <Stack.Screen name='HorizontalScreen' component={HorizontalScreen} />
    </Stack.Navigator>
  )
}
