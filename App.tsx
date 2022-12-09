/** @format */
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import 'react-native-reanimated'

/** user components */
import Navigation from './src/navigation'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import useCachedResources from './src/hooks/useCachedResources'

/** Redux lib */
import { Provider as ReduxProvider } from 'react-redux'
import { store } from './src/state'

export default function App() {
  // Load fonts
  const isLoadingComplete = useCachedResources()
  if (!isLoadingComplete) {
    return null
  }
  return (
    <ReduxProvider store={store}>
      <SafeAreaProvider>
        <StatusBar style='inverted' />
        <Navigation />
      </SafeAreaProvider>
    </ReduxProvider>
  )
}
