/** @format */

import React from 'react'
import type { FC } from 'react'
import styled from 'styled-components/native'

import { Colors } from '../../constants/Colors'

import Font from '../../constants/Font'
import Spacing from '../../constants/Spacing'
const StyledText = styled.Text`
  font-size: ${Spacing * 1.8}px;
  color: ${Colors.lightGray};
  text-align: left;
  font-family: ${Font.gilroyLight};
`
// types
import { TextProps } from './types'

const SmallText: FC<TextProps> = (props) => {
  return <StyledText style={props.textStyles}>{props.children}</StyledText>
}

export default SmallText
