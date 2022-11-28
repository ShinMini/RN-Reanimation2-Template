/** @format */

import { ReactNode } from 'react'
import { StyleProp, ViewStyle, ImageSourcePropType } from 'react-native'

export interface ViewProps {
  textStyles?: StyleProp<ViewStyle>
  children?: ReactNode
  image: ImageSourcePropType
}
