/** @format */

import { FontAwesome } from '@expo/vector-icons'
import * as Font from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect, useState } from 'react'

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false)

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync()

        /** Load fonts Tip: need to declare word at lower case*/
        await Font.loadAsync({
          ...FontAwesome.font,
          'gilroy-bold': require('../assets/fonts/Gilroy-Bold.ttf'),
          'gilroy-light': require('../assets/fonts/Gilroy-Light.ttf'),
          'gilroy-medium': require('../assets/fonts/Gilroy-Medium.ttf'),
          'gilroy-regular': require('../assets/fonts/Gilroy-Regular.ttf'),
          'jua-regular': require('../assets/fonts/Jua-Regular.ttf'),
          'roboto-bold': require('../assets/fonts/Roboto/Roboto-Bold.ttf'),
          'roboto-regular': require('../assets/fonts/Roboto/Roboto-Regular.ttf'),
        })
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e)
      } finally {
        setLoadingComplete(true)
        SplashScreen.hideAsync()
      }
    }

    loadResourcesAndDataAsync()
  }, [])

  return isLoadingComplete
}
