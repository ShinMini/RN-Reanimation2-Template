/** @format */

import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { ImageSourcePropType } from 'react-native'
import { collectionInterface, logo } from './src/data'

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Home: undefined
  DetailScreen: { collection: collectionInterface }
  PurchaseScreen: { image: ImageSourcePropType; logo: logo }
  CollectionScreen: undefined
}

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, Screen>
