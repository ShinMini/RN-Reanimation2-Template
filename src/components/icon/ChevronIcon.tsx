/** @format */

import React from 'react'
import type { FC, ReactNode } from 'react'
import { Ionicons } from '@expo/vector-icons'
import Spacing from '../../constants/Spacing'
import Colors from '../../constants/Colors'
import { StyleProp, ViewStyle } from 'react-native'

type MyIconProps = {
  size?: number
  color?: string
  iconStyles?: StyleProp<ViewStyle>
}
const ChevronIcon: FC<MyIconProps> = (props) => {
  const iconColor: string = props.color ? props.color : Colors.text
  const iconSize: number = props.size ? props.size : Spacing * 4
  return <Ionicons name='chevron-back' size={iconSize} color={iconColor} style={[props.iconStyles]} />
}

export default ChevronIcon
