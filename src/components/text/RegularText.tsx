/** @format */

import React from 'react'
import type { FC } from 'react'
import styled from 'styled-components/native'

import { Colors } from '../../constants/Colors'
import Font from '../../constants/Font'
import Spacing from '../../constants/Spacing'

// types
import { TextProps } from './types'

const StyledText = styled.Text`
  font-size: ${Spacing * 2.5}px;
  color: ${Colors.text};
  text-align: left;
  font-family: ${Font.gilroyLight};
`
const RegularText: FC<TextProps> = (props) => {
  return <StyledText style={props.textStyles}>{props.children}</StyledText>
}

export default RegularText
