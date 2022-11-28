/** @format */

import React, { FC } from 'react'
import { TouchableOpacity, Image } from 'react-native'
import Layout from '../../constants/Layout'
import Spacing from '../../constants/Spacing'

const SIZE = Spacing * 6

import type { ViewProps } from './types'
const UserIcon: FC<ViewProps> = (props) => {
  return (
    <TouchableOpacity
      style={{
        height: SIZE,
        width: SIZE,
        overflow: 'hidden',
        borderRadius: SIZE / 2,
      }}>
      <Image
        source={props.image}
        style={{
          width: '100%',
          height: '100%',
        }}
      />
    </TouchableOpacity>
  )
}

export default UserIcon
