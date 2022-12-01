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
import PurchaseScreen from '../screens/PurchaseScreen'
import CollectionScreen from '../screens/CollectionScreen'
import UserInfoScreen from '../screens/UserInfoScreen'
import { RootStackParamList } from '../../types'

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
      <Stack.Screen name='PurchaseScreen' component={PurchaseScreen} />
      <Stack.Screen name='CollectionScreen' component={CollectionScreen} />
      <Stack.Screen name='UserInfoScreen' component={UserInfoScreen} />
    </Stack.Navigator>
  )
}
