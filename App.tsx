/** @format */
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import 'react-native-reanimated'

// user components
import Navigation from './src/navigation'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import useCachedResources from './src/hooks/useCachedResources'

export default function App() {
  const isLoadingComplete = useCachedResources()
  if (!isLoadingComplete) {
    return null
  }
  return (
    <SafeAreaProvider>
      <StatusBar style='inverted' />
      <Navigation />
    </SafeAreaProvider>
  )
}
